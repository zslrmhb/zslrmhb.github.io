import assert from 'node:assert/strict';
import test from 'node:test';
import {
	archiveAfterRefreshFailure,
	assertCompleteArchive,
	fetchInstagramMedia,
	updatePhotoArchive
} from '../scripts/photo-cache.mjs';

test('Instagram refresh accepts all pages and uses the injected request function', async () => {
	const requested = [];
	const result = await fetchInstagramMedia({
		userId: 'test-user',
		token: 'test-token',
		fields: 'id,media_url',
		fetchImpl: async (url, options) => {
			requested.push({ url, options });
			return requested.length === 1
				? {
						ok: true,
						json: async () => ({
							data: [{ id: 'first' }],
							paging: { next: 'https://graph.instagram.com/next-page' }
						})
					}
				: { ok: true, json: async () => ({ data: [{ id: 'second' }] }) };
		}
	});

	assert.deepEqual(
		result.map((photo) => photo.id),
		['first', 'second']
	);
	assert.equal(requested.length, 2);
	assert.equal(requested[0].options.method, 'GET');
	assert.match(requested[0].url, /fields=id%2Cmedia_url/);
	assert.equal(requested[1].url, 'https://graph.instagram.com/next-page');
});

test('Instagram authentication failures explain token expiry without echoing the token', async () => {
	await assert.rejects(
		fetchInstagramMedia({
			userId: 'test-user',
			token: 'do-not-log-this',
			fields: 'id',
			fetchImpl: async () => ({
				ok: false,
				status: 401,
				statusText: 'Unauthorized',
				json: async () => ({ error: { message: 'Invalid token', code: 190 } })
			})
		}),
		(error) => {
			assert.match(error.message, /token may be missing, expired, or invalid/);
			assert.doesNotMatch(error.message, /do-not-log-this/);
			return true;
		}
	);
});

test('a failed Instagram request uses a complete cached archive and exposes a warning', async () => {
	const cache = [
		{
			id: 'cached',
			url: '/ig/cached.jpg',
			thumb: '/ig/cached-480.webp',
			medium: '/ig/cached-960.webp'
		}
	];
	const result = await archiveAfterRefreshFailure(
		new Error('token expired'),
		cache,
		async () => true
	);
	assert.equal(result.photos, cache);
	assert.match(result.warning, /token expired/);
	assert.match(result.warning, /complete validated local archive/);
});

test('a failed Instagram request without a usable archive is an explicit failure', async () => {
	await assert.rejects(
		archiveAfterRefreshFailure(new Error('API unavailable'), [], async () => false),
		/No complete validated local photo archive is available/
	);
});

test('an incomplete first download cannot replace the empty archive', () => {
	assert.throws(
		() => assertCompleteArchive(0, 2, ['one image failed']),
		/complete initial photo cache/
	);
	assert.throws(() => assertCompleteArchive(0, 0, []), /no usable local photos/);
	assert.doesNotThrow(() => assertCompleteArchive(83, 83, ['a new photo was skipped']));
});

test('a per-photo failure retains the prior local entry and still accepts other updates', async () => {
	const previous = [
		{
			id: 'kept',
			caption: 'old caption',
			url: '/ig/kept.jpg',
			thumb: '/ig/kept-480.webp',
			medium: '/ig/kept-960.webp',
			alt: 'A city street.'
		}
	];
	const result = await updatePhotoArchive({
		fresh: [
			{ id: 'kept', caption: 'new caption', remoteUrl: 'https://expired.example/kept.jpg' },
			{ id: 'new', caption: 'new image', remoteUrl: 'https://image.example/new.jpg' }
		],
		previous,
		altDescriptions: { kept: 'A city street.' },
		canReuse: async (photo) => photo.id === 'kept',
		downloadOriginal: async (_url, id) => {
			if (id === 'kept') throw new Error('expired signed URL');
			return { url: '/ig/new.jpg' };
		},
		createVariants: async (photo) => ({
			...photo,
			thumb: `/ig/${photo.id}-480.webp`,
			medium: `/ig/${photo.id}-960.webp`
		})
	});
	assert.equal(result.photos.length, 2);
	assert.equal(result.photos[0].url, '/ig/kept.jpg');
	assert.equal(result.photos[0].caption, 'new caption');
	assert.equal(result.photos[0].alt, 'A city street.');
	assert.equal(result.photos[1].url, '/ig/new.jpg');
	assert.equal(result.failures.length, 0);
});

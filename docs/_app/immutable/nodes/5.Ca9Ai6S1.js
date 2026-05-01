const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			'../chunks/CQ8iuP3w.js',
			'../chunks/DsnmJJEf.js',
			'../chunks/B5_alTbJ.js',
			'../chunks/7lH0bu5J.js',
			'../chunks/BEfl0AYo.js',
			'../chunks/CwxTF5KJ.js',
			'../chunks/Cajbuw0W.js',
			'../chunks/Dm31YeMj.js',
			'../chunks/0UGGdwXT.js',
			'../assets/BlogLayout.CVl-L9NR.css',
			'../chunks/CCtyYBi3.js',
			'../chunks/DU8GTY5b.js',
			'../chunks/DfvNdrxL.js',
			'../chunks/DHBKuhVu.js',
			'../chunks/Cm3kWbeN.js'
		])
) => i.map((i) => d[i]);
import { _ as H } from '../chunks/D9Z9MdNV.js';
import { H as A } from '../chunks/CYgJF_JY.js';
import '../chunks/DsnmJJEf.js';
import {
	q as C,
	r as p,
	v as L,
	D as u,
	w as d,
	x as V,
	y as r,
	G as M,
	E as v,
	z as m,
	$ as G,
	B as o,
	af as N,
	ag as U,
	C as F
} from '../chunks/7lH0bu5J.js';
import { i as w } from '../chunks/CwxTF5KJ.js';
import { f as J, s as E, e as K, i as Q } from '../chunks/0UGGdwXT.js';
import { c as W } from '../chunks/CyFIKMQc.js';
import { B as X } from '../chunks/TexbRBND.js';
import { S as Y } from '../chunks/z5ce2c5v.js';
const Z = (n, t, l) => {
	const i = n[t];
	return i
		? typeof i == 'function'
			? i()
			: Promise.resolve(i)
		: new Promise((_, g) => {
				(typeof queueMicrotask == 'function' ? queueMicrotask : setTimeout)(
					g.bind(
						null,
						new Error(
							'Unknown variable dynamic import: ' +
								t +
								(t.split('/').length !== l
									? '. Note that variables only represent file names one level deep.'
									: '')
						)
					)
				);
			});
};
function $(n, t) {
	throw new A(n, t);
}
new TextEncoder();
async function tt({ params: n }) {
	try {
		const t = await Z(
			Object.assign({
				'../../../content/advanced-blog-demo.md': () =>
					H(
						() => import('../chunks/CQ8iuP3w.js'),
						__vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
						import.meta.url
					),
				'../../../content/deep-learning-resources.md': () =>
					H(
						() => import('../chunks/CCtyYBi3.js'),
						__vite__mapDeps([10, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14]),
						import.meta.url
					)
			}),
			`../../../content/${n.slug}.md`,
			5
		);
		return { content: t.default, meta: t.metadata };
	} catch {
		$(404, `Could not find ${n.slug}`);
	}
}
const _t = Object.freeze(
	Object.defineProperty({ __proto__: null, load: tt }, Symbol.toStringTag, { value: 'Module' })
);
var at = p('<meta name="description"/> <meta property="og:description"/>', 1),
	et = p('<meta property="og:type" content="article"/> <meta property="og:title"/> <!>', 1),
	rt = p('<p class="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg"> </p>'),
	ot = p('<div class="tags mb-8 flex flex-wrap gap-2"></div>'),
	nt = p(
		'<article class="relative mx-auto max-w-3xl px-1 pt-14 pb-24 sm:pt-20"><hgroup class="mb-8"><h1 class="mb-4 text-3xl leading-tight font-semibold md:text-4xl"> </h1> <div class="mb-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground"><span> </span> <span aria-hidden="true">/</span> <span> </span></div> <!></hgroup> <!> <!> <div class="markdown prose prose-neutral dark:prose-invert prose-headings:tracking-normal prose-p:leading-7 prose-li:leading-7 prose-a:underline-offset-4 max-w-none"><!></div></article>'
	);
function ft(n, t) {
	C(t, !0);
	var l = nt();
	L((a) => {
		var e = et(),
			s = r(M(e), 2),
			y = r(s, 2);
		{
			var h = (f) => {
				var c = at(),
					T = M(c),
					z = r(T, 2);
				(u(() => {
					(E(T, 'content', t.data.meta.summary), E(z, 'content', t.data.meta.summary));
				}),
					d(f, c));
			};
			w(y, (f) => {
				t.data.meta.summary && f(h);
			});
		}
		(u(() => {
			((G.title = t.data.meta.title), E(s, 'content', t.data.meta.title));
		}),
			d(a, e));
	});
	var i = m(l),
		_ = m(i),
		g = m(_, !0);
	o(_);
	var x = r(_, 2),
		b = m(x),
		S = m(b, !0);
	o(b);
	var k = r(b, 4),
		j = m(k, !0);
	(o(k), o(x));
	var q = r(x, 2);
	{
		var B = (a) => {
			var e = rt(),
				s = m(e, !0);
			(o(e), u(() => v(s, t.data.meta.summary)), d(a, e));
		};
		w(q, (a) => {
			t.data.meta.summary && a(B);
		});
	}
	o(i);
	var P = r(i, 2);
	{
		var I = (a) => {
			var e = ot();
			(K(
				e,
				21,
				() => t.data.meta.categories,
				Q,
				(s, y) => {
					X(s, {
						variant: 'outline',
						class: 'rounded-md px-2 py-0.5 text-xs font-normal',
						children: (h, f) => {
							N();
							var c = U();
							(u(() => v(c, F(y))), d(h, c));
						},
						$$slots: { default: !0 }
					});
				}
			),
				o(e),
				d(a, e));
		};
		w(P, (a) => {
			t.data.meta?.categories && t.data.meta.categories.length > 0 && a(I);
		});
	}
	var D = r(P, 2);
	Y(D, { class: 'mb-10' });
	var O = r(D, 2),
		R = m(O);
	(W(
		R,
		() => t.data.content,
		(a, e) => {
			e(a, {});
		}
	),
		o(O),
		o(l),
		u(
			(a) => {
				(v(g, t.data.meta.title), v(S, a), v(j, t.data.meta.author ?? 'Hongbin Miao'));
			},
			[() => J(t.data.meta.date, 'long')]
		),
		d(n, l),
		V());
}
export { ft as component, _t as universal };

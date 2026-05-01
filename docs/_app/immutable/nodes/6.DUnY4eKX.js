import '../chunks/DsnmJJEf.js';
import '../chunks/B5_alTbJ.js';
import {
	q as J,
	r as p,
	z as g,
	ag as ee,
	w as i,
	B as u,
	D as z,
	e as c,
	A as r,
	x as Q,
	y as j,
	E as F,
	aK as H,
	aL as te,
	v as ae,
	C as n,
	ai as L,
	$ as re,
	aj as M,
	F as V,
	G as W,
	af as oe
} from '../chunks/7lH0bu5J.js';
import { p as _, i as q } from '../chunks/CwxTF5KJ.js';
import { e as G, d as X, c as N, b as I, i as K, s as S } from '../chunks/0UGGdwXT.js';
import { i as U } from '../chunks/Cm3kWbeN.js';
import { s as ne } from '../chunks/DU8GTY5b.js';
const se = !0;
async function ie({ fetch: x }) {
	return { photos: await (await x('/photos.json')).json() };
}
const je = Object.freeze(
	Object.defineProperty({ __proto__: null, load: ie, prerender: se }, Symbol.toStringTag, {
		value: 'Module'
	})
);
var le = p('<div><!></div>'),
	de = p('<div></div>');
function Y(x, o) {
	J(o, !1);
	let e = _(o, 'pauseOnHover', 8, !1),
		l = _(o, 'vertical', 8, !1),
		b = _(o, 'repeat', 8, 4),
		w = _(o, 'reverse', 8, !1),
		y = _(o, 'class', 8, '');
	U();
	var d = de();
	(G(
		d,
		5,
		() => ({ length: b() }),
		K,
		(v, k) => {
			var h = le(),
				f = g(h);
			(ne(f, o, 'default', {}, (m) => {
				var A = ee('Default');
				i(m, A);
			}),
				u(h),
				z(
					(m) => I(h, 1, m),
					[
						() =>
							X(
								(r(N),
								r(l()),
								r(e()),
								r(w()),
								c(() =>
									N('flex shrink-0 justify-around [gap:var(--gap)]', {
										'animate-marquee flex-row': !l(),
										'animate-marquee-vertical flex-col': l(),
										'group-hover:[animation-play-state:paused]': e(),
										'[animation-direction:reverse]': w()
									})
								))
							)
					]
				),
				i(v, h));
		}
	),
		u(d),
		z(
			(v) => I(d, 1, v),
			[
				() =>
					X(
						(r(N),
						r(l()),
						r(y()),
						c(() =>
							N(
								'group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:2s] [--gap:1rem]',
								{ 'flex-row': !l(), 'flex-col': l() },
								y()
							)
						))
					)
			]
		),
		i(x, d),
		Q());
}
var ce = p('<div class="line-clamp-2 text-xs leading-snug"> </div>'),
	ve = p('<div class="mt-0.5 text-[10px] tracking-wide text-white/80 uppercase"> </div>'),
	ue = p(
		'<div class="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"><!> <!></div>'
	),
	pe = p(
		'<a target="_blank" rel="noreferrer"><img class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" decoding="async"/> <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div> <!></a>'
	);
function Z(x, o) {
	J(o, !1);
	let e = _(o, 'photo', 8),
		l = _(o, 'size', 8),
		b = _(o, 'className', 8, '');
	function w(f) {
		return f ? new Date(f).toLocaleDateString(void 0, { year: 'numeric', month: 'short' }) : '';
	}
	const y = { sm: 'w-48', md: 'w-64', lg: 'w-80' };
	U();
	var d = pe(),
		v = g(d),
		k = j(v, 4);
	{
		var h = (f) => {
			var m = ue(),
				A = g(m);
			{
				var T = (t) => {
					var s = ce(),
						D = g(s, !0);
					(u(s), z(() => F(D, (r(e()), c(() => e().caption)))), i(t, s));
				};
				q(A, (t) => {
					(r(e()), c(() => e().caption) && t(T));
				});
			}
			var C = j(A, 2);
			{
				var a = (t) => {
					var s = ve(),
						D = g(s, !0);
					(u(s), z((P) => F(D, P), [() => (r(e()), c(() => w(e().takenAt)))]), i(t, s));
				};
				q(C, (t) => {
					(r(e()), c(() => e().takenAt) && t(a));
				});
			}
			(u(m), i(f, m));
		};
		q(k, (f) => {
			(r(e()), c(() => e().caption || e().takenAt) && f(h));
		});
	}
	(u(d),
		z(() => {
			(S(d, 'href', (r(e()), c(() => e().permalink))),
				I(
					d,
					1,
					(r(l()),
					r(b()),
					c(
						() =>
							`group relative block ${y[l()]} aspect-[3/2] overflow-hidden rounded-md bg-muted ${b()}`
					))
				),
				S(d, 'title', (r(e()), c(() => e().caption))),
				S(v, 'src', (r(e()), c(() => e().thumb))),
				S(v, 'alt', (r(e()), c(() => e().caption || 'Photo'))));
		}),
		i(x, d),
		Q());
}
var fe = p(
		`<meta name="description" content="A small photography archive, refreshed from Hongbin Miao's Instagram cache."/>`
	),
	me = p('<span> </span>'),
	ge = p(
		'<div class="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-10 sm:py-14"><!> <!> <div class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div> <div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div></div>'
	),
	he = p(
		'<div class="rounded-md border border-border/70 px-5 py-10 text-sm text-muted-foreground">No cached photos are available yet.</div>'
	),
	_e = p(
		'<section class="mx-auto w-full max-w-5xl pt-16 pb-24 sm:pt-10"><header class="mb-8 max-w-2xl"><h1 class="text-3xl leading-tight font-semibold">Photography</h1> <p class="mt-3 text-sm leading-6 text-muted-foreground">A quiet archive of recent photographs. <!></p></header> <!></section>'
	);
function ze(x, o) {
	J(o, !1);
	const e = L(),
		l = L(),
		b = L(),
		w = L();
	let y = _(o, 'data', 8);
	function d(a) {
		return a ? new Date(a).toLocaleDateString(void 0, { year: 'numeric', month: 'long' }) : '';
	}
	(H(
		() => r(y()),
		() => {
			M(
				e,
				[...y().photos].sort((a, t) => {
					const s = a.takenAt ? new Date(a.takenAt).getTime() : 0;
					return (t.takenAt ? new Date(t.takenAt).getTime() : 0) - s;
				})
			);
		}
	),
		H(
			() => n(e),
			() => {
				M(l, n(e)[0]?.takenAt ? d(n(e)[0].takenAt) : '');
			}
		),
		H(
			() => n(e),
			() => {
				M(
					b,
					n(e).filter((a, t) => t % 2 === 0)
				);
			}
		),
		H(
			() => n(e),
			() => {
				M(
					w,
					n(e).filter((a, t) => t % 2 === 1)
				);
			}
		),
		te(),
		U());
	var v = _e();
	ae((a) => {
		var t = fe();
		((re.title = 'Photography'), i(a, t));
	});
	var k = g(v),
		h = j(g(k), 2),
		f = j(g(h));
	{
		var m = (a) => {
			var t = me(),
				s = g(t);
			(u(t), z(() => F(s, `Latest photo: ${n(l) ?? ''}.`)), i(a, t));
		};
		q(f, (a) => {
			n(l) && a(m);
		});
	}
	(u(h), u(k));
	var A = j(k, 2);
	{
		var T = (a) => {
				var t = ge(),
					s = g(t);
				Y(s, {
					pauseOnHover: !0,
					class: '[--duration:50s]',
					children: (P, $) => {
						var O = V(),
							R = W(O);
						(G(
							R,
							1,
							() => n(b),
							K,
							(B, E) => {
								Z(B, {
									get photo() {
										return n(E);
									},
									size: 'lg'
								});
							}
						),
							i(P, O));
					},
					$$slots: { default: !0 }
				});
				var D = j(s, 2);
				(Y(D, {
					reverse: !0,
					pauseOnHover: !0,
					class: '[--duration:50s]',
					children: (P, $) => {
						var O = V(),
							R = W(O);
						(G(
							R,
							1,
							() => n(w),
							K,
							(B, E) => {
								Z(B, {
									get photo() {
										return n(E);
									},
									size: 'lg'
								});
							}
						),
							i(P, O));
					},
					$$slots: { default: !0 }
				}),
					oe(4),
					u(t),
					i(a, t));
			},
			C = (a) => {
				var t = he();
				i(a, t);
			};
		q(A, (a) => {
			(n(e), c(() => n(e).length > 0) ? a(T) : a(C, !1));
		});
	}
	(u(v), i(x, v), Q());
}
export { ze as component, je as universal };

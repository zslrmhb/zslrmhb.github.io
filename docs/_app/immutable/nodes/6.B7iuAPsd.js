import '../chunks/DsnmJJEf.js';
import '../chunks/B5_alTbJ.js';
import {
	q as K,
	r as p,
	z as g,
	ag as $,
	w as i,
	B as u,
	D as P,
	e as c,
	A as r,
	x as J,
	y as z,
	E as F,
	aK as L,
	aL as ee,
	v as te,
	C as n,
	ai as M,
	$ as ae,
	aj as N,
	F as U,
	G as V,
	af as re
} from '../chunks/7lH0bu5J.js';
import { p as _, i as H } from '../chunks/CwxTF5KJ.js';
import { e as G, d as W, c as S, b as I, i as oe, s as T } from '../chunks/0UGGdwXT.js';
import { i as Q } from '../chunks/Cm3kWbeN.js';
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
function X(x, o) {
	K(o, !1);
	let e = _(o, 'pauseOnHover', 8, !1),
		l = _(o, 'vertical', 8, !1),
		b = _(o, 'repeat', 8, 4),
		w = _(o, 'reverse', 8, !1),
		y = _(o, 'class', 8, '');
	Q();
	var d = de();
	(G(
		d,
		5,
		() => ({ length: b() }),
		oe,
		(v, A) => {
			var h = le(),
				f = g(h);
			(ne(f, o, 'default', {}, (m) => {
				var D = $('Default');
				i(m, D);
			}),
				u(h),
				P(
					(m) => I(h, 1, m),
					[
						() =>
							W(
								(r(S),
								r(l()),
								r(e()),
								r(w()),
								c(() =>
									S('flex shrink-0 justify-around [gap:var(--gap)]', {
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
		P(
			(v) => I(d, 1, v),
			[
				() =>
					W(
						(r(S),
						r(l()),
						r(y()),
						c(() =>
							S(
								'group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:2s] [--gap:1rem]',
								{ 'flex-row': !l(), 'flex-col': l() },
								y()
							)
						))
					)
			]
		),
		i(x, d),
		J());
}
var ce = p('<div class="line-clamp-2 text-xs leading-snug"> </div>'),
	ve = p('<div class="mt-0.5 text-[10px] tracking-wide text-white/80 uppercase"> </div>'),
	ue = p(
		'<div class="pointer-events-none absolute inset-x-0 bottom-0 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"><!> <!></div>'
	),
	pe = p(
		'<a target="_blank" rel="noreferrer"><img class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" decoding="async"/> <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"></div> <!></a>'
	);
function Y(x, o) {
	K(o, !1);
	let e = _(o, 'photo', 8),
		l = _(o, 'size', 8),
		b = _(o, 'className', 8, '');
	function w(f) {
		return f ? new Date(f).toLocaleDateString(void 0, { year: 'numeric', month: 'short' }) : '';
	}
	const y = { sm: 'w-48', md: 'w-64', lg: 'w-80' };
	Q();
	var d = pe(),
		v = g(d),
		A = z(v, 4);
	{
		var h = (f) => {
			var m = ue(),
				D = g(m);
			{
				var C = (t) => {
					var s = ce(),
						j = g(s, !0);
					(u(s), P(() => F(j, (r(e()), c(() => e().caption)))), i(t, s));
				};
				H(D, (t) => {
					(r(e()), c(() => e().caption) && t(C));
				});
			}
			var R = z(D, 2);
			{
				var a = (t) => {
					var s = ve(),
						j = g(s, !0);
					(u(s), P((O) => F(j, O), [() => (r(e()), c(() => w(e().takenAt)))]), i(t, s));
				};
				H(R, (t) => {
					(r(e()), c(() => e().takenAt) && t(a));
				});
			}
			(u(m), i(f, m));
		};
		H(A, (f) => {
			(r(e()), c(() => e().caption || e().takenAt) && f(h));
		});
	}
	(u(d),
		P(() => {
			(T(d, 'href', (r(e()), c(() => e().permalink))),
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
				T(d, 'title', (r(e()), c(() => e().caption))),
				T(v, 'src', (r(e()), c(() => e().thumb))),
				T(v, 'alt', (r(e()), c(() => e().caption || 'Photo'))));
		}),
		i(x, d),
		J());
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
	K(o, !1);
	const e = M(),
		l = M(),
		b = M(),
		w = M();
	let y = _(o, 'data', 8);
	function d(a) {
		return a ? new Date(a).toLocaleDateString(void 0, { year: 'numeric', month: 'long' }) : '';
	}
	(L(
		() => r(y()),
		() => {
			N(
				e,
				[...y().photos].sort((a, t) => {
					const s = a.takenAt ? new Date(a.takenAt).getTime() : 0;
					return (t.takenAt ? new Date(t.takenAt).getTime() : 0) - s;
				})
			);
		}
	),
		L(
			() => n(e),
			() => {
				N(l, n(e)[0]?.takenAt ? d(n(e)[0].takenAt) : '');
			}
		),
		L(
			() => n(e),
			() => {
				N(
					b,
					n(e).filter((a, t) => t % 2 === 0)
				);
			}
		),
		L(
			() => n(e),
			() => {
				N(
					w,
					n(e).filter((a, t) => t % 2 === 1)
				);
			}
		),
		ee(),
		Q());
	var v = _e();
	te((a) => {
		var t = fe();
		((ae.title = 'Photography'), i(a, t));
	});
	var A = g(v),
		h = z(g(A), 2),
		f = z(g(h));
	{
		var m = (a) => {
			var t = me(),
				s = g(t);
			(u(t), P(() => F(s, `Latest photo: ${n(l) ?? ''}.`)), i(a, t));
		};
		H(f, (a) => {
			n(l) && a(m);
		});
	}
	(u(h), u(A));
	var D = z(A, 2);
	{
		var C = (a) => {
				var t = ge(),
					s = g(t);
				X(s, {
					pauseOnHover: !0,
					class: '[--duration:50s]',
					children: (O, Z) => {
						var q = U(),
							B = V(q);
						(G(
							B,
							1,
							() => n(b),
							(k) => k.id,
							(k, E) => {
								Y(k, {
									get photo() {
										return n(E);
									},
									size: 'lg'
								});
							}
						),
							i(O, q));
					},
					$$slots: { default: !0 }
				});
				var j = z(s, 2);
				(X(j, {
					reverse: !0,
					pauseOnHover: !0,
					class: '[--duration:50s]',
					children: (O, Z) => {
						var q = U(),
							B = V(q);
						(G(
							B,
							1,
							() => n(w),
							(k) => k.id,
							(k, E) => {
								Y(k, {
									get photo() {
										return n(E);
									},
									size: 'lg'
								});
							}
						),
							i(O, q));
					},
					$$slots: { default: !0 }
				}),
					re(4),
					u(t),
					i(a, t));
			},
			R = (a) => {
				var t = he();
				i(a, t);
			};
		H(D, (a) => {
			(n(e), c(() => n(e).length > 0) ? a(C) : a(R, !1));
		});
	}
	(u(v), i(x, v), J());
}
export { ze as component, je as universal };

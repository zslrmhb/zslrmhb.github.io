import '../chunks/DsnmJJEf.js';
import {
	r as c,
	w as n,
	z as m,
	G as A,
	ac as te,
	y as h,
	af as ce,
	ag as ue,
	B as d,
	ah as pe,
	q as ve,
	F as fe,
	x as me,
	t as ge,
	C as t,
	ai as j,
	aj as q,
	D as Q,
	ak as he,
	E as be
} from '../chunks/7lH0bu5J.js';
import { s as xe } from '../chunks/Dm31YeMj.js';
import '../chunks/B5_alTbJ.js';
import { P as U, R as V, T as W, B as re, a as X, M as we } from '../chunks/D5WLMpeD.js';
import { S as $e } from '../chunks/z5ce2c5v.js';
import { o as _e, a as ke } from '../chunks/C5HLncaA.js';
import { i as F } from '../chunks/CwxTF5KJ.js';
import { b as Z, e as ye, d as Ce, s as ee, i as Ee } from '../chunks/0UGGdwXT.js';
import { b as Be } from '../chunks/CyFIKMQc.js';
import { i as Le } from '../chunks/Cm3kWbeN.js';
var Pe = te(
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>'
	),
	Te = c('<!> <!>', 1),
	ze = c('<p>Theme</p>'),
	Me = c('<!> <!>', 1),
	He = c(
		'<nav class="toc-exclude fixed top-4 left-3 z-40 flex h-[58px] w-max items-center gap-2 rounded-2xl border p-2 backdrop-blur-md supports-backdrop-blur:bg-white/10 sm:left-[calc(55%-32rem)] sm:-translate-x-full supports-backdrop-blur:dark:bg-black/10" aria-label="Blog"><!> <!> <!></nav>'
	);
function Ne(k) {
	var u = He(),
		o = m(u);
	U(o, {
		children: (p, B) => {
			V(p, {
				delayDuration: 100,
				children: (v, D) => {
					var b = Te(),
						x = A(b);
					W(x, {
						children: (i, y) => {
							re(i, {
								href: '/blog',
								variant: 'ghost',
								size: 'icon',
								class: 'size-12 rounded-full',
								children: (w, O) => {
									var H = Pe();
									n(w, H);
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
					var L = h(x, 2);
					(X(L, {
						children: (i, y) => {
							ce();
							var w = ue('Back to blog');
							n(i, w);
						},
						$$slots: { default: !0 }
					}),
						n(v, b));
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	});
	var l = h(o, 2);
	$e(l, { orientation: 'vertical', class: 'h-full py-2' });
	var g = h(l, 2);
	(U(g, {
		children: (p, B) => {
			V(p, {
				delayDuration: 100,
				children: (v, D) => {
					var b = Me(),
						x = A(b);
					W(x, {
						children: (i, y) => {
							we(i, {});
						},
						$$slots: { default: !0 }
					});
					var L = h(x, 2);
					(X(L, {
						children: (i, y) => {
							var w = ze();
							n(i, w);
						},
						$$slots: { default: !0 }
					}),
						n(v, b));
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	}),
		d(u),
		n(k, u));
}
var Se = te(
		'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>'
	),
	qe = (k, u, o) => u(t(o).id),
	Ae = c('<li><button type="button"><span class="line-clamp-2"> </span></button></li>'),
	De = c('<nav class="max-h-[calc(100dvh-6rem)] overflow-y-auto py-2"><ul></ul></nav>'),
	Oe = c('<p class="px-4 py-5 text-sm text-muted-foreground">No section headings found.</p>'),
	Re = c(
		'<aside id="toc-panel" class="max-h-[calc(100dvh-2rem)] w-[min(calc(100vw-5rem),22rem)] overflow-hidden rounded-md border border-border/80 bg-background/95 shadow-sm backdrop-blur" aria-label="Table of contents"><div class="border-b border-border/70 px-4 py-3"><p class="text-xs font-medium text-muted-foreground uppercase">Contents</p></div> <!></aside>'
	),
	je = c(
		'<div class="toc-exclude fixed top-4 right-3 z-50 sm:right-5"><div class="flex flex-row-reverse items-start gap-2"><div class="flex h-[58px] w-max items-center rounded-2xl border p-2 backdrop-blur-md supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10"><!></div> <!></div></div>'
	);
function Fe(k, u) {
	ve(u, !1);
	let o = j(!1),
		l = j([]),
		g = '',
		p = j(),
		B,
		v = 0;
	const D = '.markdown h2, .markdown h3';
	function b(e) {
		return e
			.toLowerCase()
			.trim()
			.replace(/['"]/g, '')
			.replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
	}
	function x(e, a, r) {
		const s = e.id?.trim();
		if (s) return s;
		const f = b(a) || 'section',
			$ = r.get(f) ?? 0;
		r.set(f, $ + 1);
		const P = $ === 0 ? f : `${f}-${$ + 1}`;
		return ((e.id = P), P);
	}
	function L() {
		const e = new Map(),
			a = Array.from(document.querySelectorAll(D));
		q(
			l,
			a
				.filter((r) => !!r.textContent?.trim() && !r.closest('nav, .toc-exclude'))
				.map((r) => {
					const s = r,
						f = s.textContent?.trim() || '',
						$ = Number(s.tagName.slice(1));
					return { id: x(s, f, e), text: f, level: $, element: s };
				})
		);
	}
	function i() {
		if (t(l).length === 0) return;
		const e = window.innerHeight * 0.24;
		let a = t(l)[0];
		for (const r of t(l))
			if (r.element.getBoundingClientRect().top <= e) a = r;
			else break;
		g = a?.id ?? '';
	}
	async function y() {
		(await ge(), L(), i());
	}
	function w(e) {
		const a = document.getElementById(e);
		if (!a) return;
		const r = a.getBoundingClientRect().top + window.scrollY - 88;
		(window.scrollTo({ top: r, behavior: 'smooth' }), (g = e));
	}
	function O() {
		q(o, !1);
	}
	function H(e) {
		!t(o) || !(e.target instanceof Node) || t(p)?.contains(e.target) || O();
	}
	function I(e) {
		e.key === 'Escape' && O();
	}
	function N() {
		v ||
			(v = window.requestAnimationFrame(() => {
				((v = 0), i());
			}));
	}
	function oe(e) {
		const a = e.level === 3 ? 'pl-5 text-xs' : 'font-medium',
			r =
				g === e.id
					? 'border-l-foreground text-foreground'
					: 'border-l-transparent text-muted-foreground hover:text-foreground';
		return `block w-full border-l px-3 py-1.5 text-left text-sm leading-snug transition-colors ${a} ${r}`;
	}
	(_e(() => {
		(y(), (B = new MutationObserver(y)));
		const e = document.querySelector('.markdown');
		(e && B.observe(e, { childList: !0, subtree: !0 }),
			window.addEventListener('scroll', N, { passive: !0 }),
			window.addEventListener('resize', N, { passive: !0 }),
			document.addEventListener('click', H, !0),
			document.addEventListener('keydown', I));
	}),
		ke(() => {
			(B?.disconnect(),
				v && window.cancelAnimationFrame(v),
				window.removeEventListener('scroll', N),
				window.removeEventListener('resize', N),
				document.removeEventListener('click', H, !0),
				document.removeEventListener('keydown', I));
		}),
		Le());
	var G = fe(),
		ae = A(G);
	{
		var ne = (e) => {
			var a = je(),
				r = m(a),
				s = m(r),
				f = m(s);
			{
				let _ = he(() => (t(o) ? 'Close table of contents' : 'Open table of contents'));
				re(f, {
					variant: 'ghost',
					size: 'icon',
					class: 'size-12 cursor-pointer rounded-full',
					onclick: () => q(o, !t(o)),
					'aria-controls': 'toc-panel',
					get 'aria-expanded'() {
						return t(o);
					},
					get 'aria-label'() {
						return t(_);
					},
					title: 'Table of Contents',
					children: (T, K) => {
						var S = Se();
						(Q(() =>
							Z(S, 0, `h-4 w-4 transition-transform duration-200 ${t(o) ? 'rotate-90' : ''}`)
						),
							n(T, S));
					},
					$$slots: { default: !0 }
				});
			}
			d(s);
			var $ = h(s, 2);
			{
				var P = (_) => {
					var T = Re(),
						K = h(m(T), 2);
					{
						var S = (C) => {
								var z = De(),
									Y = m(z);
								(ye(
									Y,
									5,
									() => t(l),
									Ee,
									(le, M) => {
										var R = Ae(),
											E = m(R);
										E.__click = [qe, w, M];
										var J = m(E),
											ie = m(J, !0);
										(d(J),
											d(E),
											d(R),
											Q(
												(de) => {
													(ee(E, 'data-id', t(M).id),
														Z(E, 1, de),
														ee(E, 'title', t(M).text),
														be(ie, t(M).text));
												},
												[() => Ce(oe(t(M)))]
											),
											n(le, R));
									}
								),
									d(Y),
									d(z),
									n(C, z));
							},
							se = (C) => {
								var z = Oe();
								n(C, z);
							};
						F(K, (C) => {
							t(l).length > 0 ? C(S) : C(se, !1);
						});
					}
					(d(T), n(_, T));
				};
				F($, (_) => {
					t(o) && _(P);
				});
			}
			(d(r),
				d(a),
				Be(
					a,
					(_) => q(p, _),
					() => t(p)
				),
				n(e, a));
		};
		F(ae, (e) => {
			e(ne);
		});
	}
	(n(k, G), me());
}
pe(['click']);
var Ie = c('<!> <!> <!>', 1);
function tt(k, u) {
	var o = Ie(),
		l = A(o);
	Ne(l);
	var g = h(l, 2);
	Fe(g, {});
	var p = h(g, 2);
	(xe(p, () => u.children), n(k, o));
}
export { tt as component };

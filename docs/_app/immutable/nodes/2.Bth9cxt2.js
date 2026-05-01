import '../chunks/DsnmJJEf.js';
import {
	aJ as et,
	f as m,
	G as H,
	ac as ot,
	a as u,
	s as y,
	aH as ut,
	aI as ft,
	g as t,
	au as h,
	p as pt,
	aK as G,
	aL as mt,
	b as vt,
	t as Y,
	an as P,
	af as C,
	aM as J,
	c as D,
	u as x,
	r as I,
	e as gt
} from '../chunks/BfTMFq0c.js';
import { s as ht } from '../chunks/DY748rXZ.js';
import '../chunks/CRJC6bhr.js';
import {
	D as rt,
	a as A,
	P as K,
	R as V,
	T as Q,
	B as F,
	b as U,
	M as $t
} from '../chunks/CzFrKo4D.js';
import { S as xt } from '../chunks/CDa2Fz5X.js';
import { o as wt, a as _t } from '../chunks/D6PQL0vz.js';
import { i as Z } from '../chunks/BPV7WAZE.js';
import { b as bt, d as yt, e as Tt, i as kt } from '../chunks/DrzAit6R.js';
import { b as tt } from '../chunks/CbSA8EeA.js';
import { i as Et } from '../chunks/CuHUdPRB.js';
var Pt = ot(
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>'
	),
	Ct = m('<!> <!>', 1),
	It = m('<p>Theme</p>'),
	Mt = m('<!> <!>', 1),
	zt = m('<!> <!> <!>', 1);
function Bt(M) {
	rt(M, {
		class: 'fixed top-4 z-40 flex justify-center px-4 -translate-x-full left-[calc(55%-32rem)]',
		children: et,
		$$slots: {
			default: (z, i) => {
				const l = h(() => i.magnification),
					c = h(() => i.distance),
					p = h(() => i.mouseX);
				var T = zt(),
					w = H(T);
				A(w, {
					get magnification() {
						return t(l);
					},
					get mouseX() {
						return t(p);
					},
					get distance() {
						return t(c);
					},
					children: (L, j) => {
						K(L, {
							children: (k, R) => {
								V(k, {
									delayDuration: 100,
									children: (X, q) => {
										var _ = Ct(),
											b = H(_);
										Q(b, {
											children: ($, e) => {
												F($, {
													href: '/blog',
													variant: 'ghost',
													size: 'icon',
													class: 'size-12 rounded-full',
													children: (o, r) => {
														var n = Pt();
														u(o, n);
													},
													$$slots: { default: !0 }
												});
											},
											$$slots: { default: !0 }
										});
										var S = y(b, 2);
										(U(S, {
											children: ($, e) => {
												ut();
												var o = ft('Back to blog');
												u($, o);
											},
											$$slots: { default: !0 }
										}),
											u(X, _));
									},
									$$slots: { default: !0 }
								});
							},
							$$slots: { default: !0 }
						});
					},
					$$slots: { default: !0 }
				});
				var v = y(w, 2);
				xt(v, { orientation: 'vertical', class: 'h-full py-2' });
				var B = y(v, 2);
				(A(B, {
					get magnification() {
						return t(l);
					},
					get mouseX() {
						return t(p);
					},
					get distance() {
						return t(c);
					},
					children: (L, j) => {
						K(L, {
							children: (k, R) => {
								V(k, {
									delayDuration: 100,
									children: (X, q) => {
										var _ = Mt(),
											b = H(_);
										Q(b, {
											children: ($, e) => {
												$t($, {});
											},
											$$slots: { default: !0 }
										});
										var S = y(b, 2);
										(U(S, {
											children: ($, e) => {
												var o = It();
												u($, o);
											},
											$$slots: { default: !0 }
										}),
											u(X, _));
									},
									$$slots: { default: !0 }
								});
							},
							$$slots: { default: !0 }
						});
					},
					$$slots: { default: !0 }
				}),
					u(z, T));
			}
		}
	});
}
var Lt = ot(
		'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>'
	),
	Xt = m('<span class="block truncate text-left"> </span>'),
	St = m('<li><!></li>'),
	Ot = m('<nav class="p-2"><ul class="space-y-0.5"></ul></nav>'),
	Dt = m('<div class="p-4 text-center text-sm text-muted-foreground">No headings found</div>'),
	Ht = m(
		'<div id="toc-panel" class="fixed z-50 mt-5 right-5 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg overflow-hidden transition-transform duration-200 origin-top-right pointer-events-auto" role="dialog" aria-label="Table of contents"><div class="px-4 py-3 border-b"><h3 class="text-sm font-semibold text-foreground">Table of Contents</h3></div> <div class="overflow-y-auto max-h-80 svelte-1gnzx5v"><!></div></div>'
	),
	Rt = m('<!> <!>', 1);
function Wt(M, z) {
	pt(z, !1);
	let i = P(!1),
		l = P([]),
		c = P(''),
		p,
		T = P(),
		w = P(),
		v = P({ top: 0, left: 0, minWidth: 320 });
	function B() {
		if (!t(T)) return;
		const e = t(T).getBoundingClientRect(),
			o = document.getElementById('toc-panel'),
			r = Math.max(o?.offsetWidth || 0, t(v).minWidth),
			n = Math.round(window.scrollY + e.bottom + 8);
		let s = Math.round(window.scrollX + e.right - r);
		const g = window.scrollX + 8,
			a = window.scrollX + window.innerWidth - r - 8;
		(s < g && (s = g), s > a && (s = a), J(v, (t(v).top = n)), J(v, (t(v).left = s)));
	}
	function L(e) {
		const o = document.getElementById(e);
		if (!o) return;
		const r = o.getBoundingClientRect(),
			n = window.scrollY + r.top - 80;
		window.scrollTo({ top: n, behavior: 'smooth' });
	}
	function j(e, o) {
		if (e.id) return e.id;
		let r = o
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/\s+/g, '-')
				.trim(),
			n = 1,
			s = r;
		for (; document.getElementById(r); ) ((r = `${s}-${n}`), n++);
		return ((e.id = r), r);
	}
	function k() {
		setTimeout(() => {
			const o = (
				document.querySelector('.markdown') ||
				document.querySelector('article') ||
				document.body
			).querySelectorAll('h1, h2, h3, h4, h5, h6');
			C(
				l,
				Array.from(o)
					.filter((r) => {
						const n = r.closest('nav') || r.closest('.toc-exclude'),
							s = r.textContent?.trim();
						return !n && s;
					})
					.map((r) => {
						const n = r,
							s = n.textContent?.trim() || '',
							g = parseInt(n.tagName.charAt(1));
						return { id: j(n, s), text: s, level: g, element: n };
					})
			);
		}, 100);
	}
	function R() {
		t(l).length !== 0 &&
			(p && p.disconnect(),
			(p = new IntersectionObserver(
				(e) => {
					let o = null;
					for (const r of e) {
						const n = r.target.id;
						if (!n) continue;
						const s = r.intersectionRatio;
						(!o || s > o.ratio) && (o = { id: n, ratio: s });
					}
					o && o.id !== t(c) && C(c, o.id);
				},
				{ root: null, rootMargin: '-80px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
			)),
			t(l).forEach(({ element: e }) => p.observe(e)));
	}
	function X(e) {
		switch (e) {
			case 1:
				return 'pl-0';
			case 2:
				return 'pl-3';
			case 3:
				return 'pl-6';
			case 4:
				return 'pl-9';
			case 5:
				return 'pl-12';
			case 6:
				return 'pl-15';
			default:
				return 'pl-0';
		}
	}
	function q(e) {
		switch (e) {
			case 1:
				return 'text-xs font-semibold';
			case 2:
				return 'text-xs font-medium';
			case 3:
				return 'text-xs';
			case 4:
				return 'text-xs opacity-90';
			case 5:
				return 'text-xs opacity-80';
			case 6:
				return 'text-xs opacity-70';
			default:
				return 'text-xs';
		}
	}
	(wt(() => {
		setTimeout(() => {
			(k(),
				setTimeout(() => {
					R();
				}, 200));
		}, 500);
		let e;
		const o = () => {
			(clearTimeout(e),
				(e = setTimeout(() => {
					if (t(l).length > 0) {
						const g = window.scrollY + 100;
						let a = '';
						for (let f = t(l).length - 1; f >= 0; f--) {
							const E = t(l)[f];
							if (E.element.getBoundingClientRect().top + window.scrollY <= g) {
								a = E.id;
								break;
							}
						}
						(!a && t(l).length > 0 && (a = t(l)[0].id), a && a !== t(c) && C(c, a));
					}
				}, 50)));
		};
		window.addEventListener('scroll', o, { passive: !0 });
		const r = new MutationObserver(() => {
				setTimeout(() => {
					(k(),
						setTimeout(() => {
							R();
						}, 200));
				}, 300);
			}),
			n = document.body;
		r.observe(n, { childList: !0, subtree: !0 });
		const s = () => {
			t(i) && B();
		};
		return (
			window.addEventListener('resize', s),
			window.addEventListener('scroll', s, { passive: !0 }),
			() => {
				(r.disconnect(),
					window.removeEventListener('scroll', o),
					window.removeEventListener('resize', s),
					window.removeEventListener('scroll', s));
			}
		);
	}),
		_t(() => {
			p && p.disconnect();
		}),
		G(
			() => (t(i), t(w), t(c)),
			() => {
				if (t(i) && t(w) && t(c)) {
					const e = t(w).querySelector(`[data-id="${t(c)}"]`);
					e && e.scrollIntoView({ block: 'nearest' });
				}
			}
		),
		G(
			() => t(i),
			() => {
				t(i) && setTimeout(B, 0);
			}
		),
		mt(),
		Et());
	var _ = Rt(),
		b = H(_);
	rt(b, {
		class: 'fixed top-4 z-40 flex justify-center px-4 translate-x-full right-[calc(55%-32rem)]',
		children: et,
		$$slots: {
			default: (e, o) => {
				const r = h(() => o.magnification),
					n = h(() => o.distance),
					s = h(() => o.mouseX);
				A(e, {
					get magnification() {
						return t(r);
					},
					get mouseX() {
						return t(s);
					},
					get distance() {
						return t(n);
					},
					children: (g, a) => {
						tt(
							F(g, {
								variant: 'ghost',
								size: 'icon',
								class: 'size-12 rounded-full cursor-pointer',
								onclick: () => {
									(C(i, !t(i)), t(i) && B());
								},
								'aria-haspopup': 'dialog',
								get 'aria-expanded'() {
									return t(i);
								},
								'aria-controls': 'toc-panel',
								title: 'Table of Contents',
								children: (f, E) => {
									var O = Lt();
									(Y(() =>
										bt(O, 0, `w-4 h-4 transition-transform duration-200 ${t(i) ? 'rotate-90' : ''}`)
									),
										u(f, O));
								},
								$$slots: { default: !0 },
								$$legacy: !0
							}),
							(f) => C(T, f),
							() => t(T)
						);
					},
					$$slots: { default: !0 }
				});
			}
		}
	});
	var S = y(b, 2);
	{
		var $ = (e) => {
			var o = Ht(),
				r = y(D(o), 2),
				n = D(r);
			{
				var s = (a) => {
						var f = Ot(),
							E = D(f);
						(Tt(
							E,
							5,
							() => t(l),
							kt,
							(O, d) => {
								var W = St(),
									nt = D(W);
								{
									let st = h(
											() => (t(c), t(d), x(() => (t(c) === t(d).id ? 'secondary' : 'ghost')))
										),
										at = h(() => (t(d), x(() => X(t(d).level)))),
										it = h(() => (t(d), x(() => q(t(d).level)))),
										lt = h(
											() => (
												t(c),
												t(d),
												x(() =>
													t(c) === t(d).id
														? 'bg-primary/10 text-primary hover:bg-primary/20'
														: 'text-muted-foreground hover:text-foreground'
												)
											)
										);
									F(nt, {
										get 'data-id'() {
											return (t(d), x(() => t(d).id));
										},
										onclick: () => L(t(d).id),
										get variant() {
											return t(st);
										},
										size: 'sm',
										get class() {
											return `cursor-pointer w-full justify-start h-auto py-1.5 font-normal ${t(at) ?? ''} ${t(it) ?? ''} ${t(lt) ?? ''}`;
										},
										get title() {
											return (t(d), x(() => t(d).text));
										},
										children: (ct, qt) => {
											var N = Xt(),
												dt = D(N, !0);
											(I(N), Y(() => gt(dt, (t(d), x(() => t(d).text)))), u(ct, N));
										},
										$$slots: { default: !0 }
									});
								}
								(I(W), u(O, W));
							}
						),
							I(E),
							I(f),
							u(a, f));
					},
					g = (a) => {
						var f = Dt();
						u(a, f);
					};
				Z(n, (a) => {
					(t(l), x(() => t(l).length > 0) ? a(s) : a(g, !1));
				});
			}
			(I(r),
				tt(
					r,
					(a) => C(w, a),
					() => t(w)
				),
				I(o),
				Y(() => yt(o, (t(v), x(() => `min-width:${t(v).minWidth}px;`)))),
				u(e, o));
		};
		Z(S, (e) => {
			t(i) && e($);
		});
	}
	(u(M, _), vt());
}
var jt = m('<!> <!> <!>', 1);
function te(M, z) {
	var i = jt(),
		l = H(i);
	Bt(l);
	var c = y(l, 2);
	Wt(c, {});
	var p = y(c, 2);
	(ht(p, () => z.children), u(M, i));
}
export { te as component };

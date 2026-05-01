import '../chunks/DsnmJJEf.js';
import '../chunks/B5_alTbJ.js';
import {
	T as Jt,
	bi as Xt,
	O as Wt,
	bj as er,
	bk as tr,
	a8 as Pt,
	e as Y,
	bl as rr,
	bm as It,
	aI as nr,
	aa as sr,
	H as ge,
	F as G,
	G as V,
	w as k,
	q as K,
	s as ir,
	aK as ie,
	aj as D,
	ai as J,
	A as B,
	C as h,
	t as ar,
	aL as zt,
	x as F,
	j as lr,
	ak as be,
	ad as le,
	al as Je,
	r as E,
	z as _,
	B as w,
	bn as or,
	b9 as xt,
	ba as Lt,
	D as Q,
	ag as we,
	af as ye,
	E as te,
	y as R,
	v as cr,
	bo as ur,
	$ as hr
} from '../chunks/7lH0bu5J.js';
import { b as pr, o as dr, a as fr } from '../chunks/C5HLncaA.js';
import { i as he } from '../chunks/Cm3kWbeN.js';
import { c as Xe } from '../chunks/CyFIKMQc.js';
import {
	l as gr,
	s as Pe,
	p as m,
	a as mr,
	b as xr,
	i as ae,
	r as Se
} from '../chunks/CwxTF5KJ.js';
import {
	e as me,
	a as We,
	c as xe,
	d as kr,
	b as vr,
	s as X,
	i as _e
} from '../chunks/0UGGdwXT.js';
import { s as Ee } from '../chunks/Dm31YeMj.js';
import { a as et, h as br, w as wr, j as tt, b as re, m as rt } from '../chunks/DHBKuhVu.js';
import { C as yr, D as _r } from '../chunks/BaMErEii.js';
import {
	e as kt,
	f as Sr,
	S as vt,
	g as Rr,
	c as Ar,
	d as bt,
	P as Tr
} from '../chunks/CLQhsDID.js';
import { s as He } from '../chunks/DU8GTY5b.js';
import { B as Ot } from '../chunks/TexbRBND.js';
import { I as Cr } from '../chunks/DfvNdrxL.js';
import { h as Er } from '../chunks/BEfl0AYo.js';
const Pr = () => performance.now(),
	oe = { tick: (t) => requestAnimationFrame(t), now: () => Pr(), tasks: new Set() };
function Dt() {
	const t = oe.now();
	(oe.tasks.forEach((e) => {
		e.c(t) || (oe.tasks.delete(e), e.f());
	}),
		oe.tasks.size !== 0 && oe.tick(Dt));
}
function Ir(t) {
	let e;
	return (
		oe.tasks.size === 0 && oe.tick(Dt),
		{
			promise: new Promise((n) => {
				oe.tasks.add((e = { c: t, f: n }));
			}),
			abort() {
				oe.tasks.delete(e);
			}
		}
	);
}
function Le(t, e) {
	It(() => {
		t.dispatchEvent(new CustomEvent(e));
	});
}
function zr(t) {
	if (t === 'float') return 'cssFloat';
	if (t === 'offset') return 'cssOffset';
	if (t.startsWith('--')) return t;
	const e = t.split('-');
	return e.length === 1
		? e[0]
		: e[0] +
				e
					.slice(1)
					.map((n) => n[0].toUpperCase() + n.slice(1))
					.join('');
}
function wt(t) {
	const e = {},
		n = t.split(';');
	for (const s of n) {
		const [r, a] = s.split(':');
		if (!r || a === void 0) break;
		const i = zr(r.trim());
		e[i] = a.trim();
	}
	return e;
}
const Lr = (t) => t;
function Or(t, e, n, s) {
	var r = (t & rr) !== 0,
		a = 'both',
		i,
		l = e.inert,
		o = e.style.overflow,
		c,
		u;
	function f() {
		return It(() => (i ??= n()(e, s?.() ?? {}, { direction: a })));
	}
	var p = {
			is_global: r,
			in() {
				((e.inert = l),
					Le(e, 'introstart'),
					(c = Fe(e, f(), u, 1, () => {
						(Le(e, 'introend'), c?.abort(), (c = i = void 0), (e.style.overflow = o));
					})));
			},
			out(v) {
				((e.inert = !0),
					Le(e, 'outrostart'),
					(u = Fe(e, f(), c, 0, () => {
						(Le(e, 'outroend'), v?.());
					})));
			},
			stop: () => {
				(c?.abort(), u?.abort());
			}
		},
		x = Jt;
	if (((x.transitions ??= []).push(p), Xt)) {
		var d = r;
		if (!d) {
			for (var g = x.parent; g && (g.f & Wt) !== 0; ) for (; (g = g.parent) && (g.f & er) === 0; );
			d = !g || (g.f & tr) !== 0;
		}
		d &&
			Pt(() => {
				Y(() => p.in());
			});
	}
}
function Fe(t, e, n, s, r) {
	var a = s === 1;
	if (nr(e)) {
		var i,
			l = !1;
		return (
			sr(() => {
				if (!l) {
					var v = e({ direction: a ? 'in' : 'out' });
					i = Fe(t, v, n, s, r);
				}
			}),
			{
				abort: () => {
					((l = !0), i?.abort());
				},
				deactivate: () => i.deactivate(),
				reset: () => i.reset(),
				t: () => i.t()
			}
		);
	}
	if ((n?.deactivate(), !e?.duration))
		return (r(), { abort: ge, deactivate: ge, reset: ge, t: () => s });
	const { delay: o = 0, css: c, tick: u, easing: f = Lr } = e;
	var p = [];
	if (a && n === void 0 && (u && u(0, 1), c)) {
		var x = wt(c(0, 1));
		p.push(x, x);
	}
	var d = () => 1 - s,
		g = t.animate(p, { duration: o, fill: 'forwards' });
	return (
		(g.onfinish = () => {
			g.cancel();
			var v = n?.t() ?? 1 - s;
			n?.abort();
			var b = s - v,
				z = e.duration * Math.abs(b),
				L = [];
			if (z > 0) {
				var P = !1;
				if (c)
					for (var H = Math.ceil(z / 16.666666666666668), S = 0; S <= H; S += 1) {
						var M = v + b * f(S / H),
							U = wt(c(M, 1 - M));
						(L.push(U), (P ||= U.overflow === 'hidden'));
					}
				(P && (t.style.overflow = 'hidden'),
					(d = () => {
						var W = g.currentTime;
						return v + b * f(W / z);
					}),
					u &&
						Ir(() => {
							if (g.playState !== 'running') return !1;
							var W = d();
							return (u(W, 1 - W), !0);
						}));
			}
			((g = t.animate(L, { duration: z, fill: 'forwards' })),
				(g.onfinish = () => {
					((d = () => s), u?.(s, 1 - s), r());
				}));
		}),
		{
			abort: () => {
				g && (g.cancel(), (g.effect = null), (g.onfinish = ge));
			},
			deactivate: () => {
				r = ge;
			},
			reset: () => {
				s === 0 && u?.(1, 0);
			},
			t: () => d()
		}
	);
}
function Dr(t, e) {
	const n = gr(e, ['children', '$$slots', '$$events', '$$legacy']);
	/**
	 * @license lucide-svelte v0.539.0 - ISC
	 *
	 * ISC License
	 *
	 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
	 *
	 * Permission to use, copy, modify, and/or distribute this software for any
	 * purpose with or without fee is hereby granted, provided that the above
	 * copyright notice and this permission notice appear in all copies.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
	 *
	 */ const s = [['path', { d: 'm9 18 6-6-6-6' }]];
	Cr(
		t,
		Pe({ name: 'chevron-right' }, () => n, {
			get iconNode() {
				return s;
			},
			children: (r, a) => {
				var i = G(),
					l = V(i);
				(He(l, e, 'default', {}, null), k(r, i));
			},
			$$slots: { default: !0 }
		})
	);
}
let yt = 0;
function Br() {
	const t = yt;
	return (yt++, t);
}
function Mr() {
	return new Map();
}
function $r(t, e) {
	K(e, !1);
	const n = J();
	let s = m(e, 'isPresent', 8),
		r = m(e, 'onExitComplete', 8, void 0),
		a = m(e, 'initial', 8),
		i = m(e, 'custom', 8, void 0),
		l = m(e, 'presenceAffectsLayout', 8),
		o = m(e, 'isCustom', 8);
	const c = new Mr(),
		u = Br(),
		f = () => ({
			id: u,
			initial: a(),
			isPresent: s(),
			custom: i(),
			onExitComplete: (v) => {
				c.set(v, !0);
				let b = !0;
				(c.forEach((z) => {
					z || (b = !1);
				}),
					b && r()?.());
			},
			register: (v) => (c.set(v, !1), () => c.delete(v))
		});
	let p = kt();
	pr(() => {
		l() && p.set(f());
	});
	const x = () => {
		c.forEach((v, b) => c.set(b, !1));
	};
	(ir(kt, p),
		Sr('Presence', o(), p),
		ie(
			() => (B(l()), B(s())),
			() => {
				D(n, l() ? void 0 : s());
			}
		),
		ie(
			() => h(n),
			() => {
				p.set(f(h(n)));
			}
		),
		ie(
			() => B(s()),
			() => {
				x(s());
			}
		),
		ie(
			() => (B(s()), B(r())),
			() => {
				ar().then(() => {
					!s() && !c.size && r()?.();
				});
			}
		),
		zt(),
		he());
	var d = G(),
		g = V(d);
	(He(g, e, 'default', {}, null), k(t, d), F());
}
function Nr(t, e) {
	K(e, !1);
	const [n, s] = mr(),
		r = () => xr(v, '$layoutContext', n),
		a = J(),
		i = J();
	let l = m(e, 'list', 8, void 0),
		o = m(e, 'custom', 8, void 0),
		c = m(e, 'initial', 8, !0),
		u = m(e, 'onExitComplete', 8, void 0),
		f = m(e, 'exitBeforeEnter', 8, void 0),
		p = m(e, 'presenceAffectsLayout', 8, !0),
		x = m(e, 'show', 8, void 0),
		d = m(e, 'isCustom', 8, !1),
		g = J(l() !== void 0 ? l() : x() ? [{ key: 1 }] : []);
	const v = lr(vt) || vt(d());
	function b($) {
		return $.key || '';
	}
	let z = J(!0),
		L = J(h(g)),
		P = J(h(L)),
		H = new Map(),
		S = new Set();
	const M = ($, N) => {
		$.forEach((ee) => {
			const y = b(ee);
			N.set(y, ee);
		});
	};
	let U = J([...h(L).map(($) => ({ present: !0, item: $, key: $.key }))]);
	(ie(
		() => (B(l()), B(x())),
		() => {
			D(g, l() !== void 0 ? l() : x() ? [{ key: 1 }] : []);
		}
	),
		ie(
			() => r(),
			() => {
				D(a, Rr(r()));
			}
		),
		ie(
			() => (h(a), r(), h(g)),
			() => {
				D(i, () => {
					(h(a) && r().forceUpdate(), D(g, [...h(g)]));
				});
			}
		),
		ie(
			() => h(g),
			() => {
				D(L, h(g));
			}
		),
		ie(
			() => h(L),
			() => {
				M(h(L), H);
			}
		),
		ie(
			() => (h(z), h(U), h(L), h(P), B(f()), h(i), B(u())),
			() => {
				if (h(z)) D(z, !1);
				else {
					D(U, [...h(L).map((y) => ({ present: !0, item: y, key: y.key }))]);
					const $ = h(P).map(b),
						N = h(L).map(b),
						ee = $.length;
					for (let y = 0; y < ee; y++) {
						const O = $[y];
						N.indexOf(O) === -1 ? S.add(O) : S.delete(O);
					}
					(f() && S.size && D(U, []),
						S.forEach((y) => {
							if (N.indexOf(y) !== -1) return;
							const O = H.get(y);
							if (!O) return;
							const C = $.indexOf(y),
								I = () => {
									(H.delete(y), S.delete(y));
									const q = h(P).findIndex((Z) => Z.key === y);
									q < 0 || (h(P).splice(q, 1), S.size || (D(P, [...h(L)]), h(i)(), u() && u()()));
								};
							h(U).splice(C, 0, { present: !1, item: O, key: b(O), onExit: I });
						}),
						D(P, h(U)));
				}
			}
		),
		zt(),
		he());
	var W = G(),
		fe = V(W);
	(me(
		fe,
		1,
		() => h(U),
		($) => b($),
		($, N) => {
			{
				let ee = be(() => (c() ? void 0 : !1)),
					y = be(() => (h(N), B(o()), Y(() => (h(N).onExit ? o() : void 0))));
				$r($, {
					get isPresent() {
						return (h(N), Y(() => h(N).present));
					},
					get initial() {
						return h(ee);
					},
					get custom() {
						return h(y);
					},
					get presenceAffectsLayout() {
						return p();
					},
					get onExitComplete() {
						return (h(N), Y(() => h(N).onExit));
					},
					get isCustom() {
						return d();
					},
					children: (O, C) => {
						var I = G(),
							q = V(I);
						(He(
							q,
							e,
							'default',
							{
								get item() {
									return (h(N), Y(() => h(N).item));
								}
							},
							null
						),
							k(O, I));
					},
					$$slots: { default: !0 }
				});
			}
		}
	),
		k(t, W),
		F(),
		s());
}
const nt = br({ component: 'avatar', parts: ['root', 'image', 'fallback'] }),
	st = new yr('Avatar.Root');
class it {
	static create(e) {
		return st.set(new it(e));
	}
	opts;
	domContext;
	attachment;
	constructor(e) {
		((this.opts = e),
			(this.domContext = new _r(this.opts.ref)),
			(this.loadImage = this.loadImage.bind(this)),
			(this.attachment = et(this.opts.ref)));
	}
	loadImage(e, n, s) {
		if (this.opts.loadingStatus.current === 'loaded') return;
		let r;
		const a = new Image();
		return (
			(a.src = e),
			n !== void 0 && (a.crossOrigin = n),
			s && (a.referrerPolicy = s),
			(this.opts.loadingStatus.current = 'loading'),
			(a.onload = () => {
				r = this.domContext.setTimeout(() => {
					this.opts.loadingStatus.current = 'loaded';
				}, this.opts.delayMs.current);
			}),
			(a.onerror = () => {
				this.opts.loadingStatus.current = 'error';
			}),
			() => {
				r && this.domContext.clearTimeout(r);
			}
		);
	}
	#e = le(() => ({
		id: this.opts.id.current,
		[nt.root]: '',
		'data-status': this.opts.loadingStatus.current,
		...this.attachment
	}));
	get props() {
		return h(this.#e);
	}
	set props(e) {
		D(this.#e, e);
	}
}
class at {
	static create(e) {
		return new at(e, st.get());
	}
	opts;
	root;
	attachment;
	constructor(e, n) {
		((this.opts = e),
			(this.root = n),
			(this.attachment = et(this.opts.ref)),
			wr.pre([() => this.opts.src.current, () => this.opts.crossOrigin.current], ([s, r]) => {
				if (!s) {
					this.root.opts.loadingStatus.current = 'error';
					return;
				}
				this.root.loadImage(s, r, this.opts.referrerPolicy.current);
			}));
	}
	#e = le(() => ({
		id: this.opts.id.current,
		style: { display: this.root.opts.loadingStatus.current === 'loaded' ? 'block' : 'none' },
		'data-status': this.root.opts.loadingStatus.current,
		[nt.image]: '',
		src: this.opts.src.current,
		crossorigin: this.opts.crossOrigin.current,
		referrerpolicy: this.opts.referrerPolicy.current,
		...this.attachment
	}));
	get props() {
		return h(this.#e);
	}
	set props(e) {
		D(this.#e, e);
	}
}
class lt {
	static create(e) {
		return new lt(e, st.get());
	}
	opts;
	root;
	attachment;
	constructor(e, n) {
		((this.opts = e), (this.root = n), (this.attachment = et(this.opts.ref)));
	}
	#e = le(() => (this.root.opts.loadingStatus.current === 'loaded' ? { display: 'none' } : void 0));
	get style() {
		return h(this.#e);
	}
	set style(e) {
		D(this.#e, e);
	}
	#t = le(() => ({
		style: this.style,
		'data-status': this.root.opts.loadingStatus.current,
		[nt.fallback]: '',
		...this.attachment
	}));
	get props() {
		return h(this.#t);
	}
	set props(e) {
		D(this.#t, e);
	}
}
var Vr = E('<div><!></div>');
function qr(t, e) {
	const n = Je();
	K(e, !0);
	let s = m(e, 'delayMs', 3, 0),
		r = m(e, 'loadingStatus', 15, 'loading'),
		a = m(e, 'id', 19, () => tt(n)),
		i = m(e, 'ref', 15, null),
		l = Se(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'delayMs',
			'loadingStatus',
			'onLoadingStatusChange',
			'child',
			'children',
			'id',
			'ref'
		]);
	const o = it.create({
			delayMs: re.with(() => s()),
			loadingStatus: re.with(
				() => r(),
				(d) => {
					r() !== d && (r(d), e.onLoadingStatusChange?.(d));
				}
			),
			id: re.with(() => a()),
			ref: re.with(
				() => i(),
				(d) => i(d)
			)
		}),
		c = le(() => rt(l, o.props));
	var u = G(),
		f = V(u);
	{
		var p = (d) => {
				var g = G(),
					v = V(g);
				(Ee(
					v,
					() => e.child,
					() => ({ props: h(c) })
				),
					k(d, g));
			},
			x = (d) => {
				var g = Vr();
				We(g, () => ({ ...h(c) }));
				var v = _(g);
				(Ee(v, () => e.children ?? ge), w(g), k(d, g));
			};
		ae(f, (d) => {
			e.child ? d(p) : d(x, !1);
		});
	}
	(k(t, u), F());
}
var Hr = E('<img/>');
function Ur(t, e) {
	const n = Je();
	K(e, !0);
	let s = m(e, 'id', 19, () => tt(n)),
		r = m(e, 'ref', 15, null),
		a = m(e, 'crossorigin', 3, void 0),
		i = m(e, 'referrerpolicy', 3, void 0),
		l = Se(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'src',
			'child',
			'id',
			'ref',
			'crossorigin',
			'referrerpolicy'
		]);
	const o = at.create({
			src: re.with(() => e.src),
			id: re.with(() => s()),
			ref: re.with(
				() => r(),
				(d) => r(d)
			),
			crossOrigin: re.with(() => a()),
			referrerPolicy: re.with(() => i())
		}),
		c = le(() => rt(l, o.props));
	var u = G(),
		f = V(u);
	{
		var p = (d) => {
				var g = G(),
					v = V(g);
				(Ee(
					v,
					() => e.child,
					() => ({ props: h(c) })
				),
					k(d, g));
			},
			x = (d) => {
				var g = Hr();
				(We(g, () => ({ ...h(c), src: e.src })), or(g), k(d, g));
			};
		ae(f, (d) => {
			e.child ? d(p) : d(x, !1);
		});
	}
	(k(t, u), F());
}
var jr = E('<span><!></span>');
function Kr(t, e) {
	const n = Je();
	K(e, !0);
	let s = m(e, 'id', 19, () => tt(n)),
		r = m(e, 'ref', 15, null),
		a = Se(e, ['$$slots', '$$events', '$$legacy', 'children', 'child', 'id', 'ref']);
	const i = lt.create({
			id: re.with(() => s()),
			ref: re.with(
				() => r(),
				(p) => r(p)
			)
		}),
		l = le(() => rt(a, i.props));
	var o = G(),
		c = V(o);
	{
		var u = (p) => {
				var x = G(),
					d = V(x);
				(Ee(
					d,
					() => e.child,
					() => ({ props: h(l) })
				),
					k(p, x));
			},
			f = (p) => {
				var x = jr();
				We(x, () => ({ ...h(l) }));
				var d = _(x);
				(Ee(d, () => e.children ?? ge), w(x), k(p, x));
			};
		ae(c, (p) => {
			e.child ? p(u) : p(f, !1);
		});
	}
	(k(t, o), F());
}
function Bt(t, e) {
	K(e, !0);
	let n = m(e, 'ref', 15, null),
		s = m(e, 'loadingStatus', 15, 'loading'),
		r = Se(e, ['$$slots', '$$events', '$$legacy', 'ref', 'loadingStatus', 'class']);
	var a = G(),
		i = V(a);
	{
		let l = le(() => xe('relative flex size-8 shrink-0 overflow-hidden rounded-full', e.class));
		Xe(
			i,
			() => qr,
			(o, c) => {
				c(
					o,
					Pe(
						{
							'data-slot': 'avatar',
							get class() {
								return h(l);
							}
						},
						() => r,
						{
							get ref() {
								return n();
							},
							set ref(u) {
								n(u);
							},
							get loadingStatus() {
								return s();
							},
							set loadingStatus(u) {
								s(u);
							}
						}
					)
				);
			}
		);
	}
	(k(t, a), F());
}
function Mt(t, e) {
	K(e, !0);
	let n = m(e, 'ref', 15, null),
		s = Se(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class']);
	var r = G(),
		a = V(r);
	{
		let i = le(() => xe('aspect-square size-full', e.class));
		Xe(
			a,
			() => Ur,
			(l, o) => {
				o(
					l,
					Pe(
						{
							'data-slot': 'avatar-image',
							get class() {
								return h(i);
							}
						},
						() => s,
						{
							get ref() {
								return n();
							},
							set ref(c) {
								n(c);
							}
						}
					)
				);
			}
		);
	}
	(k(t, r), F());
}
function Fr(t, e) {
	K(e, !0);
	let n = m(e, 'ref', 15, null),
		s = Se(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class']);
	var r = G(),
		a = V(r);
	{
		let i = le(() =>
			xe('flex size-full items-center justify-center rounded-full bg-muted', e.class)
		);
		Xe(
			a,
			() => Kr,
			(l, o) => {
				o(
					l,
					Pe(
						{
							'data-slot': 'avatar-fallback',
							get class() {
								return h(i);
							}
						},
						() => s,
						{
							get ref() {
								return n();
							},
							set ref(c) {
								n(c);
							}
						}
					)
				);
			}
		);
	}
	(k(t, r), F());
}
function Zr(t) {
	return t();
}
function Yr(t) {
	t.forEach(Zr);
}
const Oe = [],
	_t = [],
	Me = [],
	St = [],
	$t = Promise.resolve();
let Ze = !1;
function Gr() {
	Ze || ((Ze = !0), $t.then(Xr));
}
function Qr() {
	return (Gr(), $t);
}
function Jr(t) {
	Me.push(t);
}
const Ke = new Set();
let De = 0;
function Xr() {
	do {
		for (; De < Oe.length; ) {
			const t = Oe[De];
			(De++, Wr(t.$$));
		}
		for (Oe.length = 0, De = 0; _t.length; ) _t.pop()();
		for (let t = 0; t < Me.length; t += 1) {
			const e = Me[t];
			Ke.has(e) || (Ke.add(e), e());
		}
		Me.length = 0;
	} while (Oe.length);
	for (; St.length; ) St.pop()();
	((Ze = !1), Ke.clear());
}
function Wr(t) {
	if (t.fragment !== null) {
		(t.update(), Yr(t.before_update));
		const e = t.dirty;
		((t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Jr));
	}
}
const en = { root: null, rootMargin: '0px', threshold: 0, unobserveOnEnter: !1 },
	de = (t, e) => new CustomEvent(t, { detail: e });
function tn(t, e = {}) {
	const {
		root: n,
		rootMargin: s,
		threshold: r,
		unobserveOnEnter: a
	} = Object.assign(Object.assign({}, en), e);
	let i = { x: void 0, y: void 0 },
		l = { vertical: void 0, horizontal: void 0 };
	if (typeof IntersectionObserver < 'u' && t) {
		const o = new IntersectionObserver(
			(c, u) => {
				c.forEach((f) => {
					(i.y > f.boundingClientRect.y ? (l.vertical = 'up') : (l.vertical = 'down'),
						i.x > f.boundingClientRect.x ? (l.horizontal = 'left') : (l.horizontal = 'right'),
						(i = { y: f.boundingClientRect.y, x: f.boundingClientRect.x }));
					const p = {
						inView: f.isIntersecting,
						entry: f,
						scrollDirection: l,
						node: t,
						observer: u
					};
					(t.dispatchEvent(de('inview_change', p)),
						t.dispatchEvent(de('change', p)),
						f.isIntersecting
							? (t.dispatchEvent(de('inview_enter', p)),
								t.dispatchEvent(de('enter', p)),
								a && u.unobserve(t))
							: (t.dispatchEvent(de('inview_leave', p)), t.dispatchEvent(de('leave', p))));
				});
			},
			{ root: n, rootMargin: s, threshold: r }
		);
		return (
			Qr().then(() => {
				(t.dispatchEvent(de('inview_init', { observer: o, node: t })),
					t.dispatchEvent(de('init', { observer: o, node: t })));
			}),
			o.observe(t),
			{
				destroy() {
					o.unobserve(t);
				}
			}
		);
	}
}
var rn = E('<div><!></div>');
function ne(t, e) {
	K(e, !1);
	let n = m(e, 'duration', 8, 0.4),
		s = m(e, 'delay', 8, 0),
		r = m(e, 'yOffset', 8, 6),
		a = m(e, 'inViewMargin', 8, '-50px'),
		i = m(e, 'blur', 8, '6px'),
		l = m(e, 'id', 24, () => crypto.randomUUID().slice(0, 8)),
		o = m(e, 'once', 8, !1),
		c = {
			hidden: { opacity: 0, y: r(), filter: `blur(${i()})` },
			visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
		},
		u = J('hidden'),
		f = J(!1),
		p = m(e, 'class', 8, '');
	he();
	{
		let x = be(() => [{ key: l() }]);
		Nr(t, {
			get list() {
				return h(x);
			},
			children: xt,
			$$slots: {
				default: (d, g) => {
					{
						let v = be(() => ({ delay: 0.04 + s(), duration: n(), ease: 'easeOut' }));
						Ar(d, {
							initial: 'hidden',
							get animate() {
								return h(u);
							},
							exit: 'hidden',
							get variants() {
								return c;
							},
							get transition() {
								return h(v);
							},
							children: xt,
							$$slots: {
								default: (b, z) => {
									const L = be(() => z.motion);
									var P = rn(),
										H = _(P);
									(He(H, e, 'default', {}, (S) => {
										var M = we('Default');
										k(S, M);
									}),
										w(P),
										bt(
											P,
											(S, M) => tn?.(S, M),
											() => ({ rootMargin: a(), unobserveOnEnter: o() })
										),
										bt(P, (S) => h(L)?.(S)),
										Pt(() =>
											Lt('inview_change', P, ({ detail: S }) => {
												S.inView ? (D(f, !0), D(u, 'visible')) : !o() && !h(f) && D(u, 'hidden');
											})
										),
										Q((S) => vr(P, 1, S), [() => kr((B(xe), B(p()), Y(() => xe(p()))))]),
										k(b, P));
								}
							}
						});
					}
				}
			}
		});
	}
	F();
}
var nn = E(
	'<section id="hero"><div class="mx-auto mt-10 w-full max-w-2xl space-y-8"><div class="flex justify-between gap-2"><div class="flex flex-1 flex-col space-y-1.5"><!> <!></div> <!></div></div></section>'
);
function sn(t, e) {
	K(e, !1);
	let n = 0.04,
		s = [
			'Hongbin Miao | Hi!',
			'Hongbin Miao | 你好！',
			'Hongbin Miao | こんにちは！',
			'Hongbin Miao | Hola!'
		],
		r = 0,
		a = J(s[r]),
		i;
	(dr(() => {
		i = setInterval(() => {
			((r = (r + 1) % s.length), D(a, s[r]));
		}, 3e3);
	}),
		fr(() => {
			clearInterval(i);
		}),
		he());
	var l = nn(),
		o = _(l),
		c = _(o),
		u = _(c),
		f = _(u);
	ne(f, {
		delay: n,
		class: 'font-bold tracking-tighter sm:text-xl md:text-2xl xl:text-4xl/none',
		yOffset: 8,
		children: (d, g) => {
			ye();
			var v = we();
			(Q(() => te(v, h(a))), k(d, v));
		},
		$$slots: { default: !0 }
	});
	var p = R(f, 2);
	(ne(p, {
		class: 'max-w-[600px] md:text-xl',
		delay: n,
		children: (d, g) => {
			ye();
			var v = we('LOVE crafting intuition and learning new things!');
			k(d, v);
		},
		$$slots: { default: !0 }
	}),
		w(u));
	var x = R(u, 2);
	(ne(x, {
		delay: n,
		children: (d, g) => {
			Bt(d, {
				class: 'size-30',
				children: (v, b) => {
					Mt(v, {
						alt: 'My Photo',
						get src() {
							return Tr.personal_portrait;
						},
						class: 'object-cover '
					});
				},
				$$slots: { default: !0 }
			});
		},
		$$slots: { default: !0 }
	}),
		w(c),
		w(o),
		w(l),
		k(t, l),
		F());
}
var an = E('<h2 class="text-xl font-bold">About</h2>'),
	ln =
		E(`<div class="prose max-w-full font-sans text-sm text-pretty text-gray-500 text-muted-foreground"><p>My name is Hongbin Miao (缪鸿彬) and I am a graduate student at UC Irvine.</p> <p>I am interested in <b>machine learning</b>, <b>software engineering</b>, and <b>data science</b>.</p> <p>I love hands-on and intuitive learning from <b>first principle</b> and want to communicate my
				learning through my projects (and hopefully through my blogs) 😃!</p> <br/> <p>Research Interest: <a href="https://github.com/leofan90/Awesome-World-Models?tab=readme-ov-file#foundation-paper-of-world-model"><u>World Models</u></a>, <a href="https://transformer-circuits.pub"><u>Mechanistic Interpretability</u></a>, <a href="https://youtu.be/gEbbGyNkR2U?si=UDOyahWRNr8Bu3KS"><u>Continual Learning</u></a></p></div>`),
	on = E('<section><!> <!></section>');
function cn(t) {
	let e = 0.04;
	var n = on(),
		s = _(n);
	ne(s, {
		delay: e,
		children: (a, i) => {
			var l = an();
			k(a, l);
		},
		$$slots: { default: !0 }
	});
	var r = R(s, 2);
	(ne(r, {
		delay: e * 1.4,
		children: (a, i) => {
			var l = ln();
			k(a, l);
		},
		$$slots: { default: !0 }
	}),
		w(n),
		k(t, n));
}
const un = '' + new URL('../assets/uci.CYc2Vg7Z.svg', import.meta.url).href,
	hn = '' + new URL('../assets/ucsd.BGvDbc8m.svg', import.meta.url).href;
let pn = {
	education: [
		{
			school: 'UC Irvine',
			href: 'https://uci.edu',
			degree: 'Master of Data Science',
			logoUrl: un,
			start: 'Sep 2024',
			end: 'Dec 2026'
		},
		{
			school: 'UC San Diego',
			href: 'https://ucsd.edu',
			degree: 'Bachelor of Science, Mathematics and Computer Science',
			logoUrl: hn,
			start: 'Sep 2020',
			end: 'June 2024'
		}
	]
};
function dn(t) {
	return Math.pow(t - 1, 3) * (1 - t) + 1;
}
function fn(t) {
	const e = t - 1;
	return e * e * e + 1;
}
function gn(t, { delay: e = 0, duration: n = 400, easing: s = fn, axis: r = 'y' } = {}) {
	const a = getComputedStyle(t),
		i = +a.opacity,
		l = r === 'y' ? 'height' : 'width',
		o = parseFloat(a[l]),
		c = r === 'y' ? ['top', 'bottom'] : ['left', 'right'],
		u = c.map((b) => `${b[0].toUpperCase()}${b.slice(1)}`),
		f = parseFloat(a[`padding${u[0]}`]),
		p = parseFloat(a[`padding${u[1]}`]),
		x = parseFloat(a[`margin${u[0]}`]),
		d = parseFloat(a[`margin${u[1]}`]),
		g = parseFloat(a[`border${u[0]}Width`]),
		v = parseFloat(a[`border${u[1]}Width`]);
	return {
		delay: e,
		duration: n,
		easing: s,
		css: (b) =>
			`overflow: hidden;opacity: ${Math.min(b * 20, 1) * i};${l}: ${b * o}px;padding-${c[0]}: ${b * f}px;padding-${c[1]}: ${b * p}px;margin-${c[0]}: ${b * x}px;margin-${c[1]}: ${b * d}px;border-${c[0]}-width: ${b * g}px;border-${c[1]}-width: ${b * v}px;min-${l}: 0`
	};
}
var mn = E('<!> <!>', 1),
	xn = E('<span class="inline-flex gap-x-1"></span>'),
	kn = E('<div class="font-sans text-xs"> </div>'),
	vn = E('<div class="mt-2 text-xs sm:text-sm"> </div>'),
	bn = E(
		'<a><div class="flex rounded-lg bg-transparent text-foreground"><div class="flex-none"><!></div> <div class="group ml-4 flex-grow flex-col items-center"><div class="flex flex-col"><div class="flex items-center justify-between gap-x-2 text-base"><h3 class="inline-flex items-center justify-center text-xs leading-none font-semibold sm:text-sm"> <!> <!></h3> <div class="text-right text-xs text-muted-foreground tabular-nums sm:text-sm"> </div></div> <!></div> <!></div></div></a>'
	);
function Nt(t, e) {
	K(e, !1);
	let n = m(e, 'logoUrl', 8, ''),
		s = m(e, 'company', 8, ''),
		r = m(e, 'title', 8, '');
	m(e, 'subtitle', 8, '');
	let a = m(e, 'href', 8, ''),
		i = m(e, 'badges', 24, () => ['']),
		l = m(e, 'description', 8, ''),
		o = m(e, 'start', 8, ''),
		c = m(e, 'end', 8, ''),
		u = J(!1),
		f = (y) => {
			l() && (y.preventDefault(), D(u, !h(u)));
		};
	he();
	var p = bn(),
		x = _(p),
		d = _(x),
		g = _(d);
	(Bt(g, {
		class: 'bg-muted-background m-auto size-12 border',
		children: (y, O) => {
			var C = mn(),
				I = V(C);
			Mt(I, {
				get src() {
					return n();
				},
				get alt() {
					return s();
				},
				class: 'object-fill'
			});
			var q = R(I, 2);
			(Fr(q, {
				children: (Z, pe) => {
					ye();
					var ze = we();
					(Q(() => te(ze, (B(s()), Y(() => s()[0])))), k(Z, ze));
				},
				$$slots: { default: !0 }
			}),
				k(y, C));
		},
		$$slots: { default: !0 }
	}),
		w(d));
	var v = R(d, 2),
		b = _(v),
		z = _(b),
		L = _(z),
		P = _(L),
		H = R(P);
	{
		var S = (y) => {
			var O = xn();
			(me(O, 5, i, _e, (C, I) => {
				Ot(C, {
					variant: 'secondary',
					children: (q, Z) => {
						ye();
						var pe = we();
						(Q(() => te(pe, h(I))), k(q, pe));
					},
					$$slots: { default: !0 }
				});
			}),
				w(O),
				k(y, O));
		};
		ae(H, (y) => {
			(B(i()), Y(() => i()?.length > 0 && i()[0] !== '') && y(S));
		});
	}
	var M = R(H, 2);
	{
		let y = be(
			() => (
				B(xe),
				h(u),
				Y(() =>
					xe(
						'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100',
						h(u) ? 'rotate-90' : 'rotate-0'
					)
				)
			)
		);
		Dr(M, {
			get class() {
				return h(y);
			}
		});
	}
	w(L);
	var U = R(L, 2),
		W = _(U);
	(w(U), w(z));
	var fe = R(z, 2);
	{
		var $ = (y) => {
			var O = kn(),
				C = _(O, !0);
			(w(O), Q(() => te(C, r())), k(y, O));
		};
		ae(fe, (y) => {
			r() && y($);
		});
	}
	w(b);
	var N = R(b, 2);
	{
		var ee = (y) => {
			var O = G(),
				C = V(O);
			{
				var I = (q) => {
					var Z = vn(),
						pe = _(Z, !0);
					(w(Z),
						Q(() => te(pe, l())),
						Or(
							3,
							Z,
							() => gn,
							() => ({ duration: 700, easing: dn })
						),
						k(q, Z));
				};
				ae(C, (q) => {
					h(u) && q(I);
				});
			}
			k(y, O);
		};
		ae(N, (y) => {
			l() && y(ee);
		});
	}
	(w(v),
		w(x),
		w(p),
		Q(() => {
			(X(p, 'href', a() || '#'),
				te(P, `${s() ?? ''} `),
				te(W, `${o() ?? ''} - ${c() || 'Present'}`));
		}),
		Lt('click', p, f),
		k(t, p),
		F());
}
var wn = E('<h2 class="text-xl font-bold">Education</h2>'),
	yn = E(
		'<section id="education"><div class="flex min-h-0 flex-col gap-y-3"><!> <!></div></section>'
	);
function _n(t, e) {
	K(e, !1);
	let n = 0.04;
	he();
	var s = yn(),
		r = _(s),
		a = _(r);
	ne(a, {
		delay: n,
		children: (l, o) => {
			var c = wn();
			k(l, c);
		},
		$$slots: { default: !0 }
	});
	var i = R(a, 2);
	(me(
		i,
		1,
		() => pn.education,
		_e,
		(l, o, c) => {
			ne(l, {
				delay: n * 1.2 + c * 0.05,
				children: (u, f) => {
					Nt(u, {
						get href() {
							return h(o).href;
						},
						get logoUrl() {
							return h(o).logoUrl;
						},
						get company() {
							return h(o).school;
						},
						get title() {
							return h(o).degree;
						},
						get subtitle() {
							return h(o).degree;
						},
						get start() {
							return h(o).start;
						},
						get end() {
							return h(o).end;
						}
					});
				},
				$$slots: { default: !0 }
			});
		}
	),
		w(r),
		w(s),
		k(t, s),
		F());
}
const Sn =
		"data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%201024%201024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='512'%20cy='512'%20r='512'%20style='fill:%23232f3e'/%3e%3cpath%20d='M400.3%20479.1c0%206.3.7%2011.4%201.9%2015.1%201.4%203.8%203.1%207.9%205.5%2012.3.9%201.3%201.2%202.7%201.2%203.9%200%201.7-1%203.4-3.2%205.1l-10.7%207.1c-1.3.9-2.8%201.5-4.4%201.5-1.7%200-3.4-.9-5.1-2.4-2.3-2.5-4.3-5.1-6.1-8-1.9-3.3-3.7-6.6-5.3-10-13.3%2015.7-30%2023.5-50.1%2023.5-14.3%200-25.7-4.1-34-12.2-8.3-8.2-12.6-19.1-12.6-32.7%200-14.5%205.1-26.2%2015.5-35.1%2010.4-8.9%2024.2-13.3%2041.7-13.3%205.8%200%2011.8.5%2018%201.4%206.3.9%2012.8%202.2%2019.6%203.8v-12.4c0-12.9-2.7-22-8-27.2-5.4-5.3-14.6-7.8-27.7-7.8-6%200-12.1.7-18.4%202.2s-12.4%203.4-18.4%205.8c-1.9.9-3.9%201.6-6%202.2-.9.3-1.8.4-2.7.5-2.4%200-3.6-1.7-3.6-5.3v-8.3c0-2.7.3-4.8%201.2-6%201.3-1.5%202.9-2.8%204.8-3.6%206-3.1%2013.1-5.6%2021.4-7.7%208.7-2.2%2017.6-3.3%2026.6-3.2%2020.3%200%2035.1%204.6%2044.6%2013.8%209.4%209.2%2014.1%2023.1%2014.1%2041.9v55.2l.2-.1zM331.2%20505c5.6%200%2011.4-1%2017.5-3.1%206.1-2%2011.6-5.8%2016.2-10.9%202.7-3.2%204.8-6.8%205.8-10.9%201-4.1%201.7-9%201.7-14.8v-7.1c-5.2-1.3-10.4-2.2-15.7-2.9-5.3-.7-10.7-1-16-1-11.4%200-19.8%202.2-25.4%206.8-5.6%204.6-8.3%2011.1-8.3%2019.6%200%208%202%2014%206.3%2018%204.1%204.3%2010%206.3%2017.9%206.3zm136.7%2018.4c-3.1%200-5.1-.5-6.5-1.7-1.4-1-2.6-3.4-3.6-6.6l-40-131.6c-.8-2.2-1.3-4.5-1.5-6.8%200-2.7%201.4-4.3%204.1-4.3h16.7c3.2%200%205.4.5%206.6%201.7%201.4%201%202.4%203.4%203.4%206.7l28.6%20112.7%2026.6-112.7c.9-3.4%201.9-5.6%203.2-6.7%202-1.3%204.4-1.9%206.8-1.7H526c3.2%200%205.5.5%206.8%201.7%201.3%201%202.6%203.4%203.2%206.7l26.9%20114.1%2029.5-114.1c1-3.4%202.2-5.6%203.4-6.7%202-1.3%204.3-1.9%206.6-1.7h15.9c2.7%200%204.3%201.4%204.3%204.3%200%20.9-.2%201.7-.4%202.7-.3%201.5-.7%202.9-1.2%204.3l-41%20131.6c-1%203.4-2.2%205.6-3.6%206.6-1.9%201.2-4.2%201.8-6.5%201.7h-14.7c-3.2%200-5.4-.5-6.8-1.7-1.3-1.2-2.5-3.4-3.2-6.8l-26.4-109.8L492.6%20515c-.9%203.4-1.9%205.6-3.2%206.8-1.4%201.2-3.8%201.7-6.8%201.7l-14.7-.1zm218.8%204.6c-8.9%200-17.7-1-26.2-3.1-8.5-2-15.1-4.3-19.6-6.8-2.7-1.5-4.6-3.2-5.3-4.8-.7-1.5-1-3.1-1-4.8v-8.7c0-3.6%201.4-5.3%203.9-5.3%201%200%202%20.2%203.1.5%201%20.3%202.6%201%204.3%201.7%205.8%202.6%2012.1%204.6%2018.7%206%206.8%201.4%2013.4%202%2020.3%202%2010.7%200%2019.1-1.9%2024.9-5.6%205.6-3.4%209-9.6%208.9-16.2.1-4.4-1.5-8.7-4.6-11.9-3.1-3.2-8.9-6.1-17.2-8.9l-24.7-7.7c-12.4-3.9-21.6-9.7-27.2-17.3-5.5-7.1-8.5-15.8-8.5-24.7%200-7.1%201.6-13.4%204.6-18.9%203.1-5.4%207.1-10.2%2012.3-14%205.1-3.9%2010.9-6.8%2017.7-8.9%206.8-2%2014-2.9%2021.5-2.9%203.7%200%207.7.2%2011.4.7%203.9.5%207.5%201.2%2011.1%201.9%203.4.9%206.7%201.7%209.7%202.7%203.1%201%205.5%202%207.2%203.1%202%201%203.8%202.5%205.1%204.3%201.1%201.7%201.6%203.6%201.5%205.6v8c0%203.6-1.4%205.5-3.9%205.5-2.3-.3-4.5-1-6.5-2-10.3-4.5-21.4-6.8-32.7-6.6-9.7%200-17.4%201.5-22.7%204.8-5.3%203.2-8%208.2-8%2015.1%200%204.8%201.7%208.9%205.1%2012.1%203.4%203.2%209.7%206.5%2018.7%209.4l24.2%207.6c12.2%203.9%2021.1%209.4%2026.4%2016.4%205.3%207%207.8%2015%207.8%2023.8%200%207.3-1.5%2014-4.4%2019.8-3.1%205.8-7.2%2010.9-12.4%2015-5.3%204.3-11.6%207.3-18.9%209.5-7.9%202.4-15.9%203.6-24.6%203.6zm32.2%2082.7c-56%2041.4-137.4%2063.3-207.4%2063.3-98.1%200-186.5-36.3-253.2-96.6-5.3-4.8-.5-11.2%205.8-7.5%2072.2%2041.9%20161.3%2067.3%20253.4%2067.3%2062.2%200%20130.4-12.9%20193.3-39.5%209.3-4.2%2017.3%206.2%208.1%2013zm23.3-26.5c-7.2-9.2-47.4-4.4-65.6-2.2-5.4.7-6.3-4.1-1.3-7.7%2032-22.5%2084.6-16%2090.8-8.5%206.1%207.7-1.7%2060.3-31.7%2085.5-4.6%203.9-9%201.9-7-3.2%206.8-16.9%2022-54.9%2014.8-63.9z'%20style='fill:%23fff'/%3e%3c/svg%3e",
	Rn = '' + new URL('../assets/breakout-mentors.CvaoZkGy.png', import.meta.url).href,
	An =
		'data:image/png;base64,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',
	Tn = '' + new URL('../assets/triton-robotics.DJK2Hbs8.png', import.meta.url).href;
let Cn = {
	experience: [
		{
			company: 'Amazon Web Services',
			href: 'https://aws.amazon.com',
			badges: [],
			location: 'Seattle',
			title: 'Software Engineer Intern',
			logoUrl: Sn,
			start: 'June 2025',
			end: 'Sep 2025',
			description: ''
		},
		{
			company: 'Salk Institute for Biological Studies',
			href: 'https://www.salk.edu/',
			badges: [],
			location: 'UC San Diego',
			title: 'Data Science Research Intern',
			logoUrl: An,
			start: 'Jan 2024',
			end: 'Aug 2024',
			description: ''
		},
		{
			company: 'Breakout Mentors',
			href: 'https://breakoutmentors.com/',
			badges: [],
			location: 'Remote',
			title: 'Machine Learning Intern',
			logoUrl: Rn,
			start: 'Jan 2023',
			end: 'Apr 2024',
			description: ''
		},
		{
			company: 'Triton Robotics',
			href: 'https://tritonrobotics.org',
			badges: [],
			location: 'UC San Diego',
			title: 'Computer Vision Team Lead',
			logoUrl: Tn,
			start: 'Nov 2020',
			end: 'Mar 2024',
			description: ''
		}
	]
};
var En = E('<h2 class="text-xl font-bold">Experience</h2>'),
	Pn = E(
		'<section id="experience"><div class="flex min-h-0 flex-col gap-y-3"><!> <!></div></section>'
	);
function In(t, e) {
	K(e, !1);
	let n = 0.04;
	he();
	var s = Pn(),
		r = _(s),
		a = _(r);
	ne(a, {
		delay: n,
		children: (l, o) => {
			var c = En();
			k(l, c);
		},
		$$slots: { default: !0 }
	});
	var i = R(a, 2);
	(me(
		i,
		1,
		() => Cn.experience,
		_e,
		(l, o, c) => {
			ne(l, {
				delay: n * 1.2 + c * 0.05,
				children: (u, f) => {
					Nt(
						u,
						Pe(() => h(o))
					);
				},
				$$slots: { default: !0 }
			});
		}
	),
		w(r),
		w(s),
		k(t, s),
		F());
}
const zn = '' + new URL('../assets/omniverse-virtual-assistant.ua4sQTQp.mp4', import.meta.url).href,
	Ln = '' + new URL('../assets/i-note-it._YwmP-ge.mp4', import.meta.url).href,
	On = '' + new URL('../assets/three-body-problem.CFGIJVf8.mp4', import.meta.url).href,
	Dn = '' + new URL('../assets/kunomenon.DSsRP3FM.mp4', import.meta.url).href,
	Bn = '' + new URL('../assets/kun-classifier.Dn3WhCLq.mp4', import.meta.url).href,
	Mn = '' + new URL('../assets/TR-CV.DxBCdNFu.mp4', import.meta.url).href;
let $n = {
	projects: [
		{
			title: 'Three Body Problem',
			href: 'https://github.com/zslrmhb/Three-Body-Problem',
			dates: 'Feb 2024 - March 2024',
			active: !1,
			description: 'A visual explorable of the Three Body Problem inspired by Matrix Explorable',
			technologies: ['Javascript', 'Threlte', 'GSAP', 'Skeleton UI', 'Katex'],
			links: [{ type: '', href: '', icon: '' }],
			image: '',
			video: On
		},
		{
			title: 'Kunomenon',
			href: 'https://github.com/zslrmhb/Kunomenon',
			dates: 'Feb 2024',
			active: !1,
			description: 'The trend behind top 3000+ Cai Xukun videos on Bilibili',
			technologies: ['Javascript', 'Svelte', 'D3.js'],
			links: [{ type: '', href: '', icon: '' }],
			image: '',
			video: Dn
		},
		{
			title: 'TR Computer Vision',
			href: 'https://github.com/zslrmhb/TRCV_2023',
			dates: 'April 2023',
			active: !1,
			description: 'computer vision codebase for Triton Robotics @ UC San Diego',
			technologies: ['C++', 'OpenCV', 'ROS2', 'CUDA', 'Tensor-RT'],
			links: [{ type: '', href: '', icon: '' }],
			image: '',
			video: Mn
		},
		{
			title: 'Omniverse Virtual Assistant',
			href: 'https://github.com/zslrmhb/Omniverse-Virtual-Assisstant',
			dates: 'Dec 2022 - Jan 2023',
			active: !1,
			description: 'Audio2Face Avatar with Riva SDK functionality',
			technologies: ['Python', 'Nvidia Riva', 'Audio2Face', 'Wikipedia API'],
			links: [{ type: '', href: '', icon: '' }],
			image: '',
			video: zn
		},
		{
			title: 'i-Note-it',
			href: 'https://github.com/zslrmhb/i-Note-It',
			dates: 'Jan 2023',
			active: !1,
			description: 'Enhanced Note-Taking Experience with Artificial Intelligence',
			technologies: ['Python', 'Streamlit', 'AI21 Labs API'],
			links: [{ type: '', href: '', icon: '' }],
			image: '',
			video: Ln
		},
		{
			title: 'Kun Classfier',
			href: 'https://github.com/zslrmhb/Kun_Classifier',
			dates: 'Oct 2022 - Nov 2022',
			active: !1,
			description: 'A meme-inspired binary classifier',
			technologies: ['Python', 'PyTorch', 'OpenCV', 'Streamlit'],
			links: [{ type: '', href: '', icon: '' }],
			image: '',
			video: Bn
		}
	]
};
function ot() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var ve = ot();
function Vt(t) {
	ve = t;
}
var Ce = { exec: () => null };
function T(t, e = '') {
	let n = typeof t == 'string' ? t : t.source,
		s = {
			replace: (r, a) => {
				let i = typeof a == 'string' ? a : a.source;
				return ((i = i.replace(j.caret, '$1')), (n = n.replace(r, i)), s);
			},
			getRegex: () => new RegExp(n, e)
		};
	return s;
}
var j = {
		codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
		outputLinkReplace: /\\([\[\]])/g,
		indentCodeCompensation: /^(\s+)(?:```)/,
		beginningSpace: /^\s+/,
		endingHash: /#$/,
		startingSpaceChar: /^ /,
		endingSpaceChar: / $/,
		nonSpaceChar: /[^ ]/,
		newLineCharGlobal: /\n/g,
		tabCharGlobal: /\t/g,
		multipleSpaceGlobal: /\s+/g,
		blankLine: /^[ \t]*$/,
		doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
		blockquoteStart: /^ {0,3}>/,
		blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
		blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
		listReplaceTabs: /^\t+/,
		listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
		listIsTask: /^\[[ xX]\] /,
		listReplaceTask: /^\[[ xX]\] +/,
		anyLine: /\n.*\n/,
		hrefBrackets: /^<(.*)>$/,
		tableDelimiter: /[:|]/,
		tableAlignChars: /^\||\| *$/g,
		tableRowBlankLine: /\n[ \t]*$/,
		tableAlignRight: /^ *-+: *$/,
		tableAlignCenter: /^ *:-+: *$/,
		tableAlignLeft: /^ *:-+ *$/,
		startATag: /^<a /i,
		endATag: /^<\/a>/i,
		startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
		endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
		startAngleBracket: /^</,
		endAngleBracket: />$/,
		pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
		unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
		escapeTest: /[&<>"']/,
		escapeReplace: /[&<>"']/g,
		escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
		escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
		unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
		caret: /(^|[^\[])\^/g,
		percentDecode: /%25/g,
		findPipe: /\|/g,
		splitPipe: / \|/,
		slashPipe: /\\\|/g,
		carriageReturn: /\r\n|\r/g,
		spaceLine: /^ +$/gm,
		notSpaceStart: /^\S*/,
		endingNewline: /\n$/,
		listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),
		nextBulletRegex: (t) =>
			new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
		hrRegex: (t) =>
			new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
		fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`),
		headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`),
		htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, 'i')
	},
	Nn = /^(?:[ \t]*(?:\n|$))+/,
	Vn = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
	qn =
		/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
	Ie = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
	Hn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
	ct = /(?:[*+-]|\d{1,9}[.)])/,
	qt =
		/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	Ht = T(qt)
		.replace(/bull/g, ct)
		.replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
		.replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
		.replace(/blockquote/g, / {0,3}>/)
		.replace(/heading/g, / {0,3}#{1,6}/)
		.replace(/html/g, / {0,3}<[^\n>]+>\n/)
		.replace(/\|table/g, '')
		.getRegex(),
	Un = T(qt)
		.replace(/bull/g, ct)
		.replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
		.replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
		.replace(/blockquote/g, / {0,3}>/)
		.replace(/heading/g, / {0,3}#{1,6}/)
		.replace(/html/g, / {0,3}<[^\n>]+>\n/)
		.replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/)
		.getRegex(),
	ut = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
	jn = /^[^\n]+/,
	ht = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
	Kn = T(
		/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/
	)
		.replace('label', ht)
		.replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/)
		.getRegex(),
	Fn = T(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
		.replace(/bull/g, ct)
		.getRegex(),
	Ue =
		'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul',
	pt = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
	Zn = T(
		'^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))',
		'i'
	)
		.replace('comment', pt)
		.replace('tag', Ue)
		.replace(
			'attribute',
			/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
		)
		.getRegex(),
	Ut = T(ut)
		.replace('hr', Ie)
		.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
		.replace('|lheading', '')
		.replace('|table', '')
		.replace('blockquote', ' {0,3}>')
		.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
		.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
		.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
		.replace('tag', Ue)
		.getRegex(),
	Yn = T(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
		.replace('paragraph', Ut)
		.getRegex(),
	dt = {
		blockquote: Yn,
		code: Vn,
		def: Kn,
		fences: qn,
		heading: Hn,
		hr: Ie,
		html: Zn,
		lheading: Ht,
		list: Fn,
		newline: Nn,
		paragraph: Ut,
		table: Ce,
		text: jn
	},
	Rt = T(
		'^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)'
	)
		.replace('hr', Ie)
		.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
		.replace('blockquote', ' {0,3}>')
		.replace('code', '(?: {4}| {0,3}	)[^\\n]')
		.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
		.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
		.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
		.replace('tag', Ue)
		.getRegex(),
	Gn = {
		...dt,
		lheading: Un,
		table: Rt,
		paragraph: T(ut)
			.replace('hr', Ie)
			.replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
			.replace('|lheading', '')
			.replace('table', Rt)
			.replace('blockquote', ' {0,3}>')
			.replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
			.replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
			.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
			.replace('tag', Ue)
			.getRegex()
	},
	Qn = {
		...dt,
		html: T(
			`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
		)
			.replace('comment', pt)
			.replace(
				/tag/g,
				'(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
			)
			.getRegex(),
		def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
		heading: /^(#{1,6})(.*)(?:\n+|$)/,
		fences: Ce,
		lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
		paragraph: T(ut)
			.replace('hr', Ie)
			.replace(
				'heading',
				` *#{1,6} *[^
]`
			)
			.replace('lheading', Ht)
			.replace('|table', '')
			.replace('blockquote', ' {0,3}>')
			.replace('|fences', '')
			.replace('|list', '')
			.replace('|html', '')
			.replace('|tag', '')
			.getRegex()
	},
	Jn = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
	Xn = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
	jt = /^( {2,}|\\)\n(?!\s*$)/,
	Wn = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
	je = /[\p{P}\p{S}]/u,
	ft = /[\s\p{P}\p{S}]/u,
	Kt = /[^\s\p{P}\p{S}]/u,
	es = T(/^((?![*_])punctSpace)/, 'u')
		.replace(/punctSpace/g, ft)
		.getRegex(),
	Ft = /(?!~)[\p{P}\p{S}]/u,
	ts = /(?!~)[\s\p{P}\p{S}]/u,
	rs = /(?:[^\s\p{P}\p{S}]|~)/u,
	ns = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g,
	Zt = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,
	ss = T(Zt, 'u').replace(/punct/g, je).getRegex(),
	is = T(Zt, 'u').replace(/punct/g, Ft).getRegex(),
	Yt =
		'^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)',
	as = T(Yt, 'gu')
		.replace(/notPunctSpace/g, Kt)
		.replace(/punctSpace/g, ft)
		.replace(/punct/g, je)
		.getRegex(),
	ls = T(Yt, 'gu')
		.replace(/notPunctSpace/g, rs)
		.replace(/punctSpace/g, ts)
		.replace(/punct/g, Ft)
		.getRegex(),
	os = T(
		'^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)',
		'gu'
	)
		.replace(/notPunctSpace/g, Kt)
		.replace(/punctSpace/g, ft)
		.replace(/punct/g, je)
		.getRegex(),
	cs = T(/\\(punct)/, 'gu')
		.replace(/punct/g, je)
		.getRegex(),
	us = T(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
		.replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
		.replace(
			'email',
			/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/
		)
		.getRegex(),
	hs = T(pt).replace('(?:-->|$)', '-->').getRegex(),
	ps = T(
		'^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>'
	)
		.replace('comment', hs)
		.replace(
			'attribute',
			/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/
		)
		.getRegex(),
	Ne = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
	ds = T(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/)
		.replace('label', Ne)
		.replace('href', /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/)
		.replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/)
		.getRegex(),
	Gt = T(/^!?\[(label)\]\[(ref)\]/)
		.replace('label', Ne)
		.replace('ref', ht)
		.getRegex(),
	Qt = T(/^!?\[(ref)\](?:\[\])?/)
		.replace('ref', ht)
		.getRegex(),
	fs = T('reflink|nolink(?!\\()', 'g').replace('reflink', Gt).replace('nolink', Qt).getRegex(),
	gt = {
		_backpedal: Ce,
		anyPunctuation: cs,
		autolink: us,
		blockSkip: ns,
		br: jt,
		code: Xn,
		del: Ce,
		emStrongLDelim: ss,
		emStrongRDelimAst: as,
		emStrongRDelimUnd: os,
		escape: Jn,
		link: ds,
		nolink: Qt,
		punctuation: es,
		reflink: Gt,
		reflinkSearch: fs,
		tag: ps,
		text: Wn,
		url: Ce
	},
	gs = {
		...gt,
		link: T(/^!?\[(label)\]\((.*?)\)/)
			.replace('label', Ne)
			.getRegex(),
		reflink: T(/^!?\[(label)\]\s*\[([^\]]*)\]/)
			.replace('label', Ne)
			.getRegex()
	},
	Ye = {
		...gt,
		emStrongRDelimAst: ls,
		emStrongLDelim: is,
		url: T(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i')
			.replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/)
			.getRegex(),
		_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
		del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
		text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
	},
	ms = {
		...Ye,
		br: T(jt).replace('{2,}', '*').getRegex(),
		text: T(Ye.text)
			.replace('\\b_', '\\b_| {2,}\\n')
			.replace(/\{2,\}/g, '*')
			.getRegex()
	},
	Be = { normal: dt, gfm: Gn, pedantic: Qn },
	Ae = { normal: gt, gfm: Ye, breaks: ms, pedantic: gs },
	xs = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
	At = (t) => xs[t];
function se(t, e) {
	if (e) {
		if (j.escapeTest.test(t)) return t.replace(j.escapeReplace, At);
	} else if (j.escapeTestNoEncode.test(t)) return t.replace(j.escapeReplaceNoEncode, At);
	return t;
}
function Tt(t) {
	try {
		t = encodeURI(t).replace(j.percentDecode, '%');
	} catch {
		return null;
	}
	return t;
}
function Ct(t, e) {
	let n = t.replace(j.findPipe, (a, i, l) => {
			let o = !1,
				c = i;
			for (; --c >= 0 && l[c] === '\\'; ) o = !o;
			return o ? '|' : ' |';
		}),
		s = n.split(j.splitPipe),
		r = 0;
	if ((s[0].trim() || s.shift(), s.length > 0 && !s.at(-1)?.trim() && s.pop(), e))
		if (s.length > e) s.splice(e);
		else for (; s.length < e; ) s.push('');
	for (; r < s.length; r++) s[r] = s[r].trim().replace(j.slashPipe, '|');
	return s;
}
function Te(t, e, n) {
	let s = t.length;
	if (s === 0) return '';
	let r = 0;
	for (; r < s && t.charAt(s - r - 1) === e; ) r++;
	return t.slice(0, s - r);
}
function ks(t, e) {
	if (t.indexOf(e[1]) === -1) return -1;
	let n = 0;
	for (let s = 0; s < t.length; s++)
		if (t[s] === '\\') s++;
		else if (t[s] === e[0]) n++;
		else if (t[s] === e[1] && (n--, n < 0)) return s;
	return n > 0 ? -2 : -1;
}
function Et(t, e, n, s, r) {
	let a = e.href,
		i = e.title || null,
		l = t[1].replace(r.other.outputLinkReplace, '$1');
	s.state.inLink = !0;
	let o = {
		type: t[0].charAt(0) === '!' ? 'image' : 'link',
		raw: n,
		href: a,
		title: i,
		text: l,
		tokens: s.inlineTokens(l)
	};
	return ((s.state.inLink = !1), o);
}
function vs(t, e, n) {
	let s = t.match(n.other.indentCodeCompensation);
	if (s === null) return e;
	let r = s[1];
	return e
		.split(
			`
`
		)
		.map((a) => {
			let i = a.match(n.other.beginningSpace);
			if (i === null) return a;
			let [l] = i;
			return l.length >= r.length ? a.slice(r.length) : a;
		}).join(`
`);
}
var Ve = class {
		options;
		rules;
		lexer;
		constructor(t) {
			this.options = t || ve;
		}
		space(t) {
			let e = this.rules.block.newline.exec(t);
			if (e && e[0].length > 0) return { type: 'space', raw: e[0] };
		}
		code(t) {
			let e = this.rules.block.code.exec(t);
			if (e) {
				let n = e[0].replace(this.rules.other.codeRemoveIndent, '');
				return {
					type: 'code',
					raw: e[0],
					codeBlockStyle: 'indented',
					text: this.options.pedantic
						? n
						: Te(
								n,
								`
`
							)
				};
			}
		}
		fences(t) {
			let e = this.rules.block.fences.exec(t);
			if (e) {
				let n = e[0],
					s = vs(n, e[3] || '', this.rules);
				return {
					type: 'code',
					raw: n,
					lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : e[2],
					text: s
				};
			}
		}
		heading(t) {
			let e = this.rules.block.heading.exec(t);
			if (e) {
				let n = e[2].trim();
				if (this.rules.other.endingHash.test(n)) {
					let s = Te(n, '#');
					(this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) &&
						(n = s.trim());
				}
				return {
					type: 'heading',
					raw: e[0],
					depth: e[1].length,
					text: n,
					tokens: this.lexer.inline(n)
				};
			}
		}
		hr(t) {
			let e = this.rules.block.hr.exec(t);
			if (e)
				return {
					type: 'hr',
					raw: Te(
						e[0],
						`
`
					)
				};
		}
		blockquote(t) {
			let e = this.rules.block.blockquote.exec(t);
			if (e) {
				let n = Te(
						e[0],
						`
`
					).split(`
`),
					s = '',
					r = '',
					a = [];
				for (; n.length > 0; ) {
					let i = !1,
						l = [],
						o;
					for (o = 0; o < n.length; o++)
						if (this.rules.other.blockquoteStart.test(n[o])) (l.push(n[o]), (i = !0));
						else if (!i) l.push(n[o]);
						else break;
					n = n.slice(o);
					let c = l.join(`
`),
						u = c
							.replace(
								this.rules.other.blockquoteSetextReplace,
								`
    $1`
							)
							.replace(this.rules.other.blockquoteSetextReplace2, '');
					((s = s
						? `${s}
${c}`
						: c),
						(r = r
							? `${r}
${u}`
							: u));
					let f = this.lexer.state.top;
					if (
						((this.lexer.state.top = !0),
						this.lexer.blockTokens(u, a, !0),
						(this.lexer.state.top = f),
						n.length === 0)
					)
						break;
					let p = a.at(-1);
					if (p?.type === 'code') break;
					if (p?.type === 'blockquote') {
						let x = p,
							d =
								x.raw +
								`
` +
								n.join(`
`),
							g = this.blockquote(d);
						((a[a.length - 1] = g),
							(s = s.substring(0, s.length - x.raw.length) + g.raw),
							(r = r.substring(0, r.length - x.text.length) + g.text));
						break;
					} else if (p?.type === 'list') {
						let x = p,
							d =
								x.raw +
								`
` +
								n.join(`
`),
							g = this.list(d);
						((a[a.length - 1] = g),
							(s = s.substring(0, s.length - p.raw.length) + g.raw),
							(r = r.substring(0, r.length - x.raw.length) + g.raw),
							(n = d.substring(a.at(-1).raw.length).split(`
`)));
						continue;
					}
				}
				return { type: 'blockquote', raw: s, tokens: a, text: r };
			}
		}
		list(t) {
			let e = this.rules.block.list.exec(t);
			if (e) {
				let n = e[1].trim(),
					s = n.length > 1,
					r = {
						type: 'list',
						raw: '',
						ordered: s,
						start: s ? +n.slice(0, -1) : '',
						loose: !1,
						items: []
					};
				((n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
					this.options.pedantic && (n = s ? n : '[*+-]'));
				let a = this.rules.other.listItemRegex(n),
					i = !1;
				for (; t; ) {
					let o = !1,
						c = '',
						u = '';
					if (!(e = a.exec(t)) || this.rules.block.hr.test(t)) break;
					((c = e[0]), (t = t.substring(c.length)));
					let f = e[2]
							.split(
								`
`,
								1
							)[0]
							.replace(this.rules.other.listReplaceTabs, (b) => ' '.repeat(3 * b.length)),
						p = t.split(
							`
`,
							1
						)[0],
						x = !f.trim(),
						d = 0;
					if (
						(this.options.pedantic
							? ((d = 2), (u = f.trimStart()))
							: x
								? (d = e[1].length + 1)
								: ((d = e[2].search(this.rules.other.nonSpaceChar)),
									(d = d > 4 ? 1 : d),
									(u = f.slice(d)),
									(d += e[1].length)),
						x &&
							this.rules.other.blankLine.test(p) &&
							((c +=
								p +
								`
`),
							(t = t.substring(p.length + 1)),
							(o = !0)),
						!o)
					) {
						let b = this.rules.other.nextBulletRegex(d),
							z = this.rules.other.hrRegex(d),
							L = this.rules.other.fencesBeginRegex(d),
							P = this.rules.other.headingBeginRegex(d),
							H = this.rules.other.htmlBeginRegex(d);
						for (; t; ) {
							let S = t.split(
									`
`,
									1
								)[0],
								M;
							if (
								((p = S),
								this.options.pedantic
									? ((p = p.replace(this.rules.other.listReplaceNesting, '  ')), (M = p))
									: (M = p.replace(this.rules.other.tabCharGlobal, '    ')),
								L.test(p) || P.test(p) || H.test(p) || b.test(p) || z.test(p))
							)
								break;
							if (M.search(this.rules.other.nonSpaceChar) >= d || !p.trim())
								u +=
									`
` + M.slice(d);
							else {
								if (
									x ||
									f
										.replace(this.rules.other.tabCharGlobal, '    ')
										.search(this.rules.other.nonSpaceChar) >= 4 ||
									L.test(f) ||
									P.test(f) ||
									z.test(f)
								)
									break;
								u +=
									`
` + p;
							}
							(!x && !p.trim() && (x = !0),
								(c +=
									S +
									`
`),
								(t = t.substring(S.length + 1)),
								(f = M.slice(d)));
						}
					}
					r.loose || (i ? (r.loose = !0) : this.rules.other.doubleBlankLine.test(c) && (i = !0));
					let g = null,
						v;
					(this.options.gfm &&
						((g = this.rules.other.listIsTask.exec(u)),
						g && ((v = g[0] !== '[ ] '), (u = u.replace(this.rules.other.listReplaceTask, '')))),
						r.items.push({
							type: 'list_item',
							raw: c,
							task: !!g,
							checked: v,
							loose: !1,
							text: u,
							tokens: []
						}),
						(r.raw += c));
				}
				let l = r.items.at(-1);
				if (l) ((l.raw = l.raw.trimEnd()), (l.text = l.text.trimEnd()));
				else return;
				r.raw = r.raw.trimEnd();
				for (let o = 0; o < r.items.length; o++)
					if (
						((this.lexer.state.top = !1),
						(r.items[o].tokens = this.lexer.blockTokens(r.items[o].text, [])),
						!r.loose)
					) {
						let c = r.items[o].tokens.filter((f) => f.type === 'space'),
							u = c.length > 0 && c.some((f) => this.rules.other.anyLine.test(f.raw));
						r.loose = u;
					}
				if (r.loose) for (let o = 0; o < r.items.length; o++) r.items[o].loose = !0;
				return r;
			}
		}
		html(t) {
			let e = this.rules.block.html.exec(t);
			if (e)
				return {
					type: 'html',
					block: !0,
					raw: e[0],
					pre: e[1] === 'pre' || e[1] === 'script' || e[1] === 'style',
					text: e[0]
				};
		}
		def(t) {
			let e = this.rules.block.def.exec(t);
			if (e) {
				let n = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, ' '),
					s = e[2]
						? e[2]
								.replace(this.rules.other.hrefBrackets, '$1')
								.replace(this.rules.inline.anyPunctuation, '$1')
						: '',
					r = e[3]
						? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1')
						: e[3];
				return { type: 'def', tag: n, raw: e[0], href: s, title: r };
			}
		}
		table(t) {
			let e = this.rules.block.table.exec(t);
			if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
			let n = Ct(e[1]),
				s = e[2].replace(this.rules.other.tableAlignChars, '').split('|'),
				r = e[3]?.trim()
					? e[3].replace(this.rules.other.tableRowBlankLine, '').split(`
`)
					: [],
				a = { type: 'table', raw: e[0], header: [], align: [], rows: [] };
			if (n.length === s.length) {
				for (let i of s)
					this.rules.other.tableAlignRight.test(i)
						? a.align.push('right')
						: this.rules.other.tableAlignCenter.test(i)
							? a.align.push('center')
							: this.rules.other.tableAlignLeft.test(i)
								? a.align.push('left')
								: a.align.push(null);
				for (let i = 0; i < n.length; i++)
					a.header.push({
						text: n[i],
						tokens: this.lexer.inline(n[i]),
						header: !0,
						align: a.align[i]
					});
				for (let i of r)
					a.rows.push(
						Ct(i, a.header.length).map((l, o) => ({
							text: l,
							tokens: this.lexer.inline(l),
							header: !1,
							align: a.align[o]
						}))
					);
				return a;
			}
		}
		lheading(t) {
			let e = this.rules.block.lheading.exec(t);
			if (e)
				return {
					type: 'heading',
					raw: e[0],
					depth: e[2].charAt(0) === '=' ? 1 : 2,
					text: e[1],
					tokens: this.lexer.inline(e[1])
				};
		}
		paragraph(t) {
			let e = this.rules.block.paragraph.exec(t);
			if (e) {
				let n =
					e[1].charAt(e[1].length - 1) ===
					`
`
						? e[1].slice(0, -1)
						: e[1];
				return { type: 'paragraph', raw: e[0], text: n, tokens: this.lexer.inline(n) };
			}
		}
		text(t) {
			let e = this.rules.block.text.exec(t);
			if (e) return { type: 'text', raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
		}
		escape(t) {
			let e = this.rules.inline.escape.exec(t);
			if (e) return { type: 'escape', raw: e[0], text: e[1] };
		}
		tag(t) {
			let e = this.rules.inline.tag.exec(t);
			if (e)
				return (
					!this.lexer.state.inLink && this.rules.other.startATag.test(e[0])
						? (this.lexer.state.inLink = !0)
						: this.lexer.state.inLink &&
							this.rules.other.endATag.test(e[0]) &&
							(this.lexer.state.inLink = !1),
					!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0])
						? (this.lexer.state.inRawBlock = !0)
						: this.lexer.state.inRawBlock &&
							this.rules.other.endPreScriptTag.test(e[0]) &&
							(this.lexer.state.inRawBlock = !1),
					{
						type: 'html',
						raw: e[0],
						inLink: this.lexer.state.inLink,
						inRawBlock: this.lexer.state.inRawBlock,
						block: !1,
						text: e[0]
					}
				);
		}
		link(t) {
			let e = this.rules.inline.link.exec(t);
			if (e) {
				let n = e[2].trim();
				if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
					if (!this.rules.other.endAngleBracket.test(n)) return;
					let a = Te(n.slice(0, -1), '\\');
					if ((n.length - a.length) % 2 === 0) return;
				} else {
					let a = ks(e[2], '()');
					if (a === -2) return;
					if (a > -1) {
						let i = (e[0].indexOf('!') === 0 ? 5 : 4) + e[1].length + a;
						((e[2] = e[2].substring(0, a)), (e[0] = e[0].substring(0, i).trim()), (e[3] = ''));
					}
				}
				let s = e[2],
					r = '';
				if (this.options.pedantic) {
					let a = this.rules.other.pedanticHrefTitle.exec(s);
					a && ((s = a[1]), (r = a[3]));
				} else r = e[3] ? e[3].slice(1, -1) : '';
				return (
					(s = s.trim()),
					this.rules.other.startAngleBracket.test(s) &&
						(this.options.pedantic && !this.rules.other.endAngleBracket.test(n)
							? (s = s.slice(1))
							: (s = s.slice(1, -1))),
					Et(
						e,
						{
							href: s && s.replace(this.rules.inline.anyPunctuation, '$1'),
							title: r && r.replace(this.rules.inline.anyPunctuation, '$1')
						},
						e[0],
						this.lexer,
						this.rules
					)
				);
			}
		}
		reflink(t, e) {
			let n;
			if ((n = this.rules.inline.reflink.exec(t)) || (n = this.rules.inline.nolink.exec(t))) {
				let s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, ' '),
					r = e[s.toLowerCase()];
				if (!r) {
					let a = n[0].charAt(0);
					return { type: 'text', raw: a, text: a };
				}
				return Et(n, r, n[0], this.lexer, this.rules);
			}
		}
		emStrong(t, e, n = '') {
			let s = this.rules.inline.emStrongLDelim.exec(t);
			if (
				!(!s || (s[3] && n.match(this.rules.other.unicodeAlphaNumeric))) &&
				(!(s[1] || s[2]) || !n || this.rules.inline.punctuation.exec(n))
			) {
				let r = [...s[0]].length - 1,
					a,
					i,
					l = r,
					o = 0,
					c =
						s[0][0] === '*'
							? this.rules.inline.emStrongRDelimAst
							: this.rules.inline.emStrongRDelimUnd;
				for (c.lastIndex = 0, e = e.slice(-1 * t.length + r); (s = c.exec(e)) != null; ) {
					if (((a = s[1] || s[2] || s[3] || s[4] || s[5] || s[6]), !a)) continue;
					if (((i = [...a].length), s[3] || s[4])) {
						l += i;
						continue;
					} else if ((s[5] || s[6]) && r % 3 && !((r + i) % 3)) {
						o += i;
						continue;
					}
					if (((l -= i), l > 0)) continue;
					i = Math.min(i, i + l + o);
					let u = [...s[0]][0].length,
						f = t.slice(0, r + s.index + u + i);
					if (Math.min(r, i) % 2) {
						let x = f.slice(1, -1);
						return { type: 'em', raw: f, text: x, tokens: this.lexer.inlineTokens(x) };
					}
					let p = f.slice(2, -2);
					return { type: 'strong', raw: f, text: p, tokens: this.lexer.inlineTokens(p) };
				}
			}
		}
		codespan(t) {
			let e = this.rules.inline.code.exec(t);
			if (e) {
				let n = e[2].replace(this.rules.other.newLineCharGlobal, ' '),
					s = this.rules.other.nonSpaceChar.test(n),
					r =
						this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
				return (
					s && r && (n = n.substring(1, n.length - 1)),
					{ type: 'codespan', raw: e[0], text: n }
				);
			}
		}
		br(t) {
			let e = this.rules.inline.br.exec(t);
			if (e) return { type: 'br', raw: e[0] };
		}
		del(t) {
			let e = this.rules.inline.del.exec(t);
			if (e) return { type: 'del', raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
		}
		autolink(t) {
			let e = this.rules.inline.autolink.exec(t);
			if (e) {
				let n, s;
				return (
					e[2] === '@' ? ((n = e[1]), (s = 'mailto:' + n)) : ((n = e[1]), (s = n)),
					{ type: 'link', raw: e[0], text: n, href: s, tokens: [{ type: 'text', raw: n, text: n }] }
				);
			}
		}
		url(t) {
			let e;
			if ((e = this.rules.inline.url.exec(t))) {
				let n, s;
				if (e[2] === '@') ((n = e[0]), (s = 'mailto:' + n));
				else {
					let r;
					do ((r = e[0]), (e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? ''));
					while (r !== e[0]);
					((n = e[0]), e[1] === 'www.' ? (s = 'http://' + e[0]) : (s = e[0]));
				}
				return {
					type: 'link',
					raw: e[0],
					text: n,
					href: s,
					tokens: [{ type: 'text', raw: n, text: n }]
				};
			}
		}
		inlineText(t) {
			let e = this.rules.inline.text.exec(t);
			if (e) {
				let n = this.lexer.state.inRawBlock;
				return { type: 'text', raw: e[0], text: e[0], escaped: n };
			}
		}
	},
	ce = class Ge {
		tokens;
		options;
		state;
		tokenizer;
		inlineQueue;
		constructor(e) {
			((this.tokens = []),
				(this.tokens.links = Object.create(null)),
				(this.options = e || ve),
				(this.options.tokenizer = this.options.tokenizer || new Ve()),
				(this.tokenizer = this.options.tokenizer),
				(this.tokenizer.options = this.options),
				(this.tokenizer.lexer = this),
				(this.inlineQueue = []),
				(this.state = { inLink: !1, inRawBlock: !1, top: !0 }));
			let n = { other: j, block: Be.normal, inline: Ae.normal };
			(this.options.pedantic
				? ((n.block = Be.pedantic), (n.inline = Ae.pedantic))
				: this.options.gfm &&
					((n.block = Be.gfm), this.options.breaks ? (n.inline = Ae.breaks) : (n.inline = Ae.gfm)),
				(this.tokenizer.rules = n));
		}
		static get rules() {
			return { block: Be, inline: Ae };
		}
		static lex(e, n) {
			return new Ge(n).lex(e);
		}
		static lexInline(e, n) {
			return new Ge(n).inlineTokens(e);
		}
		lex(e) {
			((e = e.replace(
				j.carriageReturn,
				`
`
			)),
				this.blockTokens(e, this.tokens));
			for (let n = 0; n < this.inlineQueue.length; n++) {
				let s = this.inlineQueue[n];
				this.inlineTokens(s.src, s.tokens);
			}
			return ((this.inlineQueue = []), this.tokens);
		}
		blockTokens(e, n = [], s = !1) {
			for (
				this.options.pedantic && (e = e.replace(j.tabCharGlobal, '    ').replace(j.spaceLine, ''));
				e;

			) {
				let r;
				if (
					this.options.extensions?.block?.some((i) =>
						(r = i.call({ lexer: this }, e, n))
							? ((e = e.substring(r.raw.length)), n.push(r), !0)
							: !1
					)
				)
					continue;
				if ((r = this.tokenizer.space(e))) {
					e = e.substring(r.raw.length);
					let i = n.at(-1);
					r.raw.length === 1 && i !== void 0
						? (i.raw += `
`)
						: n.push(r);
					continue;
				}
				if ((r = this.tokenizer.code(e))) {
					e = e.substring(r.raw.length);
					let i = n.at(-1);
					i?.type === 'paragraph' || i?.type === 'text'
						? ((i.raw +=
								(i.raw.endsWith(`
`)
									? ''
									: `
`) + r.raw),
							(i.text +=
								`
` + r.text),
							(this.inlineQueue.at(-1).src = i.text))
						: n.push(r);
					continue;
				}
				if ((r = this.tokenizer.fences(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.heading(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.hr(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.blockquote(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.list(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.html(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.def(e))) {
					e = e.substring(r.raw.length);
					let i = n.at(-1);
					i?.type === 'paragraph' || i?.type === 'text'
						? ((i.raw +=
								(i.raw.endsWith(`
`)
									? ''
									: `
`) + r.raw),
							(i.text +=
								`
` + r.raw),
							(this.inlineQueue.at(-1).src = i.text))
						: this.tokens.links[r.tag] ||
							(this.tokens.links[r.tag] = { href: r.href, title: r.title });
					continue;
				}
				if ((r = this.tokenizer.table(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				if ((r = this.tokenizer.lheading(e))) {
					((e = e.substring(r.raw.length)), n.push(r));
					continue;
				}
				let a = e;
				if (this.options.extensions?.startBlock) {
					let i = 1 / 0,
						l = e.slice(1),
						o;
					(this.options.extensions.startBlock.forEach((c) => {
						((o = c.call({ lexer: this }, l)),
							typeof o == 'number' && o >= 0 && (i = Math.min(i, o)));
					}),
						i < 1 / 0 && i >= 0 && (a = e.substring(0, i + 1)));
				}
				if (this.state.top && (r = this.tokenizer.paragraph(a))) {
					let i = n.at(-1);
					(s && i?.type === 'paragraph'
						? ((i.raw +=
								(i.raw.endsWith(`
`)
									? ''
									: `
`) + r.raw),
							(i.text +=
								`
` + r.text),
							this.inlineQueue.pop(),
							(this.inlineQueue.at(-1).src = i.text))
						: n.push(r),
						(s = a.length !== e.length),
						(e = e.substring(r.raw.length)));
					continue;
				}
				if ((r = this.tokenizer.text(e))) {
					e = e.substring(r.raw.length);
					let i = n.at(-1);
					i?.type === 'text'
						? ((i.raw +=
								(i.raw.endsWith(`
`)
									? ''
									: `
`) + r.raw),
							(i.text +=
								`
` + r.text),
							this.inlineQueue.pop(),
							(this.inlineQueue.at(-1).src = i.text))
						: n.push(r);
					continue;
				}
				if (e) {
					let i = 'Infinite loop on byte: ' + e.charCodeAt(0);
					if (this.options.silent) {
						console.error(i);
						break;
					} else throw new Error(i);
				}
			}
			return ((this.state.top = !0), n);
		}
		inline(e, n = []) {
			return (this.inlineQueue.push({ src: e, tokens: n }), n);
		}
		inlineTokens(e, n = []) {
			let s = e,
				r = null;
			if (this.tokens.links) {
				let l = Object.keys(this.tokens.links);
				if (l.length > 0)
					for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; )
						l.includes(r[0].slice(r[0].lastIndexOf('[') + 1, -1)) &&
							(s =
								s.slice(0, r.index) +
								'[' +
								'a'.repeat(r[0].length - 2) +
								']' +
								s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
			}
			for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
				s =
					s.slice(0, r.index) +
					'++' +
					s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
			for (; (r = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
				s =
					s.slice(0, r.index) +
					'[' +
					'a'.repeat(r[0].length - 2) +
					']' +
					s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
			let a = !1,
				i = '';
			for (; e; ) {
				(a || (i = ''), (a = !1));
				let l;
				if (
					this.options.extensions?.inline?.some((c) =>
						(l = c.call({ lexer: this }, e, n))
							? ((e = e.substring(l.raw.length)), n.push(l), !0)
							: !1
					)
				)
					continue;
				if ((l = this.tokenizer.escape(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.tag(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.link(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.reflink(e, this.tokens.links))) {
					e = e.substring(l.raw.length);
					let c = n.at(-1);
					l.type === 'text' && c?.type === 'text'
						? ((c.raw += l.raw), (c.text += l.text))
						: n.push(l);
					continue;
				}
				if ((l = this.tokenizer.emStrong(e, s, i))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.codespan(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.br(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.del(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if ((l = this.tokenizer.autolink(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				if (!this.state.inLink && (l = this.tokenizer.url(e))) {
					((e = e.substring(l.raw.length)), n.push(l));
					continue;
				}
				let o = e;
				if (this.options.extensions?.startInline) {
					let c = 1 / 0,
						u = e.slice(1),
						f;
					(this.options.extensions.startInline.forEach((p) => {
						((f = p.call({ lexer: this }, u)),
							typeof f == 'number' && f >= 0 && (c = Math.min(c, f)));
					}),
						c < 1 / 0 && c >= 0 && (o = e.substring(0, c + 1)));
				}
				if ((l = this.tokenizer.inlineText(o))) {
					((e = e.substring(l.raw.length)),
						l.raw.slice(-1) !== '_' && (i = l.raw.slice(-1)),
						(a = !0));
					let c = n.at(-1);
					c?.type === 'text' ? ((c.raw += l.raw), (c.text += l.text)) : n.push(l);
					continue;
				}
				if (e) {
					let c = 'Infinite loop on byte: ' + e.charCodeAt(0);
					if (this.options.silent) {
						console.error(c);
						break;
					} else throw new Error(c);
				}
			}
			return n;
		}
	},
	qe = class {
		options;
		parser;
		constructor(t) {
			this.options = t || ve;
		}
		space(t) {
			return '';
		}
		code({ text: t, lang: e, escaped: n }) {
			let s = (e || '').match(j.notSpaceStart)?.[0],
				r =
					t.replace(j.endingNewline, '') +
					`
`;
			return s
				? '<pre><code class="language-' +
						se(s) +
						'">' +
						(n ? r : se(r, !0)) +
						`</code></pre>
`
				: '<pre><code>' +
						(n ? r : se(r, !0)) +
						`</code></pre>
`;
		}
		blockquote({ tokens: t }) {
			return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
		}
		html({ text: t }) {
			return t;
		}
		heading({ tokens: t, depth: e }) {
			return `<h${e}>${this.parser.parseInline(t)}</h${e}>
`;
		}
		hr(t) {
			return `<hr>
`;
		}
		list(t) {
			let e = t.ordered,
				n = t.start,
				s = '';
			for (let i = 0; i < t.items.length; i++) {
				let l = t.items[i];
				s += this.listitem(l);
			}
			let r = e ? 'ol' : 'ul',
				a = e && n !== 1 ? ' start="' + n + '"' : '';
			return (
				'<' +
				r +
				a +
				`>
` +
				s +
				'</' +
				r +
				`>
`
			);
		}
		listitem(t) {
			let e = '';
			if (t.task) {
				let n = this.checkbox({ checked: !!t.checked });
				t.loose
					? t.tokens[0]?.type === 'paragraph'
						? ((t.tokens[0].text = n + ' ' + t.tokens[0].text),
							t.tokens[0].tokens &&
								t.tokens[0].tokens.length > 0 &&
								t.tokens[0].tokens[0].type === 'text' &&
								((t.tokens[0].tokens[0].text = n + ' ' + se(t.tokens[0].tokens[0].text)),
								(t.tokens[0].tokens[0].escaped = !0)))
						: t.tokens.unshift({ type: 'text', raw: n + ' ', text: n + ' ', escaped: !0 })
					: (e += n + ' ');
			}
			return (
				(e += this.parser.parse(t.tokens, !!t.loose)),
				`<li>${e}</li>
`
			);
		}
		checkbox({ checked: t }) {
			return '<input ' + (t ? 'checked="" ' : '') + 'disabled="" type="checkbox">';
		}
		paragraph({ tokens: t }) {
			return `<p>${this.parser.parseInline(t)}</p>
`;
		}
		table(t) {
			let e = '',
				n = '';
			for (let r = 0; r < t.header.length; r++) n += this.tablecell(t.header[r]);
			e += this.tablerow({ text: n });
			let s = '';
			for (let r = 0; r < t.rows.length; r++) {
				let a = t.rows[r];
				n = '';
				for (let i = 0; i < a.length; i++) n += this.tablecell(a[i]);
				s += this.tablerow({ text: n });
			}
			return (
				s && (s = `<tbody>${s}</tbody>`),
				`<table>
<thead>
` +
					e +
					`</thead>
` +
					s +
					`</table>
`
			);
		}
		tablerow({ text: t }) {
			return `<tr>
${t}</tr>
`;
		}
		tablecell(t) {
			let e = this.parser.parseInline(t.tokens),
				n = t.header ? 'th' : 'td';
			return (
				(t.align ? `<${n} align="${t.align}">` : `<${n}>`) +
				e +
				`</${n}>
`
			);
		}
		strong({ tokens: t }) {
			return `<strong>${this.parser.parseInline(t)}</strong>`;
		}
		em({ tokens: t }) {
			return `<em>${this.parser.parseInline(t)}</em>`;
		}
		codespan({ text: t }) {
			return `<code>${se(t, !0)}</code>`;
		}
		br(t) {
			return '<br>';
		}
		del({ tokens: t }) {
			return `<del>${this.parser.parseInline(t)}</del>`;
		}
		link({ href: t, title: e, tokens: n }) {
			let s = this.parser.parseInline(n),
				r = Tt(t);
			if (r === null) return s;
			t = r;
			let a = '<a href="' + t + '"';
			return (e && (a += ' title="' + se(e) + '"'), (a += '>' + s + '</a>'), a);
		}
		image({ href: t, title: e, text: n, tokens: s }) {
			s && (n = this.parser.parseInline(s, this.parser.textRenderer));
			let r = Tt(t);
			if (r === null) return se(n);
			t = r;
			let a = `<img src="${t}" alt="${n}"`;
			return (e && (a += ` title="${se(e)}"`), (a += '>'), a);
		}
		text(t) {
			return 'tokens' in t && t.tokens
				? this.parser.parseInline(t.tokens)
				: 'escaped' in t && t.escaped
					? t.text
					: se(t.text);
		}
	},
	mt = class {
		strong({ text: t }) {
			return t;
		}
		em({ text: t }) {
			return t;
		}
		codespan({ text: t }) {
			return t;
		}
		del({ text: t }) {
			return t;
		}
		html({ text: t }) {
			return t;
		}
		text({ text: t }) {
			return t;
		}
		link({ text: t }) {
			return '' + t;
		}
		image({ text: t }) {
			return '' + t;
		}
		br() {
			return '';
		}
	},
	ue = class Qe {
		options;
		renderer;
		textRenderer;
		constructor(e) {
			((this.options = e || ve),
				(this.options.renderer = this.options.renderer || new qe()),
				(this.renderer = this.options.renderer),
				(this.renderer.options = this.options),
				(this.renderer.parser = this),
				(this.textRenderer = new mt()));
		}
		static parse(e, n) {
			return new Qe(n).parse(e);
		}
		static parseInline(e, n) {
			return new Qe(n).parseInline(e);
		}
		parse(e, n = !0) {
			let s = '';
			for (let r = 0; r < e.length; r++) {
				let a = e[r];
				if (this.options.extensions?.renderers?.[a.type]) {
					let l = a,
						o = this.options.extensions.renderers[l.type].call({ parser: this }, l);
					if (
						o !== !1 ||
						![
							'space',
							'hr',
							'heading',
							'code',
							'table',
							'blockquote',
							'list',
							'html',
							'paragraph',
							'text'
						].includes(l.type)
					) {
						s += o || '';
						continue;
					}
				}
				let i = a;
				switch (i.type) {
					case 'space': {
						s += this.renderer.space(i);
						continue;
					}
					case 'hr': {
						s += this.renderer.hr(i);
						continue;
					}
					case 'heading': {
						s += this.renderer.heading(i);
						continue;
					}
					case 'code': {
						s += this.renderer.code(i);
						continue;
					}
					case 'table': {
						s += this.renderer.table(i);
						continue;
					}
					case 'blockquote': {
						s += this.renderer.blockquote(i);
						continue;
					}
					case 'list': {
						s += this.renderer.list(i);
						continue;
					}
					case 'html': {
						s += this.renderer.html(i);
						continue;
					}
					case 'paragraph': {
						s += this.renderer.paragraph(i);
						continue;
					}
					case 'text': {
						let l = i,
							o = this.renderer.text(l);
						for (; r + 1 < e.length && e[r + 1].type === 'text'; )
							((l = e[++r]),
								(o +=
									`
` + this.renderer.text(l)));
						n
							? (s += this.renderer.paragraph({
									type: 'paragraph',
									raw: o,
									text: o,
									tokens: [{ type: 'text', raw: o, text: o, escaped: !0 }]
								}))
							: (s += o);
						continue;
					}
					default: {
						let l = 'Token with "' + i.type + '" type was not found.';
						if (this.options.silent) return (console.error(l), '');
						throw new Error(l);
					}
				}
			}
			return s;
		}
		parseInline(e, n = this.renderer) {
			let s = '';
			for (let r = 0; r < e.length; r++) {
				let a = e[r];
				if (this.options.extensions?.renderers?.[a.type]) {
					let l = this.options.extensions.renderers[a.type].call({ parser: this }, a);
					if (
						l !== !1 ||
						![
							'escape',
							'html',
							'link',
							'image',
							'strong',
							'em',
							'codespan',
							'br',
							'del',
							'text'
						].includes(a.type)
					) {
						s += l || '';
						continue;
					}
				}
				let i = a;
				switch (i.type) {
					case 'escape': {
						s += n.text(i);
						break;
					}
					case 'html': {
						s += n.html(i);
						break;
					}
					case 'link': {
						s += n.link(i);
						break;
					}
					case 'image': {
						s += n.image(i);
						break;
					}
					case 'strong': {
						s += n.strong(i);
						break;
					}
					case 'em': {
						s += n.em(i);
						break;
					}
					case 'codespan': {
						s += n.codespan(i);
						break;
					}
					case 'br': {
						s += n.br(i);
						break;
					}
					case 'del': {
						s += n.del(i);
						break;
					}
					case 'text': {
						s += n.text(i);
						break;
					}
					default: {
						let l = 'Token with "' + i.type + '" type was not found.';
						if (this.options.silent) return (console.error(l), '');
						throw new Error(l);
					}
				}
			}
			return s;
		}
	},
	$e = class {
		options;
		block;
		constructor(t) {
			this.options = t || ve;
		}
		static passThroughHooks = new Set(['preprocess', 'postprocess', 'processAllTokens']);
		preprocess(t) {
			return t;
		}
		postprocess(t) {
			return t;
		}
		processAllTokens(t) {
			return t;
		}
		provideLexer() {
			return this.block ? ce.lex : ce.lexInline;
		}
		provideParser() {
			return this.block ? ue.parse : ue.parseInline;
		}
	},
	bs = class {
		defaults = ot();
		options = this.setOptions;
		parse = this.parseMarkdown(!0);
		parseInline = this.parseMarkdown(!1);
		Parser = ue;
		Renderer = qe;
		TextRenderer = mt;
		Lexer = ce;
		Tokenizer = Ve;
		Hooks = $e;
		constructor(...t) {
			this.use(...t);
		}
		walkTokens(t, e) {
			let n = [];
			for (let s of t)
				switch (((n = n.concat(e.call(this, s))), s.type)) {
					case 'table': {
						let r = s;
						for (let a of r.header) n = n.concat(this.walkTokens(a.tokens, e));
						for (let a of r.rows) for (let i of a) n = n.concat(this.walkTokens(i.tokens, e));
						break;
					}
					case 'list': {
						let r = s;
						n = n.concat(this.walkTokens(r.items, e));
						break;
					}
					default: {
						let r = s;
						this.defaults.extensions?.childTokens?.[r.type]
							? this.defaults.extensions.childTokens[r.type].forEach((a) => {
									let i = r[a].flat(1 / 0);
									n = n.concat(this.walkTokens(i, e));
								})
							: r.tokens && (n = n.concat(this.walkTokens(r.tokens, e)));
					}
				}
			return n;
		}
		use(...t) {
			let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
			return (
				t.forEach((n) => {
					let s = { ...n };
					if (
						((s.async = this.defaults.async || s.async || !1),
						n.extensions &&
							(n.extensions.forEach((r) => {
								if (!r.name) throw new Error('extension name required');
								if ('renderer' in r) {
									let a = e.renderers[r.name];
									a
										? (e.renderers[r.name] = function (...i) {
												let l = r.renderer.apply(this, i);
												return (l === !1 && (l = a.apply(this, i)), l);
											})
										: (e.renderers[r.name] = r.renderer);
								}
								if ('tokenizer' in r) {
									if (!r.level || (r.level !== 'block' && r.level !== 'inline'))
										throw new Error("extension level must be 'block' or 'inline'");
									let a = e[r.level];
									(a ? a.unshift(r.tokenizer) : (e[r.level] = [r.tokenizer]),
										r.start &&
											(r.level === 'block'
												? e.startBlock
													? e.startBlock.push(r.start)
													: (e.startBlock = [r.start])
												: r.level === 'inline' &&
													(e.startInline
														? e.startInline.push(r.start)
														: (e.startInline = [r.start]))));
								}
								'childTokens' in r && r.childTokens && (e.childTokens[r.name] = r.childTokens);
							}),
							(s.extensions = e)),
						n.renderer)
					) {
						let r = this.defaults.renderer || new qe(this.defaults);
						for (let a in n.renderer) {
							if (!(a in r)) throw new Error(`renderer '${a}' does not exist`);
							if (['options', 'parser'].includes(a)) continue;
							let i = a,
								l = n.renderer[i],
								o = r[i];
							r[i] = (...c) => {
								let u = l.apply(r, c);
								return (u === !1 && (u = o.apply(r, c)), u || '');
							};
						}
						s.renderer = r;
					}
					if (n.tokenizer) {
						let r = this.defaults.tokenizer || new Ve(this.defaults);
						for (let a in n.tokenizer) {
							if (!(a in r)) throw new Error(`tokenizer '${a}' does not exist`);
							if (['options', 'rules', 'lexer'].includes(a)) continue;
							let i = a,
								l = n.tokenizer[i],
								o = r[i];
							r[i] = (...c) => {
								let u = l.apply(r, c);
								return (u === !1 && (u = o.apply(r, c)), u);
							};
						}
						s.tokenizer = r;
					}
					if (n.hooks) {
						let r = this.defaults.hooks || new $e();
						for (let a in n.hooks) {
							if (!(a in r)) throw new Error(`hook '${a}' does not exist`);
							if (['options', 'block'].includes(a)) continue;
							let i = a,
								l = n.hooks[i],
								o = r[i];
							$e.passThroughHooks.has(a)
								? (r[i] = (c) => {
										if (this.defaults.async)
											return Promise.resolve(l.call(r, c)).then((f) => o.call(r, f));
										let u = l.call(r, c);
										return o.call(r, u);
									})
								: (r[i] = (...c) => {
										let u = l.apply(r, c);
										return (u === !1 && (u = o.apply(r, c)), u);
									});
						}
						s.hooks = r;
					}
					if (n.walkTokens) {
						let r = this.defaults.walkTokens,
							a = n.walkTokens;
						s.walkTokens = function (i) {
							let l = [];
							return (l.push(a.call(this, i)), r && (l = l.concat(r.call(this, i))), l);
						};
					}
					this.defaults = { ...this.defaults, ...s };
				}),
				this
			);
		}
		setOptions(t) {
			return ((this.defaults = { ...this.defaults, ...t }), this);
		}
		lexer(t, e) {
			return ce.lex(t, e ?? this.defaults);
		}
		parser(t, e) {
			return ue.parse(t, e ?? this.defaults);
		}
		parseMarkdown(t) {
			return (e, n) => {
				let s = { ...n },
					r = { ...this.defaults, ...s },
					a = this.onError(!!r.silent, !!r.async);
				if (this.defaults.async === !0 && s.async === !1)
					return a(
						new Error(
							'marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.'
						)
					);
				if (typeof e > 'u' || e === null)
					return a(new Error('marked(): input parameter is undefined or null'));
				if (typeof e != 'string')
					return a(
						new Error(
							'marked(): input parameter is of type ' +
								Object.prototype.toString.call(e) +
								', string expected'
						)
					);
				r.hooks && ((r.hooks.options = r), (r.hooks.block = t));
				let i = r.hooks ? r.hooks.provideLexer() : t ? ce.lex : ce.lexInline,
					l = r.hooks ? r.hooks.provideParser() : t ? ue.parse : ue.parseInline;
				if (r.async)
					return Promise.resolve(r.hooks ? r.hooks.preprocess(e) : e)
						.then((o) => i(o, r))
						.then((o) => (r.hooks ? r.hooks.processAllTokens(o) : o))
						.then((o) =>
							r.walkTokens ? Promise.all(this.walkTokens(o, r.walkTokens)).then(() => o) : o
						)
						.then((o) => l(o, r))
						.then((o) => (r.hooks ? r.hooks.postprocess(o) : o))
						.catch(a);
				try {
					r.hooks && (e = r.hooks.preprocess(e));
					let o = i(e, r);
					(r.hooks && (o = r.hooks.processAllTokens(o)),
						r.walkTokens && this.walkTokens(o, r.walkTokens));
					let c = l(o, r);
					return (r.hooks && (c = r.hooks.postprocess(c)), c);
				} catch (o) {
					return a(o);
				}
			};
		}
		onError(t, e) {
			return (n) => {
				if (
					((n.message += `
Please report this to https://github.com/markedjs/marked.`),
					t)
				) {
					let s = '<p>An error occurred:</p><pre>' + se(n.message + '', !0) + '</pre>';
					return e ? Promise.resolve(s) : s;
				}
				if (e) return Promise.reject(n);
				throw n;
			};
		}
	},
	ke = new bs();
function A(t, e) {
	return ke.parse(t, e);
}
A.options = A.setOptions = function (t) {
	return (ke.setOptions(t), (A.defaults = ke.defaults), Vt(A.defaults), A);
};
A.getDefaults = ot;
A.defaults = ve;
A.use = function (...t) {
	return (ke.use(...t), (A.defaults = ke.defaults), Vt(A.defaults), A);
};
A.walkTokens = function (t, e) {
	return ke.walkTokens(t, e);
};
A.parseInline = ke.parseInline;
A.Parser = ue;
A.parser = ue.parse;
A.Renderer = qe;
A.TextRenderer = mt;
A.Lexer = ce;
A.lexer = ce.lex;
A.Tokenizer = Ve;
A.Hooks = $e;
A.parse = A;
A.options;
A.setOptions;
A.use;
A.walkTokens;
A.parseInline;
ue.parse;
ce.lex;
var ws = E(
		'<video class="pointer-events-none mx-auto h-40 w-full object-cover object-top" autoplay loop></video>',
		2
	),
	ys = E('<img class="h-40 w-full overflow-hidden object-cover object-top"/>'),
	_s = E('<div class="mt-2 flex flex-wrap gap-1"></div>'),
	Ss = E('<a target="_blank"></a>'),
	Rs = E('<div class="flex flex-row flex-wrap items-start gap-1"></div>'),
	As = E(
		'<div class="flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-lg"><a class="block cursor-pointer"><!></a> <div class="flex flex-col px-2"><div class="space-y-1"><div class="mt-1 text-base"> </div> <time class="font-sans text-xs"> </time> <div class="hidden font-sans text-xs underline print:visible"> </div> <div class="prose dark:prose-invert max-w-full font-sans text-xs text-pretty text-muted-foreground"><!></div></div></div> <div class="mt-auto flex flex-col px-2 font-sans text-sm text-pretty text-muted-foreground"><!></div> <div class="flex items-center px-2 pt-2 pb-2"><!></div></div>'
	);
function Ts(t, e) {
	K(e, !1);
	let n = m(e, 'title', 8),
		s = m(e, 'href', 8, ''),
		r = m(e, 'description', 8),
		a = m(e, 'dates', 8),
		i = m(e, 'tags', 8),
		l = m(e, 'link', 8, ''),
		o = m(e, 'image', 8, ''),
		c = m(e, 'video', 8, ''),
		u = m(e, 'links', 24, () => []);
	he();
	var f = As(),
		p = _(f),
		x = _(p);
	{
		var d = (C) => {
				var I = ws();
				((I.muted = !0), Q(() => X(I, 'src', c())), k(C, I));
			},
			g = (C) => {
				var I = ys();
				(Q(() => {
					(X(I, 'src', o()), X(I, 'alt', n()));
				}),
					k(C, I));
			};
		ae(x, (C) => {
			c() ? C(d) : C(g, !1);
		});
	}
	w(p);
	var v = R(p, 2),
		b = _(v),
		z = _(b),
		L = _(z, !0);
	w(z);
	var P = R(z, 2),
		H = _(P, !0);
	w(P);
	var S = R(P, 2),
		M = _(S, !0);
	w(S);
	var U = R(S, 2),
		W = _(U);
	(Er(W, () => (B(A), B(r()), Y(() => A(r())))), w(U), w(b), w(v));
	var fe = R(v, 2),
		$ = _(fe);
	{
		var N = (C) => {
			var I = _s();
			(me(I, 5, i, _e, (q, Z) => {
				Ot(q, {
					class: 'rounded-[4px] px-1 py-0 text-[10px]',
					variant: 'secondary',
					children: (pe, ze) => {
						ye();
						var Re = we();
						(Q(() => te(Re, h(Z))), k(pe, Re));
					},
					$$slots: { default: !0 }
				});
			}),
				w(I),
				k(C, I));
		};
		ae($, (C) => {
			(B(i()), Y(() => i() && i().length > 0) && C(N));
		});
	}
	w(fe);
	var ee = R(fe, 2),
		y = _(ee);
	{
		var O = (C) => {
			var I = Rs();
			(me(I, 5, u, _e, (q, Z, pe, ze) => {
				var Re = Ss();
				(Q(() => X(Re, 'href', (h(Z), Y(() => h(Z)?.href)))), k(q, Re));
			}),
				w(I),
				k(C, I));
		};
		ae(y, (C) => {
			(B(u()), Y(() => u() && u().length > 0) && C(O));
		});
	}
	(w(ee),
		w(f),
		Q(
			(C) => {
				(X(p, 'href', s() || '#'), te(L, n()), te(H, a()), te(M, C));
			},
			[() => (B(l()), Y(() => l()?.replace('https://', '').replace('www.', '').replace('/', '')))]
		),
		k(t, f),
		F());
}
var Cs = E('<h2 class="text-xl font-bold">Projects</h2>'),
	Es = E(
		'<section id="projects"><div class="w-full space-y-12 py-12"><!> <div class="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2"></div></div></section>'
	);
function Ps(t, e) {
	K(e, !1);
	let n = 0.04;
	he();
	var s = Es(),
		r = _(s),
		a = _(r);
	ne(a, {
		delay: n,
		children: (l, o) => {
			var c = Cs();
			k(l, c);
		},
		$$slots: { default: !0 }
	});
	var i = R(a, 2);
	(me(
		i,
		5,
		() => $n.projects,
		_e,
		(l, o, c) => {
			ne(l, {
				delay: n * 1.5 + c * 0.05,
				children: (u, f) => {
					Ts(u, {
						get href() {
							return h(o).href;
						},
						get title() {
							return h(o).title;
						},
						get description() {
							return h(o).description;
						},
						get dates() {
							return h(o).dates;
						},
						get tags() {
							return h(o).technologies;
						},
						get image() {
							return h(o).image;
						},
						get video() {
							return h(o).video;
						},
						get links() {
							return h(o).links;
						}
					});
				},
				$$slots: { default: !0 }
			});
		}
	),
		w(i),
		w(r),
		w(s),
		k(t, s),
		F());
}
var Is = E('<main class="flex min-h-[100dvh] flex-col space-y-10"><!> <!> <!> <!> <!></main>');
function zs(t) {
	var e = Is(),
		n = _(e);
	sn(n, {});
	var s = R(n, 2);
	cn(s);
	var r = R(s, 2);
	_n(r, {});
	var a = R(r, 2);
	In(a, {});
	var i = R(a, 2);
	(Ps(i, {}), w(e), k(t, e));
}
var Ls = ur(
	E(
		`<meta name="google-site-verification" content="DgO6uBoYdTqm97InDaKhNH6SvJTv89dR9LuRhrDEIRg"/> <meta name="description"/> <meta name="author" content="Hongbin Miao"/> <meta name="news_keywords"/> <meta property="og:title"/> <meta property="og:site_name" content="Hongbin Miao"/> <meta property="og:url"/> <meta property="og:description"/> <meta property="og:type" content="article"/> <meta property="og:locale" content="en_US"/> <meta name="robots" content="max-image-preview:large"/> <link rel="canonical"/> <script async src="https://www.googletagmanager.com/gtag/js?id=G-1BXPPS6M0S"><\/script> <script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-1BXPPS6M0S');
	<\/script>`,
		1
	)
);
function Os(t, e) {
	let n = m(e, 'title', 8, "Hongbin's Personal Website"),
		s = m(e, 'description', 8, 'Personal Website of Hongbin Miao'),
		r = m(e, 'url', 8, 'https://github.com/zslrmhb/zslrmhb.github.io'),
		a = m(
			e,
			'keywords',
			8,
			'Hongbin Miao, Hongbin, visual, interactive, visualization, tutorial, intuition, three.js, svelte, threlte, 3D, personal website'
		);
	cr((i) => {
		var l = Ls(),
			o = R(V(l), 2),
			c = R(o, 4),
			u = R(c, 2),
			f = R(u, 4),
			p = R(f, 2),
			x = R(p, 8);
		(ye(4),
			Q(() => {
				((hr.title = n()),
					X(o, 'content', s()),
					X(c, 'content', a()),
					X(u, 'content', n()),
					X(f, 'content', r()),
					X(p, 'content', s()),
					X(x, 'href', `${r() ?? ''}/`));
			}),
			k(i, l));
	});
}
var Ds = E('<!> <!>', 1);
function Xs(t) {
	var e = Ds(),
		n = V(e);
	Os(n, {});
	var s = R(n, 2);
	(zs(s), k(t, e));
}
export { Xs as component };

import {
	aa as He,
	a4 as We,
	I as Ce,
	aN as Ye,
	Z as pe,
	J as O,
	S as br,
	K as gr,
	C as ye,
	ak as hr,
	am as vr,
	an as wr,
	ao as Re,
	ap as ee,
	R as X,
	V as yr,
	aO as kr,
	P as re,
	a6 as xr,
	aP as ce,
	aQ as de,
	a5 as Ar,
	aR as Pe,
	ai as _r,
	aE as Le,
	aS as qe,
	i as Ke,
	ar as Xe,
	a7 as Sr,
	aT as Cr,
	aU as me,
	Q as te,
	aV as zr,
	W as Mr,
	aW as Er,
	aX as Ir,
	aY as Tr,
	T as Nr,
	a8 as Ze,
	aZ as Rr,
	a_ as Pr,
	N as Lr,
	a$ as Or,
	b0 as Gr,
	b1 as Vr,
	b2 as $r,
	ah as Dr,
	b3 as Fr,
	aq as jr,
	b4 as Br,
	b5 as Ur,
	b6 as Hr,
	b7 as Wr,
	b8 as Yr
} from './7lH0bu5J.js';
function qr(e, o) {
	if (o) {
		const r = document.body;
		((e.autofocus = !0),
			He(() => {
				document.activeElement === r && e.focus();
			}));
	}
}
function Ft(e, o) {
	return o;
}
function Kr(e, o, r) {
	for (var t = e.items, s = [], a = o.length, n = 0; n < a; n++) Er(o[n].e, s, !0);
	var d = a > 0 && s.length === 0 && r !== null;
	if (d) {
		var c = r.parentNode;
		(Ir(c), c.append(r), t.clear(), $(e, o[0].prev, o[a - 1].next));
	}
	Tr(s, () => {
		for (var m = 0; m < a; m++) {
			var v = o[m];
			(d || (t.delete(v.k), $(e, v.prev, v.next)), te(v.e, !d));
		}
	});
}
function jt(e, o, r, t, s, a = null) {
	var n = e,
		d = { flags: o, items: new Map(), first: null },
		c = (o & Ye) !== 0;
	if (c) {
		var m = e;
		n = O ? pe(br(m)) : m.appendChild(We());
	}
	O && gr();
	var v = null,
		C = !1,
		A = new Map(),
		M = hr(() => {
			var y = r();
			return Ke(y) ? y : y == null ? [] : qe(y);
		}),
		u,
		b;
	function S() {
		(Xr(b, u, d, A, n, s, o, t, r),
			a !== null &&
				(u.length === 0
					? v
						? Xe(v)
						: (v = re(() => a(n)))
					: v !== null &&
						Sr(v, () => {
							v = null;
						})));
	}
	(Ce(() => {
		((b ??= Nr), (u = ye(M)));
		var y = u.length;
		if (C && y === 0) return;
		C = y === 0;
		let z = !1;
		if (O) {
			var w = vr(n) === wr;
			w !== (y === 0) && ((n = Re()), pe(n), ee(!1), (z = !0));
		}
		if (O) {
			for (var k = null, _, p = 0; p < y; p++) {
				if (X.nodeType === yr && X.data === kr) {
					((n = X), (z = !0), ee(!1));
					break;
				}
				var g = u[p],
					f = t(g, p);
				((_ = ke(X, d, k, null, g, f, p, s, o, r)), d.items.set(f, _), (k = _));
			}
			y > 0 && pe(Re());
		}
		if (O) y === 0 && a && (v = re(() => a(n)));
		else if (xr()) {
			var T = new Set(),
				B = Ar;
			for (p = 0; p < y; p += 1) {
				((g = u[p]), (f = t(g, p)));
				var V = d.items.get(f) ?? A.get(f);
				(V
					? (o & (ce | de)) !== 0 && Je(V, g, p, o)
					: ((_ = ke(null, d, null, null, g, f, p, s, o, r, !0)), A.set(f, _)),
					T.add(f));
			}
			for (const [N, U] of d.items) T.has(N) || B.skipped_effects.add(U.e);
			B.add_callback(S);
		} else S();
		(z && ee(!0), ye(M));
	}),
		O && (n = X));
}
function Xr(e, o, r, t, s, a, n, d, c) {
	var m = (n & zr) !== 0,
		v = (n & (ce | de)) !== 0,
		C = o.length,
		A = r.items,
		M = r.first,
		u = M,
		b,
		S = null,
		y,
		z = [],
		w = [],
		k,
		_,
		p,
		g;
	if (m)
		for (g = 0; g < C; g += 1)
			((k = o[g]),
				(_ = d(k, g)),
				(p = A.get(_)),
				p !== void 0 && (p.a?.measure(), (y ??= new Set()).add(p)));
	for (g = 0; g < C; g += 1) {
		if (((k = o[g]), (_ = d(k, g)), (p = A.get(_)), p === void 0)) {
			var f = t.get(_);
			if (f !== void 0) {
				(t.delete(_), A.set(_, f));
				var T = S ? S.next : u;
				($(r, S, f), $(r, f, T), be(f, T, s), (S = f));
			} else {
				var B = u ? u.e.nodes_start : s;
				S = ke(B, r, S, S === null ? r.first : S.next, k, _, g, a, n, c);
			}
			(A.set(_, S), (z = []), (w = []), (u = S.next));
			continue;
		}
		if (
			(v && Je(p, k, g, n),
			(p.e.f & me) !== 0 && (Xe(p.e), m && (p.a?.unfix(), (y ??= new Set()).delete(p))),
			p !== u)
		) {
			if (b !== void 0 && b.has(p)) {
				if (z.length < w.length) {
					var V = w[0],
						N;
					S = V.prev;
					var U = z[0],
						H = z[z.length - 1];
					for (N = 0; N < z.length; N += 1) be(z[N], V, s);
					for (N = 0; N < w.length; N += 1) b.delete(w[N]);
					($(r, U.prev, H.next),
						$(r, S, U),
						$(r, H, V),
						(u = V),
						(S = H),
						(g -= 1),
						(z = []),
						(w = []));
				} else
					(b.delete(p),
						be(p, u, s),
						$(r, p.prev, p.next),
						$(r, p, S === null ? r.first : S.next),
						$(r, S, p),
						(S = p));
				continue;
			}
			for (z = [], w = []; u !== null && u.k !== _; )
				((u.e.f & me) === 0 && (b ??= new Set()).add(u), w.push(u), (u = u.next));
			if (u === null) continue;
			p = u;
		}
		(z.push(p), (S = p), (u = p.next));
	}
	if (u !== null || b !== void 0) {
		for (var G = b === void 0 ? [] : qe(b); u !== null; )
			((u.e.f & me) === 0 && G.push(u), (u = u.next));
		var P = G.length;
		if (P > 0) {
			var D = (n & Ye) !== 0 && C === 0 ? s : null;
			if (m) {
				for (g = 0; g < P; g += 1) G[g].a?.measure();
				for (g = 0; g < P; g += 1) G[g].a?.fix();
			}
			Kr(r, G, D);
		}
	}
	(m &&
		He(() => {
			if (y !== void 0) for (p of y) p.a?.apply();
		}),
		(e.first = r.first && r.first.e),
		(e.last = S && S.e));
	for (var h of t.values()) te(h.e);
	t.clear();
}
function Je(e, o, r, t) {
	((t & ce) !== 0 && Pe(e.v, o), (t & de) !== 0 ? Pe(e.i, r) : (e.i = r));
}
function ke(e, o, r, t, s, a, n, d, c, m, v) {
	var C = (c & ce) !== 0,
		A = (c & Cr) === 0,
		M = C ? (A ? _r(s, !1, !1) : Le(s)) : s,
		u = (c & de) === 0 ? n : Le(n),
		b = { i: u, v: M, k: a, a: null, e: null, prev: r, next: t };
	try {
		if (e === null) {
			var S = document.createDocumentFragment();
			S.append((e = We()));
		}
		return (
			(b.e = re(() => d(e, M, u, m), O)),
			(b.e.prev = r && r.e),
			(b.e.next = t && t.e),
			r === null ? v || (o.first = b) : ((r.next = b), (r.e.next = b.e)),
			t !== null && ((t.prev = b), (t.e.prev = b.e)),
			b
		);
	} finally {
	}
}
function be(e, o, r) {
	for (
		var t = e.next ? e.next.e.nodes_start : r, s = o ? o.e.nodes_start : r, a = e.e.nodes_start;
		a !== null && a !== t;

	) {
		var n = Mr(a);
		(s.before(a), (a = n));
	}
}
function $(e, o, r) {
	(o === null ? (e.first = r) : ((o.next = r), (o.e.next = r && r.e)),
		r !== null && ((r.prev = o), (r.e.prev = o && o.e)));
}
function Zr(e, o) {
	var r = void 0,
		t;
	Ce(() => {
		r !== (r = o()) &&
			(t && (te(t), (t = null)),
			r &&
				(t = re(() => {
					Ze(() => r(e));
				})));
	});
}
function Qe(e) {
	var o,
		r,
		t = '';
	if (typeof e == 'string' || typeof e == 'number') t += e;
	else if (typeof e == 'object')
		if (Array.isArray(e)) {
			var s = e.length;
			for (o = 0; o < s; o++) e[o] && (r = Qe(e[o])) && (t && (t += ' '), (t += r));
		} else for (r in e) e[r] && (t && (t += ' '), (t += r));
	return t;
}
function er() {
	for (var e, o, r = 0, t = '', s = arguments.length; r < s; r++)
		(e = arguments[r]) && (o = Qe(e)) && (t && (t += ' '), (t += o));
	return t;
}
function Jr(e) {
	return typeof e == 'object' ? er(e) : (e ?? '');
}
const Oe = [
	...` 	
\r\f \v\uFEFF`
];
function Qr(e, o, r) {
	var t = e == null ? '' : '' + e;
	if (r) {
		for (var s in r)
			if (r[s]) t = t ? t + ' ' + s : s;
			else if (t.length)
				for (var a = s.length, n = 0; (n = t.indexOf(s, n)) >= 0; ) {
					var d = n + a;
					(n === 0 || Oe.includes(t[n - 1])) && (d === t.length || Oe.includes(t[d]))
						? (t = (n === 0 ? '' : t.substring(0, n)) + t.substring(d + 1))
						: (n = d);
				}
	}
	return t === '' ? null : t;
}
function Ge(e, o = !1) {
	var r = o ? ' !important;' : ';',
		t = '';
	for (var s in e) {
		var a = e[s];
		a != null && a !== '' && (t += ' ' + s + ': ' + a + r);
	}
	return t;
}
function ge(e) {
	return e[0] !== '-' || e[1] !== '-' ? e.toLowerCase() : e;
}
function et(e, o) {
	if (o) {
		var r = '',
			t,
			s;
		if ((Array.isArray(o) ? ((t = o[0]), (s = o[1])) : (t = o), e)) {
			e = String(e)
				.replaceAll(/\s*\/\*.*?\*\/\s*/g, '')
				.trim();
			var a = !1,
				n = 0,
				d = !1,
				c = [];
			(t && c.push(...Object.keys(t).map(ge)), s && c.push(...Object.keys(s).map(ge)));
			var m = 0,
				v = -1;
			const b = e.length;
			for (var C = 0; C < b; C++) {
				var A = e[C];
				if (
					(d
						? A === '/' && e[C - 1] === '*' && (d = !1)
						: a
							? a === A && (a = !1)
							: A === '/' && e[C + 1] === '*'
								? (d = !0)
								: A === '"' || A === "'"
									? (a = A)
									: A === '('
										? n++
										: A === ')' && n--,
					!d && a === !1 && n === 0)
				) {
					if (A === ':' && v === -1) v = C;
					else if (A === ';' || C === b - 1) {
						if (v !== -1) {
							var M = ge(e.substring(m, v).trim());
							if (!c.includes(M)) {
								A !== ';' && C++;
								var u = e.substring(m, C).trim();
								r += ' ' + u + ';';
							}
						}
						((m = C + 1), (v = -1));
					}
				}
			}
		}
		return (t && (r += Ge(t)), s && (r += Ge(s, !0)), (r = r.trim()), r === '' ? null : r);
	}
	return e == null ? null : String(e);
}
function rt(e, o, r, t, s, a) {
	var n = e.__className;
	if (O || n !== r || n === void 0) {
		var d = Qr(r, t, a);
		((!O || d !== e.getAttribute('class')) &&
			(d == null ? e.removeAttribute('class') : o ? (e.className = d) : e.setAttribute('class', d)),
			(e.__className = r));
	} else if (a && s !== a)
		for (var c in a) {
			var m = !!a[c];
			(s == null || m !== !!s[c]) && e.classList.toggle(c, m);
		}
	return a;
}
function he(e, o = {}, r, t) {
	for (var s in r) {
		var a = r[s];
		o[s] !== a && (r[s] == null ? e.style.removeProperty(s) : e.style.setProperty(s, a, t));
	}
}
function tt(e, o, r, t) {
	var s = e.__style;
	if (O || s !== o) {
		var a = et(o, t);
		((!O || a !== e.getAttribute('style')) &&
			(a == null ? e.removeAttribute('style') : (e.style.cssText = a)),
			(e.__style = o));
	} else
		t && (Array.isArray(t) ? (he(e, r?.[0], t[0]), he(e, r?.[1], t[1], 'important')) : he(e, r, t));
	return t;
}
function xe(e, o, r = !1) {
	if (e.multiple) {
		if (o == null) return;
		if (!Ke(o)) return Rr();
		for (var t of e.options) t.selected = o.includes(Ve(t));
		return;
	}
	for (t of e.options) {
		var s = Ve(t);
		if (Pr(s, o)) {
			t.selected = !0;
			return;
		}
	}
	(!r || o !== void 0) && (e.selectedIndex = -1);
}
function ot(e) {
	var o = new MutationObserver(() => {
		xe(e, e.__value);
	});
	(o.observe(e, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ['value'] }),
		Lr(() => {
			o.disconnect();
		}));
}
function Ve(e) {
	return '__value' in e ? e.__value : e.value;
}
const Z = Symbol('class'),
	J = Symbol('style'),
	rr = Symbol('is custom element'),
	tr = Symbol('is html');
function st(e, o) {
	o ? e.hasAttribute('selected') || e.setAttribute('selected', '') : e.removeAttribute('selected');
}
function $e(e, o, r, t) {
	var s = or(e);
	(O &&
		((s[o] = e.getAttribute(o)),
		o === 'src' || o === 'srcset' || (o === 'href' && e.nodeName === 'LINK'))) ||
		(s[o] !== (s[o] = r) &&
			(o === 'loading' && (e[Hr] = r),
			r == null
				? e.removeAttribute(o)
				: typeof r != 'string' && sr(e).includes(o)
					? (e[o] = r)
					: e.setAttribute(o, r)));
}
function at(e, o, r, t, s = !1) {
	var a = or(e),
		n = a[rr],
		d = !a[tr];
	let c = O && n;
	c && ee(!1);
	var m = o || {},
		v = e.tagName === 'OPTION';
	for (var C in o) C in r || (r[C] = null);
	(r.class ? (r.class = Jr(r.class)) : r[Z] && (r.class = null), r[J] && (r.style ??= null));
	var A = sr(e);
	for (const w in r) {
		let k = r[w];
		if (v && w === 'value' && k == null) {
			((e.value = e.__value = ''), (m[w] = k));
			continue;
		}
		if (w === 'class') {
			var M = e.namespaceURI === 'http://www.w3.org/1999/xhtml';
			(rt(e, M, k, t, o?.[Z], r[Z]), (m[w] = k), (m[Z] = r[Z]));
			continue;
		}
		if (w === 'style') {
			(tt(e, k, o?.[J], r[J]), (m[w] = k), (m[J] = r[J]));
			continue;
		}
		var u = m[w];
		if (!(k === u && !(k === void 0 && e.hasAttribute(w)))) {
			m[w] = k;
			var b = w[0] + w[1];
			if (b !== '$$')
				if (b === 'on') {
					const _ = {},
						p = '$$' + w;
					let g = w.slice(2);
					var S = Wr(g);
					if ((Vr(g) && ((g = g.slice(0, -7)), (_.capture = !0)), !S && u)) {
						if (k != null) continue;
						(e.removeEventListener(g, m[p], _), (m[p] = null));
					}
					if (k != null)
						if (S) ((e[`__${g}`] = k), Dr([g]));
						else {
							let f = function (T) {
								m[w].call(this, T);
							};
							m[p] = $r(g, e, f, _);
						}
					else S && (e[`__${g}`] = void 0);
				} else if (w === 'style') $e(e, w, k);
				else if (w === 'autofocus') qr(e, !!k);
				else if (!n && (w === '__value' || (w === 'value' && k != null))) e.value = e.__value = k;
				else if (w === 'selected' && v) st(e, k);
				else {
					var y = w;
					d || (y = Fr(y));
					var z = y === 'defaultValue' || y === 'defaultChecked';
					if (k == null && !n && !z)
						if (((a[w] = null), y === 'value' || y === 'checked')) {
							let _ = e;
							const p = o === void 0;
							if (y === 'value') {
								let g = _.defaultValue;
								(_.removeAttribute(y), (_.defaultValue = g), (_.value = _.__value = p ? g : null));
							} else {
								let g = _.defaultChecked;
								(_.removeAttribute(y), (_.defaultChecked = g), (_.checked = p ? g : !1));
							}
						} else e.removeAttribute(w);
					else
						z || (A.includes(y) && (n || typeof k != 'string'))
							? ((e[y] = k), y in a && (a[y] = jr))
							: typeof k != 'function' && $e(e, y, k);
				}
		}
	}
	return (c && ee(!0), m);
}
function Bt(e, o, r = [], t = [], s, a = !1) {
	Or(r, t, (n) => {
		var d = void 0,
			c = {},
			m = e.nodeName === 'SELECT',
			v = !1;
		if (
			(Ce(() => {
				var A = o(...n.map(ye)),
					M = at(e, d, A, s, a);
				v && m && 'value' in A && xe(e, A.value);
				for (let b of Object.getOwnPropertySymbols(c)) A[b] || te(c[b]);
				for (let b of Object.getOwnPropertySymbols(A)) {
					var u = A[b];
					(b.description === Gr &&
						(!d || u !== d[b]) &&
						(c[b] && te(c[b]), (c[b] = re(() => Zr(e, () => u)))),
						(M[b] = u));
				}
				d = M;
			}),
			m)
		) {
			var C = e;
			Ze(() => {
				(xe(C, d.value, !0), ot(C));
			});
		}
		v = !0;
	});
}
function or(e) {
	return (e.__attributes ??= { [rr]: e.nodeName.includes('-'), [tr]: e.namespaceURI === Br });
}
var De = new Map();
function sr(e) {
	var o = De.get(e.nodeName);
	if (o) return o;
	De.set(e.nodeName, (o = []));
	for (var r, t = e, s = Element.prototype; s !== t; ) {
		r = Yr(t);
		for (var a in r) r[a].set && o.push(a);
		t = Ur(t);
	}
	return o;
}
const ze = '-',
	nt = (e) => {
		const o = lt(e),
			{ conflictingClassGroups: r, conflictingClassGroupModifiers: t } = e;
		return {
			getClassGroupId: (n) => {
				const d = n.split(ze);
				return (d[0] === '' && d.length !== 1 && d.shift(), ar(d, o) || it(n));
			},
			getConflictingClassGroupIds: (n, d) => {
				const c = r[n] || [];
				return d && t[n] ? [...c, ...t[n]] : c;
			}
		};
	},
	ar = (e, o) => {
		if (e.length === 0) return o.classGroupId;
		const r = e[0],
			t = o.nextPart.get(r),
			s = t ? ar(e.slice(1), t) : void 0;
		if (s) return s;
		if (o.validators.length === 0) return;
		const a = e.join(ze);
		return o.validators.find(({ validator: n }) => n(a))?.classGroupId;
	},
	Fe = /^\[(.+)\]$/,
	it = (e) => {
		if (Fe.test(e)) {
			const o = Fe.exec(e)[1],
				r = o?.substring(0, o.indexOf(':'));
			if (r) return 'arbitrary..' + r;
		}
	},
	lt = (e) => {
		const { theme: o, classGroups: r } = e,
			t = { nextPart: new Map(), validators: [] };
		for (const s in r) Ae(r[s], t, s, o);
		return t;
	},
	Ae = (e, o, r, t) => {
		e.forEach((s) => {
			if (typeof s == 'string') {
				const a = s === '' ? o : je(o, s);
				a.classGroupId = r;
				return;
			}
			if (typeof s == 'function') {
				if (ct(s)) {
					Ae(s(t), o, r, t);
					return;
				}
				o.validators.push({ validator: s, classGroupId: r });
				return;
			}
			Object.entries(s).forEach(([a, n]) => {
				Ae(n, je(o, a), r, t);
			});
		});
	},
	je = (e, o) => {
		let r = e;
		return (
			o.split(ze).forEach((t) => {
				(r.nextPart.has(t) || r.nextPart.set(t, { nextPart: new Map(), validators: [] }),
					(r = r.nextPart.get(t)));
			}),
			r
		);
	},
	ct = (e) => e.isThemeGetter,
	dt = (e) => {
		if (e < 1) return { get: () => {}, set: () => {} };
		let o = 0,
			r = new Map(),
			t = new Map();
		const s = (a, n) => {
			(r.set(a, n), o++, o > e && ((o = 0), (t = r), (r = new Map())));
		};
		return {
			get(a) {
				let n = r.get(a);
				if (n !== void 0) return n;
				if ((n = t.get(a)) !== void 0) return (s(a, n), n);
			},
			set(a, n) {
				r.has(a) ? r.set(a, n) : s(a, n);
			}
		};
	},
	_e = '!',
	Se = ':',
	ft = Se.length,
	ut = (e) => {
		const { prefix: o, experimentalParseClassName: r } = e;
		let t = (s) => {
			const a = [];
			let n = 0,
				d = 0,
				c = 0,
				m;
			for (let u = 0; u < s.length; u++) {
				let b = s[u];
				if (n === 0 && d === 0) {
					if (b === Se) {
						(a.push(s.slice(c, u)), (c = u + ft));
						continue;
					}
					if (b === '/') {
						m = u;
						continue;
					}
				}
				b === '[' ? n++ : b === ']' ? n-- : b === '(' ? d++ : b === ')' && d--;
			}
			const v = a.length === 0 ? s : s.substring(c),
				C = pt(v),
				A = C !== v,
				M = m && m > c ? m - c : void 0;
			return {
				modifiers: a,
				hasImportantModifier: A,
				baseClassName: C,
				maybePostfixModifierPosition: M
			};
		};
		if (o) {
			const s = o + Se,
				a = t;
			t = (n) =>
				n.startsWith(s)
					? a(n.substring(s.length))
					: {
							isExternal: !0,
							modifiers: [],
							hasImportantModifier: !1,
							baseClassName: n,
							maybePostfixModifierPosition: void 0
						};
		}
		if (r) {
			const s = t;
			t = (a) => r({ className: a, parseClassName: s });
		}
		return t;
	},
	pt = (e) =>
		e.endsWith(_e) ? e.substring(0, e.length - 1) : e.startsWith(_e) ? e.substring(1) : e,
	mt = (e) => {
		const o = Object.fromEntries(e.orderSensitiveModifiers.map((t) => [t, !0]));
		return (t) => {
			if (t.length <= 1) return t;
			const s = [];
			let a = [];
			return (
				t.forEach((n) => {
					n[0] === '[' || o[n] ? (s.push(...a.sort(), n), (a = [])) : a.push(n);
				}),
				s.push(...a.sort()),
				s
			);
		};
	},
	bt = (e) => ({ cache: dt(e.cacheSize), parseClassName: ut(e), sortModifiers: mt(e), ...nt(e) }),
	gt = /\s+/,
	ht = (e, o) => {
		const {
				parseClassName: r,
				getClassGroupId: t,
				getConflictingClassGroupIds: s,
				sortModifiers: a
			} = o,
			n = [],
			d = e.trim().split(gt);
		let c = '';
		for (let m = d.length - 1; m >= 0; m -= 1) {
			const v = d[m],
				{
					isExternal: C,
					modifiers: A,
					hasImportantModifier: M,
					baseClassName: u,
					maybePostfixModifierPosition: b
				} = r(v);
			if (C) {
				c = v + (c.length > 0 ? ' ' + c : c);
				continue;
			}
			let S = !!b,
				y = t(S ? u.substring(0, b) : u);
			if (!y) {
				if (!S) {
					c = v + (c.length > 0 ? ' ' + c : c);
					continue;
				}
				if (((y = t(u)), !y)) {
					c = v + (c.length > 0 ? ' ' + c : c);
					continue;
				}
				S = !1;
			}
			const z = a(A).join(':'),
				w = M ? z + _e : z,
				k = w + y;
			if (n.includes(k)) continue;
			n.push(k);
			const _ = s(y, S);
			for (let p = 0; p < _.length; ++p) {
				const g = _[p];
				n.push(w + g);
			}
			c = v + (c.length > 0 ? ' ' + c : c);
		}
		return c;
	};
function vt() {
	let e = 0,
		o,
		r,
		t = '';
	for (; e < arguments.length; ) (o = arguments[e++]) && (r = nr(o)) && (t && (t += ' '), (t += r));
	return t;
}
const nr = (e) => {
	if (typeof e == 'string') return e;
	let o,
		r = '';
	for (let t = 0; t < e.length; t++) e[t] && (o = nr(e[t])) && (r && (r += ' '), (r += o));
	return r;
};
function wt(e, ...o) {
	let r,
		t,
		s,
		a = n;
	function n(c) {
		const m = o.reduce((v, C) => C(v), e());
		return ((r = bt(m)), (t = r.cache.get), (s = r.cache.set), (a = d), d(c));
	}
	function d(c) {
		const m = t(c);
		if (m) return m;
		const v = ht(c, r);
		return (s(c, v), v);
	}
	return function () {
		return a(vt.apply(null, arguments));
	};
}
const E = (e) => {
		const o = (r) => r[e] || [];
		return ((o.isThemeGetter = !0), o);
	},
	ir = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
	lr = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
	yt = /^\d+\/\d+$/,
	kt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	xt =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
	At = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
	_t = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
	St =
		/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
	Y = (e) => yt.test(e),
	x = (e) => !!e && !Number.isNaN(Number(e)),
	j = (e) => !!e && Number.isInteger(Number(e)),
	ve = (e) => e.endsWith('%') && x(e.slice(0, -1)),
	F = (e) => kt.test(e),
	Ct = () => !0,
	zt = (e) => xt.test(e) && !At.test(e),
	cr = () => !1,
	Mt = (e) => _t.test(e),
	Et = (e) => St.test(e),
	It = (e) => !i(e) && !l(e),
	Tt = (e) => q(e, ur, cr),
	i = (e) => ir.test(e),
	W = (e) => q(e, pr, zt),
	we = (e) => q(e, Ot, x),
	Be = (e) => q(e, dr, cr),
	Nt = (e) => q(e, fr, Et),
	ie = (e) => q(e, mr, Mt),
	l = (e) => lr.test(e),
	Q = (e) => K(e, pr),
	Rt = (e) => K(e, Gt),
	Ue = (e) => K(e, dr),
	Pt = (e) => K(e, ur),
	Lt = (e) => K(e, fr),
	le = (e) => K(e, mr, !0),
	q = (e, o, r) => {
		const t = ir.exec(e);
		return t ? (t[1] ? o(t[1]) : r(t[2])) : !1;
	},
	K = (e, o, r = !1) => {
		const t = lr.exec(e);
		return t ? (t[1] ? o(t[1]) : r) : !1;
	},
	dr = (e) => e === 'position' || e === 'percentage',
	fr = (e) => e === 'image' || e === 'url',
	ur = (e) => e === 'length' || e === 'size' || e === 'bg-size',
	pr = (e) => e === 'length',
	Ot = (e) => e === 'number',
	Gt = (e) => e === 'family-name',
	mr = (e) => e === 'shadow',
	Vt = () => {
		const e = E('color'),
			o = E('font'),
			r = E('text'),
			t = E('font-weight'),
			s = E('tracking'),
			a = E('leading'),
			n = E('breakpoint'),
			d = E('container'),
			c = E('spacing'),
			m = E('radius'),
			v = E('shadow'),
			C = E('inset-shadow'),
			A = E('text-shadow'),
			M = E('drop-shadow'),
			u = E('blur'),
			b = E('perspective'),
			S = E('aspect'),
			y = E('ease'),
			z = E('animate'),
			w = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
			k = () => [
				'center',
				'top',
				'bottom',
				'left',
				'right',
				'top-left',
				'left-top',
				'top-right',
				'right-top',
				'bottom-right',
				'right-bottom',
				'bottom-left',
				'left-bottom'
			],
			_ = () => [...k(), l, i],
			p = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
			g = () => ['auto', 'contain', 'none'],
			f = () => [l, i, c],
			T = () => [Y, 'full', 'auto', ...f()],
			B = () => [j, 'none', 'subgrid', l, i],
			V = () => ['auto', { span: ['full', j, l, i] }, j, l, i],
			N = () => [j, 'auto', l, i],
			U = () => ['auto', 'min', 'max', 'fr', l, i],
			H = () => [
				'start',
				'end',
				'center',
				'between',
				'around',
				'evenly',
				'stretch',
				'baseline',
				'center-safe',
				'end-safe'
			],
			G = () => ['start', 'end', 'center', 'stretch', 'center-safe', 'end-safe'],
			P = () => ['auto', ...f()],
			D = () => [
				Y,
				'auto',
				'full',
				'dvw',
				'dvh',
				'lvw',
				'lvh',
				'svw',
				'svh',
				'min',
				'max',
				'fit',
				...f()
			],
			h = () => [e, l, i],
			Me = () => [...k(), Ue, Be, { position: [l, i] }],
			Ee = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
			Ie = () => ['auto', 'cover', 'contain', Pt, Tt, { size: [l, i] }],
			fe = () => [ve, Q, W],
			R = () => ['', 'none', 'full', m, l, i],
			L = () => ['', x, Q, W],
			oe = () => ['solid', 'dashed', 'dotted', 'double'],
			Te = () => [
				'normal',
				'multiply',
				'screen',
				'overlay',
				'darken',
				'lighten',
				'color-dodge',
				'color-burn',
				'hard-light',
				'soft-light',
				'difference',
				'exclusion',
				'hue',
				'saturation',
				'color',
				'luminosity'
			],
			I = () => [x, ve, Ue, Be],
			Ne = () => ['', 'none', u, l, i],
			se = () => ['none', x, l, i],
			ae = () => ['none', x, l, i],
			ue = () => [x, l, i],
			ne = () => [Y, 'full', ...f()];
		return {
			cacheSize: 500,
			theme: {
				animate: ['spin', 'ping', 'pulse', 'bounce'],
				aspect: ['video'],
				blur: [F],
				breakpoint: [F],
				color: [Ct],
				container: [F],
				'drop-shadow': [F],
				ease: ['in', 'out', 'in-out'],
				font: [It],
				'font-weight': [
					'thin',
					'extralight',
					'light',
					'normal',
					'medium',
					'semibold',
					'bold',
					'extrabold',
					'black'
				],
				'inset-shadow': [F],
				leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
				perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
				radius: [F],
				shadow: [F],
				spacing: ['px', x],
				text: [F],
				'text-shadow': [F],
				tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
			},
			classGroups: {
				aspect: [{ aspect: ['auto', 'square', Y, i, l, S] }],
				container: ['container'],
				columns: [{ columns: [x, i, l, d] }],
				'break-after': [{ 'break-after': w() }],
				'break-before': [{ 'break-before': w() }],
				'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
				'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
				box: [{ box: ['border', 'content'] }],
				display: [
					'block',
					'inline-block',
					'inline',
					'flex',
					'inline-flex',
					'table',
					'inline-table',
					'table-caption',
					'table-cell',
					'table-column',
					'table-column-group',
					'table-footer-group',
					'table-header-group',
					'table-row-group',
					'table-row',
					'flow-root',
					'grid',
					'inline-grid',
					'contents',
					'list-item',
					'hidden'
				],
				sr: ['sr-only', 'not-sr-only'],
				float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
				clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
				isolation: ['isolate', 'isolation-auto'],
				'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
				'object-position': [{ object: _() }],
				overflow: [{ overflow: p() }],
				'overflow-x': [{ 'overflow-x': p() }],
				'overflow-y': [{ 'overflow-y': p() }],
				overscroll: [{ overscroll: g() }],
				'overscroll-x': [{ 'overscroll-x': g() }],
				'overscroll-y': [{ 'overscroll-y': g() }],
				position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
				inset: [{ inset: T() }],
				'inset-x': [{ 'inset-x': T() }],
				'inset-y': [{ 'inset-y': T() }],
				start: [{ start: T() }],
				end: [{ end: T() }],
				top: [{ top: T() }],
				right: [{ right: T() }],
				bottom: [{ bottom: T() }],
				left: [{ left: T() }],
				visibility: ['visible', 'invisible', 'collapse'],
				z: [{ z: [j, 'auto', l, i] }],
				basis: [{ basis: [Y, 'full', 'auto', d, ...f()] }],
				'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
				'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
				flex: [{ flex: [x, Y, 'auto', 'initial', 'none', i] }],
				grow: [{ grow: ['', x, l, i] }],
				shrink: [{ shrink: ['', x, l, i] }],
				order: [{ order: [j, 'first', 'last', 'none', l, i] }],
				'grid-cols': [{ 'grid-cols': B() }],
				'col-start-end': [{ col: V() }],
				'col-start': [{ 'col-start': N() }],
				'col-end': [{ 'col-end': N() }],
				'grid-rows': [{ 'grid-rows': B() }],
				'row-start-end': [{ row: V() }],
				'row-start': [{ 'row-start': N() }],
				'row-end': [{ 'row-end': N() }],
				'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
				'auto-cols': [{ 'auto-cols': U() }],
				'auto-rows': [{ 'auto-rows': U() }],
				gap: [{ gap: f() }],
				'gap-x': [{ 'gap-x': f() }],
				'gap-y': [{ 'gap-y': f() }],
				'justify-content': [{ justify: [...H(), 'normal'] }],
				'justify-items': [{ 'justify-items': [...G(), 'normal'] }],
				'justify-self': [{ 'justify-self': ['auto', ...G()] }],
				'align-content': [{ content: ['normal', ...H()] }],
				'align-items': [{ items: [...G(), { baseline: ['', 'last'] }] }],
				'align-self': [{ self: ['auto', ...G(), { baseline: ['', 'last'] }] }],
				'place-content': [{ 'place-content': H() }],
				'place-items': [{ 'place-items': [...G(), 'baseline'] }],
				'place-self': [{ 'place-self': ['auto', ...G()] }],
				p: [{ p: f() }],
				px: [{ px: f() }],
				py: [{ py: f() }],
				ps: [{ ps: f() }],
				pe: [{ pe: f() }],
				pt: [{ pt: f() }],
				pr: [{ pr: f() }],
				pb: [{ pb: f() }],
				pl: [{ pl: f() }],
				m: [{ m: P() }],
				mx: [{ mx: P() }],
				my: [{ my: P() }],
				ms: [{ ms: P() }],
				me: [{ me: P() }],
				mt: [{ mt: P() }],
				mr: [{ mr: P() }],
				mb: [{ mb: P() }],
				ml: [{ ml: P() }],
				'space-x': [{ 'space-x': f() }],
				'space-x-reverse': ['space-x-reverse'],
				'space-y': [{ 'space-y': f() }],
				'space-y-reverse': ['space-y-reverse'],
				size: [{ size: D() }],
				w: [{ w: [d, 'screen', ...D()] }],
				'min-w': [{ 'min-w': [d, 'screen', 'none', ...D()] }],
				'max-w': [{ 'max-w': [d, 'screen', 'none', 'prose', { screen: [n] }, ...D()] }],
				h: [{ h: ['screen', 'lh', ...D()] }],
				'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...D()] }],
				'max-h': [{ 'max-h': ['screen', 'lh', ...D()] }],
				'font-size': [{ text: ['base', r, Q, W] }],
				'font-smoothing': ['antialiased', 'subpixel-antialiased'],
				'font-style': ['italic', 'not-italic'],
				'font-weight': [{ font: [t, l, we] }],
				'font-stretch': [
					{
						'font-stretch': [
							'ultra-condensed',
							'extra-condensed',
							'condensed',
							'semi-condensed',
							'normal',
							'semi-expanded',
							'expanded',
							'extra-expanded',
							'ultra-expanded',
							ve,
							i
						]
					}
				],
				'font-family': [{ font: [Rt, i, o] }],
				'fvn-normal': ['normal-nums'],
				'fvn-ordinal': ['ordinal'],
				'fvn-slashed-zero': ['slashed-zero'],
				'fvn-figure': ['lining-nums', 'oldstyle-nums'],
				'fvn-spacing': ['proportional-nums', 'tabular-nums'],
				'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
				tracking: [{ tracking: [s, l, i] }],
				'line-clamp': [{ 'line-clamp': [x, 'none', l, we] }],
				leading: [{ leading: [a, ...f()] }],
				'list-image': [{ 'list-image': ['none', l, i] }],
				'list-style-position': [{ list: ['inside', 'outside'] }],
				'list-style-type': [{ list: ['disc', 'decimal', 'none', l, i] }],
				'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
				'placeholder-color': [{ placeholder: h() }],
				'text-color': [{ text: h() }],
				'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
				'text-decoration-style': [{ decoration: [...oe(), 'wavy'] }],
				'text-decoration-thickness': [{ decoration: [x, 'from-font', 'auto', l, W] }],
				'text-decoration-color': [{ decoration: h() }],
				'underline-offset': [{ 'underline-offset': [x, 'auto', l, i] }],
				'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
				'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
				'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
				indent: [{ indent: f() }],
				'vertical-align': [
					{
						align: [
							'baseline',
							'top',
							'middle',
							'bottom',
							'text-top',
							'text-bottom',
							'sub',
							'super',
							l,
							i
						]
					}
				],
				whitespace: [
					{ whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] }
				],
				break: [{ break: ['normal', 'words', 'all', 'keep'] }],
				wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
				hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
				content: [{ content: ['none', l, i] }],
				'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
				'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
				'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
				'bg-position': [{ bg: Me() }],
				'bg-repeat': [{ bg: Ee() }],
				'bg-size': [{ bg: Ie() }],
				'bg-image': [
					{
						bg: [
							'none',
							{
								linear: [{ to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, j, l, i],
								radial: ['', l, i],
								conic: [j, l, i]
							},
							Lt,
							Nt
						]
					}
				],
				'bg-color': [{ bg: h() }],
				'gradient-from-pos': [{ from: fe() }],
				'gradient-via-pos': [{ via: fe() }],
				'gradient-to-pos': [{ to: fe() }],
				'gradient-from': [{ from: h() }],
				'gradient-via': [{ via: h() }],
				'gradient-to': [{ to: h() }],
				rounded: [{ rounded: R() }],
				'rounded-s': [{ 'rounded-s': R() }],
				'rounded-e': [{ 'rounded-e': R() }],
				'rounded-t': [{ 'rounded-t': R() }],
				'rounded-r': [{ 'rounded-r': R() }],
				'rounded-b': [{ 'rounded-b': R() }],
				'rounded-l': [{ 'rounded-l': R() }],
				'rounded-ss': [{ 'rounded-ss': R() }],
				'rounded-se': [{ 'rounded-se': R() }],
				'rounded-ee': [{ 'rounded-ee': R() }],
				'rounded-es': [{ 'rounded-es': R() }],
				'rounded-tl': [{ 'rounded-tl': R() }],
				'rounded-tr': [{ 'rounded-tr': R() }],
				'rounded-br': [{ 'rounded-br': R() }],
				'rounded-bl': [{ 'rounded-bl': R() }],
				'border-w': [{ border: L() }],
				'border-w-x': [{ 'border-x': L() }],
				'border-w-y': [{ 'border-y': L() }],
				'border-w-s': [{ 'border-s': L() }],
				'border-w-e': [{ 'border-e': L() }],
				'border-w-t': [{ 'border-t': L() }],
				'border-w-r': [{ 'border-r': L() }],
				'border-w-b': [{ 'border-b': L() }],
				'border-w-l': [{ 'border-l': L() }],
				'divide-x': [{ 'divide-x': L() }],
				'divide-x-reverse': ['divide-x-reverse'],
				'divide-y': [{ 'divide-y': L() }],
				'divide-y-reverse': ['divide-y-reverse'],
				'border-style': [{ border: [...oe(), 'hidden', 'none'] }],
				'divide-style': [{ divide: [...oe(), 'hidden', 'none'] }],
				'border-color': [{ border: h() }],
				'border-color-x': [{ 'border-x': h() }],
				'border-color-y': [{ 'border-y': h() }],
				'border-color-s': [{ 'border-s': h() }],
				'border-color-e': [{ 'border-e': h() }],
				'border-color-t': [{ 'border-t': h() }],
				'border-color-r': [{ 'border-r': h() }],
				'border-color-b': [{ 'border-b': h() }],
				'border-color-l': [{ 'border-l': h() }],
				'divide-color': [{ divide: h() }],
				'outline-style': [{ outline: [...oe(), 'none', 'hidden'] }],
				'outline-offset': [{ 'outline-offset': [x, l, i] }],
				'outline-w': [{ outline: ['', x, Q, W] }],
				'outline-color': [{ outline: h() }],
				shadow: [{ shadow: ['', 'none', v, le, ie] }],
				'shadow-color': [{ shadow: h() }],
				'inset-shadow': [{ 'inset-shadow': ['none', C, le, ie] }],
				'inset-shadow-color': [{ 'inset-shadow': h() }],
				'ring-w': [{ ring: L() }],
				'ring-w-inset': ['ring-inset'],
				'ring-color': [{ ring: h() }],
				'ring-offset-w': [{ 'ring-offset': [x, W] }],
				'ring-offset-color': [{ 'ring-offset': h() }],
				'inset-ring-w': [{ 'inset-ring': L() }],
				'inset-ring-color': [{ 'inset-ring': h() }],
				'text-shadow': [{ 'text-shadow': ['none', A, le, ie] }],
				'text-shadow-color': [{ 'text-shadow': h() }],
				opacity: [{ opacity: [x, l, i] }],
				'mix-blend': [{ 'mix-blend': [...Te(), 'plus-darker', 'plus-lighter'] }],
				'bg-blend': [{ 'bg-blend': Te() }],
				'mask-clip': [
					{ 'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] },
					'mask-no-clip'
				],
				'mask-composite': [{ mask: ['add', 'subtract', 'intersect', 'exclude'] }],
				'mask-image-linear-pos': [{ 'mask-linear': [x] }],
				'mask-image-linear-from-pos': [{ 'mask-linear-from': I() }],
				'mask-image-linear-to-pos': [{ 'mask-linear-to': I() }],
				'mask-image-linear-from-color': [{ 'mask-linear-from': h() }],
				'mask-image-linear-to-color': [{ 'mask-linear-to': h() }],
				'mask-image-t-from-pos': [{ 'mask-t-from': I() }],
				'mask-image-t-to-pos': [{ 'mask-t-to': I() }],
				'mask-image-t-from-color': [{ 'mask-t-from': h() }],
				'mask-image-t-to-color': [{ 'mask-t-to': h() }],
				'mask-image-r-from-pos': [{ 'mask-r-from': I() }],
				'mask-image-r-to-pos': [{ 'mask-r-to': I() }],
				'mask-image-r-from-color': [{ 'mask-r-from': h() }],
				'mask-image-r-to-color': [{ 'mask-r-to': h() }],
				'mask-image-b-from-pos': [{ 'mask-b-from': I() }],
				'mask-image-b-to-pos': [{ 'mask-b-to': I() }],
				'mask-image-b-from-color': [{ 'mask-b-from': h() }],
				'mask-image-b-to-color': [{ 'mask-b-to': h() }],
				'mask-image-l-from-pos': [{ 'mask-l-from': I() }],
				'mask-image-l-to-pos': [{ 'mask-l-to': I() }],
				'mask-image-l-from-color': [{ 'mask-l-from': h() }],
				'mask-image-l-to-color': [{ 'mask-l-to': h() }],
				'mask-image-x-from-pos': [{ 'mask-x-from': I() }],
				'mask-image-x-to-pos': [{ 'mask-x-to': I() }],
				'mask-image-x-from-color': [{ 'mask-x-from': h() }],
				'mask-image-x-to-color': [{ 'mask-x-to': h() }],
				'mask-image-y-from-pos': [{ 'mask-y-from': I() }],
				'mask-image-y-to-pos': [{ 'mask-y-to': I() }],
				'mask-image-y-from-color': [{ 'mask-y-from': h() }],
				'mask-image-y-to-color': [{ 'mask-y-to': h() }],
				'mask-image-radial': [{ 'mask-radial': [l, i] }],
				'mask-image-radial-from-pos': [{ 'mask-radial-from': I() }],
				'mask-image-radial-to-pos': [{ 'mask-radial-to': I() }],
				'mask-image-radial-from-color': [{ 'mask-radial-from': h() }],
				'mask-image-radial-to-color': [{ 'mask-radial-to': h() }],
				'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
				'mask-image-radial-size': [
					{ 'mask-radial': [{ closest: ['side', 'corner'], farthest: ['side', 'corner'] }] }
				],
				'mask-image-radial-pos': [{ 'mask-radial-at': k() }],
				'mask-image-conic-pos': [{ 'mask-conic': [x] }],
				'mask-image-conic-from-pos': [{ 'mask-conic-from': I() }],
				'mask-image-conic-to-pos': [{ 'mask-conic-to': I() }],
				'mask-image-conic-from-color': [{ 'mask-conic-from': h() }],
				'mask-image-conic-to-color': [{ 'mask-conic-to': h() }],
				'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
				'mask-origin': [
					{ 'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] }
				],
				'mask-position': [{ mask: Me() }],
				'mask-repeat': [{ mask: Ee() }],
				'mask-size': [{ mask: Ie() }],
				'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
				'mask-image': [{ mask: ['none', l, i] }],
				filter: [{ filter: ['', 'none', l, i] }],
				blur: [{ blur: Ne() }],
				brightness: [{ brightness: [x, l, i] }],
				contrast: [{ contrast: [x, l, i] }],
				'drop-shadow': [{ 'drop-shadow': ['', 'none', M, le, ie] }],
				'drop-shadow-color': [{ 'drop-shadow': h() }],
				grayscale: [{ grayscale: ['', x, l, i] }],
				'hue-rotate': [{ 'hue-rotate': [x, l, i] }],
				invert: [{ invert: ['', x, l, i] }],
				saturate: [{ saturate: [x, l, i] }],
				sepia: [{ sepia: ['', x, l, i] }],
				'backdrop-filter': [{ 'backdrop-filter': ['', 'none', l, i] }],
				'backdrop-blur': [{ 'backdrop-blur': Ne() }],
				'backdrop-brightness': [{ 'backdrop-brightness': [x, l, i] }],
				'backdrop-contrast': [{ 'backdrop-contrast': [x, l, i] }],
				'backdrop-grayscale': [{ 'backdrop-grayscale': ['', x, l, i] }],
				'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [x, l, i] }],
				'backdrop-invert': [{ 'backdrop-invert': ['', x, l, i] }],
				'backdrop-opacity': [{ 'backdrop-opacity': [x, l, i] }],
				'backdrop-saturate': [{ 'backdrop-saturate': [x, l, i] }],
				'backdrop-sepia': [{ 'backdrop-sepia': ['', x, l, i] }],
				'border-collapse': [{ border: ['collapse', 'separate'] }],
				'border-spacing': [{ 'border-spacing': f() }],
				'border-spacing-x': [{ 'border-spacing-x': f() }],
				'border-spacing-y': [{ 'border-spacing-y': f() }],
				'table-layout': [{ table: ['auto', 'fixed'] }],
				caption: [{ caption: ['top', 'bottom'] }],
				transition: [
					{ transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', l, i] }
				],
				'transition-behavior': [{ transition: ['normal', 'discrete'] }],
				duration: [{ duration: [x, 'initial', l, i] }],
				ease: [{ ease: ['linear', 'initial', y, l, i] }],
				delay: [{ delay: [x, l, i] }],
				animate: [{ animate: ['none', z, l, i] }],
				backface: [{ backface: ['hidden', 'visible'] }],
				perspective: [{ perspective: [b, l, i] }],
				'perspective-origin': [{ 'perspective-origin': _() }],
				rotate: [{ rotate: se() }],
				'rotate-x': [{ 'rotate-x': se() }],
				'rotate-y': [{ 'rotate-y': se() }],
				'rotate-z': [{ 'rotate-z': se() }],
				scale: [{ scale: ae() }],
				'scale-x': [{ 'scale-x': ae() }],
				'scale-y': [{ 'scale-y': ae() }],
				'scale-z': [{ 'scale-z': ae() }],
				'scale-3d': ['scale-3d'],
				skew: [{ skew: ue() }],
				'skew-x': [{ 'skew-x': ue() }],
				'skew-y': [{ 'skew-y': ue() }],
				transform: [{ transform: [l, i, '', 'none', 'gpu', 'cpu'] }],
				'transform-origin': [{ origin: _() }],
				'transform-style': [{ transform: ['3d', 'flat'] }],
				translate: [{ translate: ne() }],
				'translate-x': [{ 'translate-x': ne() }],
				'translate-y': [{ 'translate-y': ne() }],
				'translate-z': [{ 'translate-z': ne() }],
				'translate-none': ['translate-none'],
				accent: [{ accent: h() }],
				appearance: [{ appearance: ['none', 'auto'] }],
				'caret-color': [{ caret: h() }],
				'color-scheme': [
					{ scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light'] }
				],
				cursor: [
					{
						cursor: [
							'auto',
							'default',
							'pointer',
							'wait',
							'text',
							'move',
							'help',
							'not-allowed',
							'none',
							'context-menu',
							'progress',
							'cell',
							'crosshair',
							'vertical-text',
							'alias',
							'copy',
							'no-drop',
							'grab',
							'grabbing',
							'all-scroll',
							'col-resize',
							'row-resize',
							'n-resize',
							'e-resize',
							's-resize',
							'w-resize',
							'ne-resize',
							'nw-resize',
							'se-resize',
							'sw-resize',
							'ew-resize',
							'ns-resize',
							'nesw-resize',
							'nwse-resize',
							'zoom-in',
							'zoom-out',
							l,
							i
						]
					}
				],
				'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
				'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
				resize: [{ resize: ['none', '', 'y', 'x'] }],
				'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
				'scroll-m': [{ 'scroll-m': f() }],
				'scroll-mx': [{ 'scroll-mx': f() }],
				'scroll-my': [{ 'scroll-my': f() }],
				'scroll-ms': [{ 'scroll-ms': f() }],
				'scroll-me': [{ 'scroll-me': f() }],
				'scroll-mt': [{ 'scroll-mt': f() }],
				'scroll-mr': [{ 'scroll-mr': f() }],
				'scroll-mb': [{ 'scroll-mb': f() }],
				'scroll-ml': [{ 'scroll-ml': f() }],
				'scroll-p': [{ 'scroll-p': f() }],
				'scroll-px': [{ 'scroll-px': f() }],
				'scroll-py': [{ 'scroll-py': f() }],
				'scroll-ps': [{ 'scroll-ps': f() }],
				'scroll-pe': [{ 'scroll-pe': f() }],
				'scroll-pt': [{ 'scroll-pt': f() }],
				'scroll-pr': [{ 'scroll-pr': f() }],
				'scroll-pb': [{ 'scroll-pb': f() }],
				'scroll-pl': [{ 'scroll-pl': f() }],
				'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
				'snap-stop': [{ snap: ['normal', 'always'] }],
				'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
				'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
				touch: [{ touch: ['auto', 'none', 'manipulation'] }],
				'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
				'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
				'touch-pz': ['touch-pinch-zoom'],
				select: [{ select: ['none', 'text', 'all', 'auto'] }],
				'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', l, i] }],
				fill: [{ fill: ['none', ...h()] }],
				'stroke-w': [{ stroke: [x, Q, W, we] }],
				stroke: [{ stroke: ['none', ...h()] }],
				'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }]
			},
			conflictingClassGroups: {
				overflow: ['overflow-x', 'overflow-y'],
				overscroll: ['overscroll-x', 'overscroll-y'],
				inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
				'inset-x': ['right', 'left'],
				'inset-y': ['top', 'bottom'],
				flex: ['basis', 'grow', 'shrink'],
				gap: ['gap-x', 'gap-y'],
				p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
				px: ['pr', 'pl'],
				py: ['pt', 'pb'],
				m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
				mx: ['mr', 'ml'],
				my: ['mt', 'mb'],
				size: ['w', 'h'],
				'font-size': ['leading'],
				'fvn-normal': [
					'fvn-ordinal',
					'fvn-slashed-zero',
					'fvn-figure',
					'fvn-spacing',
					'fvn-fraction'
				],
				'fvn-ordinal': ['fvn-normal'],
				'fvn-slashed-zero': ['fvn-normal'],
				'fvn-figure': ['fvn-normal'],
				'fvn-spacing': ['fvn-normal'],
				'fvn-fraction': ['fvn-normal'],
				'line-clamp': ['display', 'overflow'],
				rounded: [
					'rounded-s',
					'rounded-e',
					'rounded-t',
					'rounded-r',
					'rounded-b',
					'rounded-l',
					'rounded-ss',
					'rounded-se',
					'rounded-ee',
					'rounded-es',
					'rounded-tl',
					'rounded-tr',
					'rounded-br',
					'rounded-bl'
				],
				'rounded-s': ['rounded-ss', 'rounded-es'],
				'rounded-e': ['rounded-se', 'rounded-ee'],
				'rounded-t': ['rounded-tl', 'rounded-tr'],
				'rounded-r': ['rounded-tr', 'rounded-br'],
				'rounded-b': ['rounded-br', 'rounded-bl'],
				'rounded-l': ['rounded-tl', 'rounded-bl'],
				'border-spacing': ['border-spacing-x', 'border-spacing-y'],
				'border-w': [
					'border-w-x',
					'border-w-y',
					'border-w-s',
					'border-w-e',
					'border-w-t',
					'border-w-r',
					'border-w-b',
					'border-w-l'
				],
				'border-w-x': ['border-w-r', 'border-w-l'],
				'border-w-y': ['border-w-t', 'border-w-b'],
				'border-color': [
					'border-color-x',
					'border-color-y',
					'border-color-s',
					'border-color-e',
					'border-color-t',
					'border-color-r',
					'border-color-b',
					'border-color-l'
				],
				'border-color-x': ['border-color-r', 'border-color-l'],
				'border-color-y': ['border-color-t', 'border-color-b'],
				translate: ['translate-x', 'translate-y', 'translate-none'],
				'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
				'scroll-m': [
					'scroll-mx',
					'scroll-my',
					'scroll-ms',
					'scroll-me',
					'scroll-mt',
					'scroll-mr',
					'scroll-mb',
					'scroll-ml'
				],
				'scroll-mx': ['scroll-mr', 'scroll-ml'],
				'scroll-my': ['scroll-mt', 'scroll-mb'],
				'scroll-p': [
					'scroll-px',
					'scroll-py',
					'scroll-ps',
					'scroll-pe',
					'scroll-pt',
					'scroll-pr',
					'scroll-pb',
					'scroll-pl'
				],
				'scroll-px': ['scroll-pr', 'scroll-pl'],
				'scroll-py': ['scroll-pt', 'scroll-pb'],
				touch: ['touch-x', 'touch-y', 'touch-pz'],
				'touch-x': ['touch'],
				'touch-y': ['touch'],
				'touch-pz': ['touch']
			},
			conflictingClassGroupModifiers: { 'font-size': ['leading'] },
			orderSensitiveModifiers: [
				'*',
				'**',
				'after',
				'backdrop',
				'before',
				'details-content',
				'file',
				'first-letter',
				'first-line',
				'marker',
				'placeholder',
				'selection'
			]
		};
	},
	$t = wt(Vt);
function Ut(...e) {
	return $t(er(e));
}
function Ht(e, o = 'medium', r = 'en') {
	if (!e) return '';
	let t;
	if (e instanceof Date) t = e;
	else {
		const a = String(e),
			n = /\d{4}-\d{2}-\d{2}$/.test(a) ? a.replaceAll('-', '/') : a;
		t = new Date(n);
	}
	if (isNaN(t.getTime())) {
		const a = Date.parse(String(e));
		isNaN(a) || (t = new Date(a));
	}
	return isNaN(t.getTime()) ? '' : new Intl.DateTimeFormat(r, { dateStyle: o }).format(t);
}
export { Bt as a, rt as b, Ut as c, Jr as d, jt as e, Ht as f, er as g, Ft as i, $e as s };

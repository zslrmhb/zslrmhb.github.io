import {
	L as M,
	M as O,
	N as j,
	O as q,
	ah as C,
	ai as F,
	aj as $,
	a6 as z,
	ak as T,
	P as G,
	Q as A,
	R as H,
	al as Z,
	T as Q,
	am as V,
	V as J,
	U as W,
	Y as X,
	H as D,
	an as k,
	ao as ee,
	ap as re,
	g as P,
	af as U,
	aq as ne,
	ar as g,
	as as se,
	at as Y,
	aa as ae,
	au as ie,
	av as te,
	aw as ue,
	a0 as R,
	ax as fe,
	ay as le,
	u as oe,
	q as ce,
	az as de,
	aA as pe,
	aB as _e,
	aC as ve,
	aD as N,
	aE as L,
	aF as m,
	S as B,
	aG as K
} from './BfTMFq0c.js';
function xe(e, r, s = !1) {
	O && j();
	var n = e,
		a = null,
		i = null,
		l = Z,
		d = s ? q : 0,
		_ = !1;
	const S = (o, u = !0) => {
		((_ = !0), p(u, o));
	};
	var f = null;
	function w() {
		f !== null && (f.lastChild.remove(), n.before(f), (f = null));
		var o = l ? a : i,
			u = l ? i : a;
		(o && V(o),
			u &&
				J(u, () => {
					l ? (i = null) : (a = null);
				}));
	}
	const p = (o, u) => {
		if (l === (l = o)) return;
		let x = !1;
		if (O) {
			const E = C(n) === F;
			!!l === E && ((n = $()), z(n), T(!1), (x = !0));
		}
		var b = Q(),
			c = n;
		if (
			(b && ((f = document.createDocumentFragment()), f.append((c = G()))),
			l ? (a ??= u && A(() => u(c))) : (i ??= u && A(() => u(c))),
			b)
		) {
			var h = H,
				t = l ? a : i,
				v = l ? i : a;
			(t && h.skipped_effects.delete(t), v && h.skipped_effects.add(v), h.add_callback(w));
		} else w();
		x && T(!0);
	};
	(M(() => {
		((_ = !1), r(S), _ || p(null, null));
	}, d),
		O && (n = W));
}
let I = !1,
	y = Symbol();
function Ee(e, r, s) {
	const n = (s[r] ??= { store: null, source: k(void 0), unsubscribe: D });
	if (n.store !== e && !(y in s))
		if ((n.unsubscribe(), (n.store = e ?? null), e == null))
			((n.source.v = void 0), (n.unsubscribe = D));
		else {
			var a = !0;
			((n.unsubscribe = ee(e, (i) => {
				a ? (n.source.v = i) : U(n.source, i);
			})),
				(a = !1));
		}
	return e && y in s ? re(e) : P(n.source);
}
function Ie() {
	const e = {};
	function r() {
		X(() => {
			for (var s in e) e[s].unsubscribe();
			ne(e, y, { enumerable: !1, value: !0 });
		});
	}
	return [e, r];
}
function be(e) {
	var r = I;
	try {
		return ((I = !1), [e(), I]);
	} finally {
		I = r;
	}
}
const he = {
	get(e, r) {
		if (!e.exclude.includes(r)) return e.props[r];
	},
	set(e, r) {
		return !1;
	},
	getOwnPropertyDescriptor(e, r) {
		if (!e.exclude.includes(r) && r in e.props)
			return { enumerable: !0, configurable: !0, value: e.props[r] };
	},
	has(e, r) {
		return e.exclude.includes(r) ? !1 : r in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
	}
};
function Oe(e, r, s) {
	return new Proxy({ props: e, exclude: r }, he);
}
const me = {
	get(e, r) {
		if (!e.exclude.includes(r)) return (P(e.version), r in e.special ? e.special[r]() : e.props[r]);
	},
	set(e, r, s) {
		if (!(r in e.special)) {
			var n = R;
			try {
				(L(e.parent_effect),
					(e.special[r] = Se(
						{
							get [r]() {
								return e.props[r];
							}
						},
						r,
						Y
					)));
			} finally {
				L(n);
			}
		}
		return (e.special[r](s), N(e.version), !0);
	},
	getOwnPropertyDescriptor(e, r) {
		if (!e.exclude.includes(r) && r in e.props)
			return { enumerable: !0, configurable: !0, value: e.props[r] };
	},
	deleteProperty(e, r) {
		return (e.exclude.includes(r) || (e.exclude.push(r), N(e.version)), !0);
	},
	has(e, r) {
		return e.exclude.includes(r) ? !1 : r in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((r) => !e.exclude.includes(r));
	}
};
function ge(e, r) {
	return new Proxy({ props: e, exclude: r, special: {}, version: _e(0), parent_effect: R }, me);
}
const Pe = {
	get(e, r) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((m(n) && (n = n()), typeof n == 'object' && n !== null && r in n)) return n[r];
		}
	},
	set(e, r, s) {
		let n = e.props.length;
		for (; n--; ) {
			let a = e.props[n];
			m(a) && (a = a());
			const i = g(a, r);
			if (i && i.set) return (i.set(s), !0);
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, r) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((m(n) && (n = n()), typeof n == 'object' && n !== null && r in n)) {
				const a = g(n, r);
				return (a && !a.configurable && (a.configurable = !0), a);
			}
		}
	},
	has(e, r) {
		if (r === B || r === K) return !1;
		for (let s of e.props) if ((m(s) && (s = s()), s != null && r in s)) return !0;
		return !1;
	},
	ownKeys(e) {
		const r = [];
		for (let s of e.props)
			if ((m(s) && (s = s()), !!s)) {
				for (const n in s) r.includes(n) || r.push(n);
				for (const n of Object.getOwnPropertySymbols(s)) r.includes(n) || r.push(n);
			}
		return r;
	}
};
function ye(...e) {
	return new Proxy({ props: e }, Pe);
}
function Se(e, r, s, n) {
	var a = !ce || (s & de) !== 0,
		i = (s & le) !== 0,
		l = (s & ve) !== 0,
		d = n,
		_ = !0,
		S = () => (_ && ((_ = !1), (d = l ? oe(n) : n)), d),
		f;
	if (i) {
		var w = B in e || K in e;
		f = g(e, r)?.set ?? (w && r in e ? (t) => (e[r] = t) : void 0);
	}
	var p,
		o = !1;
	(i ? ([p, o] = be(() => e[r])) : (p = e[r]),
		p === void 0 && n !== void 0 && ((p = S()), f && (a && se(), f(p))));
	var u;
	if (
		(a
			? (u = () => {
					var t = e[r];
					return t === void 0 ? S() : ((_ = !0), t);
				})
			: (u = () => {
					var t = e[r];
					return (t !== void 0 && (d = void 0), t === void 0 ? d : t);
				}),
		a && (s & Y) === 0)
	)
		return u;
	if (f) {
		var x = e.$$legacy;
		return function (t, v) {
			return arguments.length > 0 ? ((!a || !v || x || o) && f(v ? u() : t), t) : u();
		};
	}
	var b = !1,
		c = ((s & pe) !== 0 ? ae : ie)(() => ((b = !1), u()));
	i && P(c);
	var h = R;
	return function (t, v) {
		if (arguments.length > 0) {
			const E = v ? P(c) : a && i ? te(t) : t;
			return (U(c, E), (b = !0), d !== void 0 && (d = E), t);
		}
		return (ue && b) || (h.f & fe) !== 0 ? c.v : P(c);
	};
}
export { Ie as a, Ee as b, xe as i, ge as l, Se as p, Oe as r, ye as s };

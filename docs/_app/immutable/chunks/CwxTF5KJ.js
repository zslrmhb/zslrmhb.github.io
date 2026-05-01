import {
	I as Y,
	J as O,
	K as j,
	O as F,
	am as M,
	an as q,
	ao as H,
	Z,
	ap as g,
	a4 as $,
	P as A,
	a5 as z,
	aq as G,
	a6 as J,
	ar as Q,
	a7 as V,
	R as W,
	N as X,
	as as k,
	H as D,
	ai as ee,
	at as re,
	au as ne,
	C as P,
	aj as K,
	av as y,
	aw as se,
	ax as U,
	a2 as ae,
	ak as ie,
	ay as te,
	az as ue,
	T,
	aA as fe,
	aB as le,
	e as oe,
	d as ce,
	aC as de,
	aD as pe,
	aE as _e,
	aF as ve,
	aG as N,
	aH as L,
	aI as m,
	ab as B,
	aJ as C
} from './7lH0bu5J.js';
function xe(e, r, s = !1) {
	O && j();
	var n = e,
		a = null,
		i = null,
		l = G,
		d = s ? F : 0,
		_ = !1;
	const S = (o, u = !0) => {
		((_ = !0), p(u, o));
	};
	var f = null;
	function w() {
		f !== null && (f.lastChild.remove(), n.before(f), (f = null));
		var o = l ? a : i,
			u = l ? i : a;
		(o && Q(o),
			u &&
				V(u, () => {
					l ? (i = null) : (a = null);
				}));
	}
	const p = (o, u) => {
		if (l === (l = o)) return;
		let x = !1;
		if (O) {
			const I = M(n) === q;
			!!l === I && ((n = H()), Z(n), g(!1), (x = !0));
		}
		var b = J(),
			c = n;
		if (
			(b && ((f = document.createDocumentFragment()), f.append((c = $()))),
			l ? (a ??= u && A(() => u(c))) : (i ??= u && A(() => u(c))),
			b)
		) {
			var h = z,
				t = l ? a : i,
				v = l ? i : a;
			(t && h.skipped_effects.delete(t), v && h.skipped_effects.add(v), h.add_callback(w));
		} else w();
		x && g(!0);
	};
	(Y(() => {
		((_ = !1), r(S), _ || p(null, null));
	}, d),
		O && (n = W));
}
let E = !1,
	R = Symbol();
function Ie(e, r, s) {
	const n = (s[r] ??= { store: null, source: ee(void 0), unsubscribe: D });
	if (n.store !== e && !(R in s))
		if ((n.unsubscribe(), (n.store = e ?? null), e == null))
			((n.source.v = void 0), (n.unsubscribe = D));
		else {
			var a = !0;
			((n.unsubscribe = re(e, (i) => {
				a ? (n.source.v = i) : K(n.source, i);
			})),
				(a = !1));
		}
	return e && R in s ? ne(e) : P(n.source);
}
function Ee() {
	const e = {};
	function r() {
		X(() => {
			for (var s in e) e[s].unsubscribe();
			k(e, R, { enumerable: !1, value: !0 });
		});
	}
	return [e, r];
}
function be(e) {
	var r = E;
	try {
		return ((E = !1), [e(), E]);
	} finally {
		E = r;
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
			var n = T;
			try {
				(L(e.parent_effect),
					(e.special[r] = Se(
						{
							get [r]() {
								return e.props[r];
							}
						},
						r,
						U
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
function ye(e, r) {
	return new Proxy({ props: e, exclude: r, special: {}, version: _e(0), parent_effect: T }, me);
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
			const i = y(a, r);
			if (i && i.set) return (i.set(s), !0);
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, r) {
		let s = e.props.length;
		for (; s--; ) {
			let n = e.props[s];
			if ((m(n) && (n = n()), typeof n == 'object' && n !== null && r in n)) {
				const a = y(n, r);
				return (a && !a.configurable && (a.configurable = !0), a);
			}
		}
	},
	has(e, r) {
		if (r === B || r === C) return !1;
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
function Re(...e) {
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
		var w = B in e || C in e;
		f = y(e, r)?.set ?? (w && r in e ? (t) => (e[r] = t) : void 0);
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
		a && (s & U) === 0)
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
	var h = T;
	return function (t, v) {
		if (arguments.length > 0) {
			const I = v ? P(c) : a && i ? te(t) : t;
			return (K(c, I), (b = !0), d !== void 0 && (d = I), t);
		}
		return (ue && b) || (h.f & fe) !== 0 ? c.v : P(c);
	};
}
export { Ee as a, Ie as b, xe as i, ye as l, Se as p, Oe as r, Re as s };

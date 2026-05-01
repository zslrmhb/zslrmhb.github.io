import {
	I as b,
	J as l,
	K as o,
	O as v,
	a4 as _,
	P as p,
	a5 as T,
	a6 as k,
	R as E,
	a7 as x,
	a8 as y,
	a9 as A,
	e as F,
	aa as R,
	ab as S
} from './7lH0bu5J.js';
function m(r, s, e) {
	l && o();
	var i = r,
		f,
		a,
		n = null,
		t = null;
	function c() {
		(a && (x(a), (a = null)),
			n && (n.lastChild.remove(), i.before(n), (n = null)),
			(a = t),
			(t = null));
	}
	(b(() => {
		if (f !== (f = s())) {
			var u = k();
			if (f) {
				var d = i;
				(u && ((n = document.createDocumentFragment()), n.append((d = _()))),
					(t = p(() => e(d, f))));
			}
			u ? T.add_callback(c) : c();
		}
	}, v),
		l && (i = E));
}
function h(r, s) {
	return r === s || r?.[S] === s;
}
function C(r = {}, s, e, i) {
	return (
		y(() => {
			var f, a;
			return (
				A(() => {
					((f = a),
						(a = []),
						F(() => {
							r !== e(...a) && (s(r, ...a), f && h(e(...f), r) && s(null, ...f));
						}));
				}),
				() => {
					R(() => {
						a && h(e(...a), r) && s(null, ...a);
					});
				}
			);
		}),
		r
	);
}
export { C as b, m as c };

import {
	D as u,
	J as o,
	K as l,
	T as g,
	U as y,
	R as h,
	V as p,
	W as R,
	X as w,
	Y as O,
	M as c,
	Z as T,
	L as b,
	S as f
} from './7lH0bu5J.js';
function M(m, v, i = !1, _ = !1, D = !1) {
	var n = m,
		t = '';
	u(() => {
		var s = g;
		if (t === (t = v() ?? '')) {
			o && l();
			return;
		}
		if (
			(s.nodes_start !== null &&
				(y(s.nodes_start, s.nodes_end), (s.nodes_start = s.nodes_end = null)),
			t !== '')
		) {
			if (o) {
				h.data;
				for (var e = l(), d = e; e !== null && (e.nodeType !== p || e.data !== ''); )
					((d = e), (e = R(e)));
				if (e === null) throw (w(), O);
				(c(h, d), (n = T(e)));
				return;
			}
			var r = t + '';
			i ? (r = `<svg>${r}</svg>`) : _ && (r = `<math>${r}</math>`);
			var a = b(r);
			if (((i || _) && (a = f(a)), c(f(a), a.lastChild), i || _)) for (; f(a); ) n.before(f(a));
			else n.before(a);
		}
	});
}
export { M as h };

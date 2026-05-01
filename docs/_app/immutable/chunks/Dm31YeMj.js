import {
	I as c,
	J as f,
	K as _,
	L as d,
	M as l,
	N as u,
	O as h,
	P as m,
	H as v,
	Q as y,
	R as o,
	S as g
} from './7lH0bu5J.js';
function b(r, s, ...n) {
	var t = r,
		e = v,
		a;
	(c(() => {
		e !== (e = s()) && (a && (y(a), (a = null)), (a = m(() => e(t, ...n))));
	}, h),
		f && (t = o));
}
function E(r) {
	return (s, ...n) => {
		var t = r(...n),
			e;
		if (f) ((e = o), _());
		else {
			var a = t.render().trim(),
				p = d(a);
			((e = g(p)), s.before(e));
		}
		const i = t.setup?.(e);
		(l(e, e), typeof i == 'function' && u(i));
	};
}
export { E as c, b as s };

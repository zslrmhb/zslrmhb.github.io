import {
	j as d,
	a7 as g,
	a8 as c,
	i as l,
	u as m,
	g as p,
	a9 as b,
	d as v,
	aa as h
} from './BfTMFq0c.js';
function x(n = !1) {
	const s = d,
		e = s.l.u;
	if (!e) return;
	let f = () => v(s.s);
	if (n) {
		let a = 0,
			t = {};
		const _ = h(() => {
			let i = !1;
			const r = s.s;
			for (const o in r) r[o] !== t[o] && ((t[o] = r[o]), (i = !0));
			return (i && a++, a);
		});
		f = () => p(_);
	}
	(e.b.length &&
		g(() => {
			(u(s, f), c(e.b));
		}),
		l(() => {
			const a = m(() => e.m.map(b));
			return () => {
				for (const t of a) typeof t == 'function' && t();
			};
		}),
		e.a.length &&
			l(() => {
				(u(s, f), c(e.a));
			}));
}
function u(n, s) {
	if (n.l.s) for (const e of n.l.s) p(e);
	s();
}
export { x as i };

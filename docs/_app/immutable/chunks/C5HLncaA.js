import {
	l as a,
	u as b,
	c as e,
	a as i,
	g as d,
	i as g,
	b as f,
	d as v,
	e as c,
	f as y,
	h,
	j as x,
	k as C,
	m as k,
	n as S,
	s as j,
	o as w,
	t as A,
	p as D
} from './7lH0bu5J.js';
import { c as E } from './Dm31YeMj.js';
function M() {
	return (i === null && d(), (i.ac ??= new AbortController()).signal);
}
function _(t) {
	(e === null && a(),
		v && e.l !== null
			? u(e).m.push(t)
			: b(() => {
					const n = c(t);
					if (typeof n == 'function') return n;
				}));
}
function O(t) {
	(e === null && a(), _(() => () => c(t)));
}
function P(t, n, { bubbles: s = !1, cancelable: l = !1 } = {}) {
	return new CustomEvent(t, { detail: n, bubbles: s, cancelable: l });
}
function U() {
	const t = e;
	return (
		t === null && a(),
		(n, s, l) => {
			const o = t.s.$$events?.[n];
			if (o) {
				const p = g(o) ? o.slice() : [o],
					r = P(n, s, l);
				for (const m of p) m.call(t.x, r);
				return !r.defaultPrevented;
			}
			return !0;
		}
	);
}
function $(t) {
	(e === null && a(), e.l === null && f(), u(e).b.push(t));
}
function z(t) {
	(e === null && a(), e.l === null && f(), u(e).a.push(t));
}
function u(t) {
	var n = t.l;
	return (n.u ??= { a: [], b: [], m: [] });
}
const q = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			afterUpdate: z,
			beforeUpdate: $,
			createEventDispatcher: U,
			createRawSnippet: E,
			flushSync: y,
			getAbortSignal: M,
			getAllContexts: h,
			getContext: x,
			hasContext: C,
			hydrate: k,
			mount: S,
			onDestroy: O,
			onMount: _,
			setContext: j,
			settled: w,
			tick: A,
			unmount: D,
			untrack: c
		},
		Symbol.toStringTag,
		{ value: 'Module' }
	)
);
export { O as a, z as b, $ as c, _ as o, q as s };

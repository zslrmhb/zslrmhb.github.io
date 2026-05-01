import { y as f, x as u, B as l, ad as a, g as m, af as h } from './BfTMFq0c.js';
import { i as o, b as w } from './DceYgdnR.js';
class O {
	#e;
	#t;
	constructor(t) {
		((this.#e = t), (this.#t = Symbol(t)));
	}
	get key() {
		return this.#t;
	}
	exists() {
		return f(this.#t);
	}
	get() {
		const t = u(this.#t);
		if (t === void 0) throw new Error(`Context "${this.#e}" not found`);
		return t;
	}
	getOr(t) {
		const r = u(this.#t);
		return r === void 0 ? t : r;
	}
	set(t) {
		return l(this.#t, t);
	}
}
const g = 1,
	d = 9,
	E = 11;
function i(e) {
	return o(e) && e.nodeType === g && typeof e.nodeName == 'string';
}
function s(e) {
	return o(e) && e.nodeType === d;
}
function y(e) {
	return o(e) && e.constructor?.name === 'VisualViewport';
}
function N(e) {
	return o(e) && e.nodeType !== void 0;
}
function c(e) {
	return N(e) && e.nodeType === E && 'host' in e;
}
function p(e, t) {
	if (!e || !t || !i(e) || !i(t)) return !1;
	const r = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (r && c(r)) {
		let n = t;
		for (; n; ) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function x(e) {
	return s(e) ? e : y(e) ? e.document : (e?.ownerDocument ?? document);
}
function D(e) {
	return c(e)
		? D(e.host)
		: s(e)
			? (e.defaultView ?? window)
			: i(e)
				? (e.ownerDocument?.defaultView ?? window)
				: window;
}
function T(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot; ) {
		const r = t.shadowRoot.activeElement;
		if (r === t) break;
		t = r;
	}
	return t;
}
class A {
	element;
	#e = a(() =>
		this.element.current ? (this.element.current.getRootNode() ?? document) : document
	);
	get root() {
		return m(this.#e);
	}
	set root(t) {
		h(this.#e, t);
	}
	constructor(t) {
		typeof t == 'function' ? (this.element = w.with(t)) : (this.element = t);
	}
	getDocument = () => x(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => T(this.root);
	isActiveElement = (t) => t === this.getActiveElement();
	getElementById(t) {
		return this.root.getElementById(t);
	}
	querySelector = (t) => (this.root ? this.root.querySelector(t) : null);
	querySelectorAll = (t) => (this.root ? this.root.querySelectorAll(t) : []);
	setTimeout = (t, r) => this.getWindow().setTimeout(t, r);
	clearTimeout = (t) => this.getWindow().clearTimeout(t);
}
export { O as C, A as D, x as a, p as c, D as g };

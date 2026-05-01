import './DsnmJJEf.js';
import './B5_alTbJ.js';
import {
	q as S,
	ac as j,
	e as v,
	A as s,
	z as A,
	y as I,
	B as q,
	w as k,
	x as F,
	F as G,
	G as O,
	C as u,
	ad as P,
	ae as D
} from './7lH0bu5J.js';
import { a as _, e as E, i as H } from './0UGGdwXT.js';
import { s as J } from './DU8GTY5b.js';
import { e as K } from './DHBKuhVu.js';
import { i as L } from './Cm3kWbeN.js';
import { l as w, p as o } from './CwxTF5KJ.js';
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
 */ const M = {
	xmlns: 'http://www.w3.org/2000/svg',
	width: 24,
	height: 24,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	'stroke-width': 2,
	'stroke-linecap': 'round',
	'stroke-linejoin': 'round'
};
var Q = j('<svg><!><!></svg>');
function te(p, e) {
	const l = w(e, ['children', '$$slots', '$$events', '$$legacy']),
		b = w(l, ['name', 'color', 'size', 'strokeWidth', 'absoluteStrokeWidth', 'iconNode']);
	S(e, !1);
	let d = o(e, 'name', 8, void 0),
		x = o(e, 'color', 8, 'currentColor'),
		a = o(e, 'size', 8, 24),
		c = o(e, 'strokeWidth', 8, 2),
		h = o(e, 'absoluteStrokeWidth', 8, !1),
		W = o(e, 'iconNode', 24, () => []);
	const y = (...r) => r.filter((t, n, m) => !!t && m.indexOf(t) === n).join(' ');
	L();
	var i = Q();
	_(
		i,
		(r, t) => ({ ...M, ...b, width: a(), height: a(), stroke: x(), 'stroke-width': r, class: t }),
		[
			() => (s(h()), s(c()), s(a()), v(() => (h() ? (Number(c()) * 24) / Number(a()) : c()))),
			() => (s(d()), s(l), v(() => y('lucide-icon', 'lucide', d() ? `lucide-${d()}` : '', l.class)))
		]
	);
	var f = A(i);
	E(f, 1, W, H, (r, t) => {
		var n = P(() => D(u(t), 2));
		let m = () => u(n)[0],
			C = () => u(n)[1];
		var g = G(),
			N = O(g);
		(K(N, m, !0, (B, R) => {
			_(B, () => ({ ...C() }));
		}),
			k(r, g));
	});
	var z = I(f);
	(J(z, e, 'default', {}, null), q(i), k(p, i), F());
}
export { te as I };

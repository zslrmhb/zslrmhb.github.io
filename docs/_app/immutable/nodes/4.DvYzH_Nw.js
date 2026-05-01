import '../chunks/DsnmJJEf.js';
import '../chunks/CRJC6bhr.js';
import {
	p as F,
	f as d,
	h as L,
	a as c,
	b as w,
	$ as P,
	c as s,
	u as l,
	d as x,
	r as t,
	s as R,
	t as U,
	g as e,
	e as h
} from '../chunks/BfTMFq0c.js';
import { e as Y, i as j, f as g, s as q } from '../chunks/DrzAit6R.js';
import { i as z } from '../chunks/CuHUdPRB.js';
import { p as C } from '../chunks/BPV7WAZE.js';
import { B as G } from '../chunks/BpNvDu5q.js';
var H = d(
		'<a class="mb-4 flex flex-col space-y-1"><div class="flex w-full flex-col"><p class="tracking-tight"> </p> <p class="h-6 text-xs text-muted-foreground"> </p></div></a>'
	),
	I = d('<li class="post"><!></li>'),
	J = d('<section><ul class="posts"></ul></section>');
function W($, f) {
	F(f, !1);
	let m = C(f, 'data', 8),
		b = 0.04;
	z();
	var o = J();
	L((u) => {
		P.title = 'Blog';
	});
	var n = s(o);
	(Y(
		n,
		5,
		() => (x(m()), l(() => m().posts)),
		j,
		(u, a, B) => {
			var i = I(),
				D = s(i);
			(G(D, {
				delay: b * 2 + B * 0.05,
				children: (k, K) => {
					var r = H(),
						v = s(r),
						p = s(v),
						y = s(p, !0);
					t(p);
					var _ = R(p, 2),
						A = s(_, !0);
					(t(_),
						t(v),
						t(r),
						U(
							(E) => {
								(q(r, 'href', `/blog/${(e(a), l(() => e(a).slug) ?? '')}`),
									h(y, (e(a), l(() => e(a).title))),
									h(A, E));
							},
							[() => (e(a), x(g), l(() => (e(a).date ? g(e(a).date) : '')))]
						),
						c(k, r));
				},
				$$slots: { default: !0 }
			}),
				t(i),
				c(u, i));
		}
	),
		t(n),
		t(o),
		c($, o),
		w());
}
export { W as component };

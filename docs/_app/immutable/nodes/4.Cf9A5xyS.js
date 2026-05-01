import '../chunks/DsnmJJEf.js';
import '../chunks/B5_alTbJ.js';
import {
	q as F,
	r as d,
	v as G,
	w as n,
	x as J,
	$ as K,
	y as h,
	z as m,
	A as _,
	e as t,
	B as i,
	C as a,
	D as b,
	E as w
} from '../chunks/7lH0bu5J.js';
import { p as L, i as y } from '../chunks/CwxTF5KJ.js';
import { e as O, s as B, f as A, i as P } from '../chunks/0UGGdwXT.js';
import { i as Q } from '../chunks/Cm3kWbeN.js';
var R = d(
		'<meta name="description" content="Notes and resources from Hongbin Miao on AI, engineering, and learning."/>'
	),
	S = d('<time class="shrink-0 text-xs text-muted-foreground"> </time>'),
	T = d('<p class="mt-2 max-w-xl text-sm leading-6 text-muted-foreground"> </p>'),
	U = d(
		'<li><a class="group block py-5"><div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"><h2 class="text-base leading-6 font-medium group-hover:underline"> </h2> <!></div> <!></a></li>'
	),
	V = d('<ul class="divide-y divide-border/70"></ul>'),
	X = d('<p class="text-sm text-muted-foreground">No published posts yet.</p>'),
	Y = d(
		'<section class="mx-auto w-full max-w-2xl pt-16 pb-24 sm:pt-10"><header class="mb-10"><h1 class="text-3xl leading-tight font-semibold">Blog</h1> <p class="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Writing notes, technical references, and things worth revisiting.</p></header> <!></section>'
	);
function se(D, k) {
	F(k, !1);
	let v = L(k, 'data', 8);
	Q();
	var c = Y();
	G((r) => {
		var o = R();
		((K.title = 'Blog'), n(r, o));
	});
	var N = h(m(c), 2);
	{
		var j = (r) => {
				var o = V();
				(O(
					o,
					5,
					() => (_(v()), t(() => v().posts)),
					P,
					(z, e) => {
						var u = U(),
							f = m(u),
							x = m(f),
							g = m(x),
							C = m(g, !0);
						i(g);
						var E = h(g, 2);
						{
							var H = (l) => {
								var s = S(),
									p = m(s, !0);
								(i(s),
									b(
										(W) => {
											(B(s, 'datetime', (a(e), t(() => a(e).date))), w(p, W));
										},
										[() => (_(A), a(e), t(() => A(a(e).date)))]
									),
									n(l, s));
							};
							y(E, (l) => {
								(a(e), t(() => a(e).date) && l(H));
							});
						}
						i(x);
						var I = h(x, 2);
						{
							var M = (l) => {
								var s = T(),
									p = m(s, !0);
								(i(s), b(() => w(p, (a(e), t(() => a(e).summary ?? a(e).description)))), n(l, s));
							};
							y(I, (l) => {
								(a(e), t(() => a(e).summary || a(e).description) && l(M));
							});
						}
						(i(f),
							i(u),
							b(() => {
								(B(f, 'href', `/blog/${(a(e), t(() => a(e).slug) ?? '')}`),
									w(C, (a(e), t(() => a(e).title))));
							}),
							n(z, u));
					}
				),
					i(o),
					n(r, o));
			},
			q = (r) => {
				var o = X();
				n(r, o);
			};
		y(N, (r) => {
			(_(v()), t(() => v().posts.length > 0) ? r(j) : r(q, !1));
		});
	}
	(i(c), n(D, c), J());
}
export { se as component };

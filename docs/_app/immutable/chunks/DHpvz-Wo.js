import './DsnmJJEf.js';
import './CRJC6bhr.js';
import {
	F as re,
	G as h,
	a as e,
	p as oe,
	f,
	c as se,
	s as l,
	g as R,
	ad as le,
	r as ae,
	t as ne,
	b as $e,
	aH as s,
	aI as n
} from './BfTMFq0c.js';
import { l as Z, s as Q, i as de } from './BPV7WAZE.js';
import { B as ie, H as S, U as F, L as _, a as P, P as b, b as V } from './DEl8EeN2.js';
import { s as ue } from './DY748rXZ.js';
import { s as U } from './DrzAit6R.js';
import { s as he } from './Dzs_ntad.js';
import { I as fe } from './DeCwWDoT.js';
function ce(O, A) {
	const j = Z(A, ['children', '$$slots', '$$events', '$$legacy']);
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
	 */ const D = [
		['path', { d: 'M15 3h6v6' }],
		['path', { d: 'M10 14 21 3' }],
		['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }]
	];
	fe(
		O,
		Q({ name: 'external-link' }, () => j, {
			get iconNode() {
				return D;
			},
			children: (H, E) => {
				var J = re(),
					M = h(J);
				(he(M, A, 'default', {}, null), e(H, J));
			},
			$$slots: { default: !0 }
		})
	);
}
var pe = f(
	'<a class="inline-flex items-center gap-1 text-blue-400 transition-colors hover:underline hover:underline-offset-4"><!> <!></a>'
);
function v(O, A) {
	oe(A, !0);
	const j = le(() => A.href.startsWith('/') || A.href.startsWith('#'));
	var D = pe(),
		H = se(D);
	ue(H, () => A.children);
	var E = l(H, 2);
	{
		var J = (M) => {
			ce(M, { class: 'h-3 w-3' });
		};
		de(E, (M) => {
			R(j) || M(J);
		});
	}
	(ae(D),
		ne(() => {
			(U(D, 'href', A.href),
				U(D, 'target', R(j) ? void 0 : '_blank'),
				U(D, 'rel', R(j) ? void 0 : 'noopener noreferrer'));
		}),
		e(O, D),
		$e());
}
const Y = {
		title: 'AI Resources',
		date: '2025-08-21T00:00:00.000Z',
		published: !0,
		author: 'Hongbin Miao',
		summary: 'This page is a collection of AI-related resources that I personally found helpful.',
		categories: ['Deep Learning']
	},
	{ title: Ve, date: Ze, published: Qe, author: Ye, summary: ze, categories: We } = Y;
var ve = f('<!> <!>', 1),
	_e = f('<!> <!>', 1),
	me = f('<!> <!>', 1),
	ge = f('<!> <!>', 1),
	Pe = f('<!> <!>', 1),
	be = f('<!> <!> <!> <!> <!>', 1),
	we = f('<!> <!>', 1),
	xe = f('<!> <!>', 1),
	ye = f('<!> <!>', 1),
	ke = f('<!> <!>', 1),
	Le = f('<!> <!> <!> <!> <!> <!>', 1),
	Ae = f('<!> <!>', 1),
	De = f('<!> <!>', 1),
	Ie = f('Latest book by the author of the famous book: <!>', 1),
	Be = f('<!> <!>', 1),
	Me = f('<!> <!>', 1),
	Te = f('<!> <!>', 1),
	je = f('<!> <!>', 1),
	Je = f('<!> <!>', 1),
	Oe = f('<!> <!> <!> <!> <!> <!> <!>', 1),
	He = f('<!> <!>', 1),
	Ee = f('<!> <!> <!> <!> <!> <!> <!> <!> <!>', 1);
function et(O, A) {
	const j = Z(A, ['children', '$$slots', '$$events', '$$legacy']);
	ie(
		O,
		Q(
			() => j,
			() => Y,
			{
				children: (D, H) => {
					var E = Ee(),
						J = h(E);
					S(J, {
						children: (m, T) => {
							s();
							var p = n('Youtube channels');
							e(m, p);
						},
						$$slots: { default: !0 }
					});
					var M = l(J, 2);
					F(M, {
						children: (m, T) => {
							var p = be(),
								k = h(p);
							_(k, {
								children: (g, c) => {
									var i = ve(),
										d = h(i);
									v(d, {
										href: 'https://www.youtube.com/@Deeplearningai',
										rel: 'nofollow',
										children: (r, $) => {
											s();
											var t = n('DeepLearning.AI');
											e(r, t);
										},
										$$slots: { default: !0 }
									});
									var o = l(d, 2);
									(P(o, {
										children: (r, $) => {
											b(r, {
												children: (t, u) => {
													s();
													var a = n('This is superb!');
													e(t, a);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(g, i));
								},
								$$slots: { default: !0 }
							});
							var I = l(k, 2);
							_(I, {
								children: (g, c) => {
									var i = _e(),
										d = h(i);
									v(d, {
										href: 'https://www.youtube.com/@3blue1brown',
										rel: 'nofollow',
										children: (r, $) => {
											s();
											var t = n('3Blue1Brown');
											e(r, t);
										},
										$$slots: { default: !0 }
									});
									var o = l(d, 2);
									(P(o, {
										children: (r, $) => {
											b(r, {
												children: (t, u) => {
													s();
													var a = n('Highly Recommended, very intuitive explaination!');
													e(t, a);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(g, i));
								},
								$$slots: { default: !0 }
							});
							var y = l(I, 2);
							_(y, {
								children: (g, c) => {
									var i = me(),
										d = h(i);
									v(d, {
										href: 'https://www.youtube.com/@AndrejKarpathy',
										rel: 'nofollow',
										children: (r, $) => {
											s();
											var t = n('Andrej Karpathy');
											e(r, t);
										},
										$$slots: { default: !0 }
									});
									var o = l(d, 2);
									(P(o, {
										children: (r, $) => {
											b(r, {
												children: (t, u) => {
													s();
													var a = n(
														'Understanding AI from scratch by one of the co-founders of OpenAI'
													);
													e(t, a);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(g, i));
								},
								$$slots: { default: !0 }
							});
							var B = l(y, 2);
							_(B, {
								children: (g, c) => {
									var i = ge(),
										d = h(i);
									v(d, {
										href: 'https://www.youtube.com/@umarjamilai',
										rel: 'nofollow',
										children: (r, $) => {
											s();
											var t = n('Umar Jamil');
											e(r, t);
										},
										$$slots: { default: !0 }
									});
									var o = l(d, 2);
									(P(o, {
										children: (r, $) => {
											b(r, {
												children: (t, u) => {
													s();
													var a = n('Paper implementation walk-thru.');
													e(t, a);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(g, i));
								},
								$$slots: { default: !0 }
							});
							var L = l(B, 2);
							(_(L, {
								children: (g, c) => {
									var i = Pe(),
										d = h(i);
									v(d, {
										href: 'https://www.youtube.com/@statquest',
										rel: 'nofollow',
										children: (r, $) => {
											s();
											var t = n('StatQuest with Josh Starmer');
											e(r, t);
										},
										$$slots: { default: !0 }
									});
									var o = l(d, 2);
									(P(o, {
										children: (r, $) => {
											b(r, {
												children: (t, u) => {
													s();
													var a = n('Intuitive stat. tutorials');
													e(t, a);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(g, i));
								},
								$$slots: { default: !0 }
							}),
								e(m, p));
						},
						$$slots: { default: !0 }
					});
					var q = l(M, 2);
					S(q, {
						children: (m, T) => {
							s();
							var p = n('Blogs');
							e(m, p);
						},
						$$slots: { default: !0 }
					});
					var G = l(q, 2);
					F(G, {
						children: (m, T) => {
							var p = Le(),
								k = h(p);
							_(k, {
								children: (c, i) => {
									var d = we(),
										o = h(d);
									v(o, {
										href: 'https://lilianweng.github.io/',
										rel: 'nofollow',
										children: ($, t) => {
											s();
											var u = n('Lil’Log');
											e($, u);
										},
										$$slots: { default: !0 }
									});
									var r = l(o, 2);
									(P(r, {
										children: ($, t) => {
											b($, {
												children: (u, a) => {
													s();
													var w = n(
														'Really insightful blog about latest AI research by ex-OpenAI Research Scientist'
													);
													e(u, w);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(c, d));
								},
								$$slots: { default: !0 }
							});
							var I = l(k, 2);
							_(I, {
								children: (c, i) => {
									var d = xe(),
										o = h(d);
									v(o, {
										href: 'https://colah.github.io',
										rel: 'nofollow',
										children: ($, t) => {
											s();
											var u = n('Chris Olah’s blog');
											e($, u);
										},
										$$slots: { default: !0 }
									});
									var r = l(o, 2);
									(P(r, {
										children: ($, t) => {
											b($, {
												children: (u, a) => {
													s();
													var w = n(
														'If you are interested AI explainability (from one of the researchers at Anthropic)'
													);
													e(u, w);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(c, d));
								},
								$$slots: { default: !0 }
							});
							var y = l(I, 2);
							_(y, {
								children: (c, i) => {
									v(c, {
										href: 'https://jalammar.github.io',
										rel: 'nofollow',
										children: (d, o) => {
											s();
											var r = n('Jay Alammar’s blog');
											e(d, r);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
							var B = l(y, 2);
							_(B, {
								children: (c, i) => {
									v(c, {
										href: 'https://sebastianraschka.com/',
										rel: 'nofollow',
										children: (d, o) => {
											s();
											var r = n('Sebastian Raschka’s blog');
											e(d, r);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
							var L = l(B, 2);
							_(L, {
								children: (c, i) => {
									var d = ye(),
										o = h(d);
									v(o, {
										href: 'https://aman.ai',
										rel: 'nofollow',
										children: ($, t) => {
											s();
											var u = n('Aman’s blog');
											e($, u);
										},
										$$slots: { default: !0 }
									});
									var r = l(o, 2);
									(P(r, {
										children: ($, t) => {
											b($, {
												children: (u, a) => {
													s();
													var w = n('This has almost everything about Machine Learning');
													e(u, w);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(c, d));
								},
								$$slots: { default: !0 }
							});
							var g = l(L, 2);
							(_(g, {
								children: (c, i) => {
									var d = ke(),
										o = h(d);
									v(o, {
										href: 'https://distill.pub',
										rel: 'nofollow',
										children: ($, t) => {
											s();
											var u = n('distill.pub');
											e($, u);
										},
										$$slots: { default: !0 }
									});
									var r = l(o, 2);
									(P(r, {
										children: ($, t) => {
											b($, {
												children: (u, a) => {
													s();
													var w = n('Interactive blog! (NOT UPDATED since 2021)');
													e(u, w);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(c, d));
								},
								$$slots: { default: !0 }
							}),
								e(m, p));
						},
						$$slots: { default: !0 }
					});
					var N = l(G, 2);
					S(N, {
						children: (m, T) => {
							s();
							var p = n('Books');
							e(m, p);
						},
						$$slots: { default: !0 }
					});
					var C = l(N, 2);
					V(C, {
						children: (m, T) => {
							s();
							var p = n('Theory');
							e(m, p);
						},
						$$slots: { default: !0 }
					});
					var X = l(C, 2);
					F(X, {
						children: (m, T) => {
							var p = Oe(),
								k = h(p);
							_(k, {
								children: (i, d) => {
									var o = Ae(),
										r = h(o);
									v(r, {
										href: 'https://d2l.ai/',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Dive into Deep Learning');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = n('Really good book covering both theory and practice');
													e(a, x);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							});
							var I = l(k, 2);
							_(I, {
								children: (i, d) => {
									var o = De(),
										r = h(o);
									v(r, {
										href: 'https://udlbook.github.io/udlbook/',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Understanding Deep Learning');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = n(
														'Taken verbatim from the book description “An authoritative, accessible, and up-to-date treatment of deep learning that strikes a pragmatic middle ground between theory and practice”'
													);
													e(a, x);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							});
							var y = l(I, 2);
							_(y, {
								children: (i, d) => {
									var o = Be(),
										r = h(o);
									v(r, {
										href: 'https://www.bishopbook.com',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Deep Learning: Foundations and Concepts');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = Ie(),
														W = l(h(x));
													(v(W, {
														href: 'https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf',
														rel: 'nofollow',
														children: (ee, Fe) => {
															s();
															var te = n('Pattern Recognition and Machine Learning');
															e(ee, te);
														},
														$$slots: { default: !0 }
													}),
														e(a, x));
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							});
							var B = l(y, 2);
							_(B, {
								children: (i, d) => {
									var o = Me(),
										r = h(o);
									v(r, {
										href: 'https://www.deeplearningbook.org',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Deep Learning (Adaptive Computation and Machine Learning series)');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = n('The “Bible” of Deep Learning (theory-heavy)');
													e(a, x);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							});
							var L = l(B, 2);
							_(L, {
								children: (i, d) => {
									var o = Te(),
										r = h(o);
									v(r, {
										href: 'https://probml.github.io/pml-book/book1.html',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Probabilistic Machine Learning: An Introduction');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = n('Machine Learning Encyclopedia Vol. 1');
													e(a, x);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							});
							var g = l(L, 2);
							_(g, {
								children: (i, d) => {
									var o = je(),
										r = h(o);
									v(r, {
										href: 'https://probml.github.io/pml-book/book2.html',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Probabilistic Machine Learning: Advanced Topics');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = n('Machine Learning Encyclopedia Vol. 2');
													e(a, x);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							});
							var c = l(g, 2);
							(_(c, {
								children: (i, d) => {
									var o = Je(),
										r = h(o);
									v(r, {
										href: 'https://mml-book.github.io',
										rel: 'nofollow',
										children: (t, u) => {
											s();
											var a = n('Mathematics for Machine Learning');
											e(t, a);
										},
										$$slots: { default: !0 }
									});
									var $ = l(r, 2);
									(P($, {
										children: (t, u) => {
											b(t, {
												children: (a, w) => {
													s();
													var x = n(
														'Covers all the fundamental math building blocks of machine learning'
													);
													e(a, x);
												},
												$$slots: { default: !0 }
											});
										},
										$$slots: { default: !0 }
									}),
										e(i, o));
								},
								$$slots: { default: !0 }
							}),
								e(m, p));
						},
						$$slots: { default: !0 }
					});
					var K = l(X, 2);
					V(K, {
						children: (m, T) => {
							s();
							var p = n('Engineering');
							e(m, p);
						},
						$$slots: { default: !0 }
					});
					var z = l(K, 2);
					(F(z, {
						children: (m, T) => {
							var p = He(),
								k = h(p);
							_(k, {
								children: (y, B) => {
									v(y, {
										href: 'https://www.amazon.com/AI-Engineering-Building-Applications-Foundation/dp/1098166302/ref=sr_1_3?crid=403BXUY4B09H&dib=eyJ2IjoiMSJ9.4IRYkmtBjeQQ20xqiYjJms9HJAnTwqkJ15whfPjct-khT7F_-Xfci1dc7xesFrZ0NAd4pWu9dN2tuG-qTP7XccsK1DK1pzhr01OFS_3eZLJFl3kC4tmggATic0OXsN1kVe_42bP0AOav7fbfvYenpFi79WutDe-Jiw6Xjjbt8sITyPS3LlrN666Dhx-EjJcVltLxZF2S5qfEmNmcu8KGFZDkmGoH7vCT3i9HS7F8nYc.QROP2sOpi91qMTihM5-0P4wRI-TgMJgb6vbpxIZDRGs&dib_tag=se&keywords=ai+engineering&qid=1757009031&sprefix=ai+eng%2Caps%2C223&sr=8-3',
										rel: 'nofollow',
										children: (L, g) => {
											s();
											var c = n('AI Engineering');
											e(L, c);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
							var I = l(k, 2);
							(_(I, {
								children: (y, B) => {
									v(y, {
										href: 'https://www.amazon.com/Designing-Machine-Learning-Systems-Production-Ready/dp/1098107969/ref=sr_1_1?crid=2BXDDJ0ETMGTF&dib=eyJ2IjoiMSJ9.OBDpLaGfjPFym8EGEjKYAmh-ma6yOctFVEu8eobu-8B5ciUaUYyBk9BTejf4UQmEhxoCxBLmHwzLNXxgiGOjXLZWkP855_rizo4hSe-K9ep2s92mm2tNq5o95TKztjJoNVL3_XKL2ZhwqWJBdbxxsDFDly9mi1ZqBOwI_8JQ6e4oyVBRZTHO7__rdhOhrHKBsJiQb-rHgVBuGDs2UGmArxvdbvoufSEV-DOnveLwGy0.HSnfIQM2jjXenRUMU-Yu7rtLcfbxNQki-s6ybO2gXxk&dib_tag=se&keywords=designing+machine+learning+systems&qid=1757009062&sprefix=designing+machine+learning+system%2Caps%2C226&sr=8-1',
										rel: 'nofollow',
										children: (L, g) => {
											s();
											var c = n('Designing Machine Learning Systems');
											e(L, c);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							}),
								e(m, p));
						},
						$$slots: { default: !0 }
					}),
						e(D, E));
				},
				$$slots: { default: !0 }
			}
		)
	);
}
export { et as default, Y as metadata };

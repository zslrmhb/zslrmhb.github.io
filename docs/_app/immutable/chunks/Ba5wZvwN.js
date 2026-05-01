import './DsnmJJEf.js';
import { p as m, F as n, G as o, H as p, a as d, b as h } from './BfTMFq0c.js';
import { s as x } from './DY748rXZ.js';
import { c as y, e as w } from './DceYgdnR.js';
import { a as _, c as k } from './DrzAit6R.js';
import { b as B } from './CbSA8EeA.js';
import { p as c, r as V } from './BPV7WAZE.js';
const j = y({
	base: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent',
			secondary:
				'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent',
			destructive:
				'bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white',
			outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
		}
	},
	defaultVariants: { variant: 'default' }
});
function C(f, r) {
	m(r, !0);
	let a = c(r, 'ref', 15, null),
		v = c(r, 'variant', 3, 'default'),
		u = V(r, ['$$slots', '$$events', '$$legacy', 'ref', 'href', 'class', 'variant', 'children']);
	var t = n(),
		l = o(t);
	(w(
		l,
		() => (r.href ? 'a' : 'span'),
		!1,
		(i, g) => {
			(B(
				i,
				(e) => a(e),
				() => a()
			),
				_(i, (e) => ({ 'data-slot': 'badge', href: r.href, class: e, ...u }), [
					() => k(j({ variant: v() }), r.class)
				]));
			var s = n(),
				b = o(s);
			(x(b, () => r.children ?? p), d(g, s));
		}
	),
		d(f, t),
		h());
}
export { C as B };

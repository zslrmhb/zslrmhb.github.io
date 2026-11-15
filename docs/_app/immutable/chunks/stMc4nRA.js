import"./DsnmJJEf.js";import"./yf2ImrLy.js";import{j as a,k as x,_ as z,b as p,w as y,aO as j,l as F,E as M,B as O,a0 as I,W as Q,aP as V,J as q,F as D,v as W,q as N,Q as G,V as J,p as L,aQ as $,g as H,N as K,a as U,s as X,r as Y,c as Z,u as S,h as v,i as E,aN as ee,aR as te}from"./u5grfkyq.js";import{b as A,e as ae,i as se}from"./YUbDy_n_.js";import{i as re}from"./xbw6rOtk.js";import{l as T,p as u}from"./DxAUNZmX.js";function ne(l,t,d,n,_){if(a&&x(),t.$$host?.$$shadowRoot){const e=z("slot");p(l,e);return}var i=t.$$slots?.[d],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(l,s?()=>n:n)}function ie(l,t,d,n,_,i){let s=a;a&&x();var e=null;a&&y.nodeType===j&&(e=y,x());var h=a?y:l,g=new O(h,!1);F(()=>{const o=t()||null;var f=I;if(o===null){g.ensure(null,null);return}return g.ensure(o,m=>{if(o){if(e=a?e:z(o,f),Q(e,e),n){var k=null;a&&V(o)&&e.append(k=document.createComment(""));var r=a?q(e):e.appendChild(D());a&&(r===null?W(!1):N(r)),n(e,r),k?.remove()}G.nodes.end=e,m.before(e)}a&&N(m)}),()=>{}},M),J(()=>{}),s&&(W(!0),N(h))}/**
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
 */const oe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var le=$("<svg><!><!></svg>");function ve(l,t){const d=T(t,["children","$$slots","$$events","$$legacy"]),n=T(d,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);L(t,!1);let _=u(t,"name",8,void 0),i=u(t,"color",8,"currentColor"),s=u(t,"size",8,24),e=u(t,"strokeWidth",8,2),h=u(t,"absoluteStrokeWidth",8,!1),g=u(t,"iconNode",24,()=>[]);const o=(...r)=>r.filter((c,w,b)=>!!c&&b.indexOf(c)===w).join(" ");re();var f=le();A(f,(r,c)=>({...oe,...n,width:s(),height:s(),stroke:i(),"stroke-width":r,class:c}),[()=>(v(h()),v(e()),v(s()),S(()=>h()?Number(e())*24/Number(s()):e())),()=>(v(_()),v(d),S(()=>o("lucide-icon","lucide",_()?`lucide-${_()}`:"",d.class)))]);var m=H(f);ae(m,1,g,se,(r,c)=>{var w=ee(()=>te(E(c),2));let b=()=>E(w)[0],B=()=>E(w)[1];var C=K(),P=U(C);ie(P,b,!0,(R,de)=>{A(R,()=>({...B()}))}),p(r,C)});var k=X(m);ne(k,t,"default",{}),Y(f),p(l,f),Z()}export{ve as I,ne as s};

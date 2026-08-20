import{a as c,d as l}from"../chunks/QUmjvB7P.js";import{a as u,s as f}from"../chunks/BF1SfM1o.js";import{c as m,b as p}from"../chunks/DDJZBS6B.js";import{p as y,O as g,u as h}from"../chunks/6M0omE6E.js";import{i as _}from"../chunks/CcL1oHS0.js";import{P as v}from"../chunks/xuTD3LP9.js";import{E}from"../chunks/C8zWwh96.js";const b=`#graphql
query($year: GraphQLStringOrFloat, $lang: String){
    edition: editions(filter: {year: {_eq: $year}}) {
        ${u}
    }
}`;async function q(e){return await c(async function(){var n;const a=(n=(await l.query(b,{lang:"de",year:e})).edition)==null?void 0:n[0],o=f((a==null?void 0:a.events)||[]);return{edition:{...a,events:o}}})}async function $({params:e}){try{return await q(e.year)}catch(t){return console.error(t),null}}const Q=Object.freeze(Object.defineProperty({__proto__:null,load:$},Symbol.toStringTag,{value:"Module"}));function k(e,t){var a;y(t,!0);const r=(a=t.data)==null?void 0:a.edition;v(e,{get data(){return t.data},children:(o,n)=>{var i=m(),s=g(i);_(s,()=>r,d=>{E(d,{data:r})}),p(o,i)},$$slots:{default:!0}}),h()}export{k as component,Q as universal};

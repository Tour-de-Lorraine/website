import{a as l,d as f}from"../chunks/ChwcRCr0.js";import{a as u,s as m}from"../chunks/DhMvmifX.js";import{c as p,a as g}from"../chunks/hdG8LYG1.js";import{p as y,f as h,a as _}from"../chunks/DxLzY48c.js";import{i as v}from"../chunks/DcoUKV6N.js";import{P as E}from"../chunks/BIbSjetq.js";import{E as q}from"../chunks/BDMIlFiv.js";const $=`#graphql
query($year: GraphQLStringOrFloat, $lang: String){
    edition: editions(filter: {year: {_eq: $year}}) {
        ${u}
    }
}`;async function b(e){return await l(async function(){var n;const a=(n=(await f.query($,{lang:"de",year:e})).edition)==null?void 0:n[0],o=m((a==null?void 0:a.events)||[]);return{edition:{...a,events:o}}})}async function P({params:e}){try{return await b(e.year)}catch(t){return console.error(t),null}}const k=Object.freeze(Object.defineProperty({__proto__:null,load:P},Symbol.toStringTag,{value:"Module"}));function x(e,t){var a;y(t,!0);const r=(a=t.data)==null?void 0:a.edition;E(e,{get data(){return t.data},children:(o,n)=>{var s=p(),d=h(s);{var c=i=>{q(i,{get data(){return r}})};v(d,i=>{r&&i(c)})}g(o,s)},$$slots:{default:!0}}),_()}export{x as component,k as universal};

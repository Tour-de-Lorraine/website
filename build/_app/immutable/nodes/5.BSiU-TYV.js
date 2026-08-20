import{a as c,d as l}from"../chunks/translations.DCGVWq8T.js";import{a as u,s as f}from"../chunks/sortEvents.D9CVdOFU.js";import{c as m,b as p}from"../chunks/disclose-version.2OAjqBHp.js";import{t as y,M as g,x as h}from"../chunks/runtime.DXFM950S.js";import{i as _}from"../chunks/if.B0gD0YUf.js";import{P as v}from"../chunks/PageSections.SspGakVz.js";import{E}from"../chunks/Edition.CDfwaqC1.js";const b=`#graphql
query($year: GraphQLStringOrFloat, $lang: String){
    edition: editions(filter: {year: {_eq: $year}}) {
        ${u}
    }
}`;async function q(e){return await c(async function(){var n;const a=(n=(await l.query(b,{lang:"de",year:e})).edition)==null?void 0:n[0],o=f((a==null?void 0:a.events)||[]);return{edition:{...a,events:o}}})}async function $({params:e}){try{return await q(e.year)}catch(t){return console.error(t),null}}const G=Object.freeze(Object.defineProperty({__proto__:null,load:$},Symbol.toStringTag,{value:"Module"}));function M(e,t){var a;y(t,!0);const r=(a=t.data)==null?void 0:a.edition;v(e,{get data(){return t.data},children:(o,n)=>{var i=m(),s=g(i);_(s,()=>r,d=>{E(d,{data:r})}),p(o,i)},$$slots:{default:!0}}),h()}export{M as component,G as universal};

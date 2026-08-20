import{a as e,d as a}from"./QUmjvB7P.js";import{c as n}from"./xuTD3LP9.js";const r="filter: {translations: {slug: {_eq: $slug}}}",s=`#graphql
query($slug: String, $lang: String){
    event: events(${r}) {
        ${n}
    }
}`;async function u(t){return await e(async function(){return await a.query(s,{lang:"de",slug:t})})}export{u as f};

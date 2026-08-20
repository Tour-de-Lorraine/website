import{a as e,d as a}from"./translations.DCGVWq8T.js";import{c as n}from"./PageSections.SspGakVz.js";const r="filter: {translations: {slug: {_eq: $slug}}}",s=`#graphql
query($slug: String, $lang: String){
    event: events(${r}) {
        ${n}
    }
}`;async function u(t){return await e(async function(){return await a.query(s,{lang:"de",slug:t})})}export{u as f};

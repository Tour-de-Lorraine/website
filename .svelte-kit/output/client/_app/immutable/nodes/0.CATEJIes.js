import{t as P,a as W,d as B,h as G,s as x}from"../chunks/ChwcRCr0.js";import{a as u,f as m}from"../chunks/hdG8LYG1.js";import{o as S}from"../chunks/BRfSnfG9.js";import{p as C,a as F,n as N,aP as O,at as A,f as Q,t as w,c as T,r as z,s as f}from"../chunks/DxLzY48c.js";import{s as D,a as H}from"../chunks/BfPyFkIi.js";import{i as E}from"../chunks/DcoUKV6N.js";import{i as J,p as K}from"../chunks/D2WcWwHk.js";const R=`
id,
isActive: is_active
inMainNavigation: in_main_navigation
metaTranslations: meta_translations(${P}) {
    title
}
sections {
    item {
        ...on pages_sections__basic {
            isMenuItem: is_menu_item
            translations {
                slug
                title
            }
        }
    }
}`,U=`
themeColor1: theme_color_1
themeColor2: theme_color_2
displayTicketing: display_ticketlink
ticketingLink: ticketing_link
footerLinks: footer_links {
    translations(${P}) {
        label
        url
    } 
}`,V=`#graphql
query($lang: String){
    navigation: pages(sort: "order") {
        ${R}
    }
    settings {
        ${U}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;async function X(){return await W(async function(){return await B.query(V,{lang:"de"})})}async function Y(){try{return await X()}catch(n){return console.error(n),null}}const dt=Object.freeze(Object.defineProperty({__proto__:null,load:Y},Symbol.toStringTag,{value:"Module"}));function Z(n,t){C(t,!1),S(()=>{const o=s=>{document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)},l=()=>window.innerWidth-document.body.clientWidth;let r;const e=()=>{const s=l();o(s),r=setTimeout(()=>{window.addEventListener("resize",e,{once:!0})},500)};return e(),()=>{clearTimeout(r),window.removeEventListener("resize",e)}}),J(),F()}var $=m('<link rel="icon" href="/assets/favicons/favicon.ico"/> <link rel="icon" href="/assets/favicons/favicon-16x16.png" sizes="16x16"/> <link rel="icon" href="/assets/favicons/favicon-32x32.png" sizes="32x32"/> <link rel="icon" href="/assets/favicons/favicon-180x180.png" sizes="180x180"/> <link rel="icon" href="/assets/favicons/favicon-192x192.png" sizes="192x192"/> <link rel="icon" href="/assets/favicons/favicon-512x512.png" sizes="512x512"/> <link rel="apple-touch-icon" href="/favicon/favicon-180x180.png"/>',1);function tt(n){G("1ijesjd",t=>{var o=$();N(12),u(t,o)})}var et=m('<a target="_blank"><img src="/assets/images/tdl_tickets.png" class="floating-tickets" alt="Tickets"/></a>'),it=m('<div><!></div> <div class="SITE"><!></div> <!> <!>',1);function ft(n,t){C(t,!0);const o=()=>H(K,"$page",l),[l,r]=D(),{settings:e={},navigation:s={},currentEdition:L=null}=(t==null?void 0:t.data)||{},v=t==null?void 0:t.children;O("site",{navigation:s,settings:e,currentEdition:L}),A(()=>{var a,_,y,p;(_=(a=o())==null?void 0:a.url)!=null&&_.hash||((p=(y=document.getElementById("scroll"))==null?void 0:y.style)==null||p.setProperty("scroll-behavior","auto"),window.scrollTo({top:0}));let i=setTimeout(()=>{var k,b;(b=(k=document.getElementById("scroll"))==null?void 0:k.style)==null||b.setProperty("scroll-behavior","smooth")},500);return()=>{clearTimeout(i)}}),S(()=>{const{themeColor1:i,themeColor2:a}=e;document.body.style.setProperty("--color-theme-1",i),document.body.style.setProperty("--color-theme-2",a)});var h=it(),d=Q(h),j=T(d);{var q=i=>{var a=et();w(()=>x(a,"href",(e==null?void 0:e.ticketingLink)||"#")),u(i,a)};E(j,i=>{e!=null&&e.displayTicketing&&i(q)})}z(d);var c=f(d,2),I=T(c);{var M=i=>{v(i)};E(I,i=>{v&&i(M)})}z(c);var g=f(c,2);Z(g,{}),f(g,2),tt(),w(()=>x(c,"data-route",o().params.page)),u(n,h),F(),r()}export{ft as component,dt as universal};

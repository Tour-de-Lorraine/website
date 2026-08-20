import{t as S,a as I,d as M,s as x}from"../chunks/translations.DCGVWq8T.js";import{b as m,t as f}from"../chunks/disclose-version.2OAjqBHp.js";import{t as L,x as P,L as G,aq as W,u as j,M as B,G as w,I as u,J as T,K as z}from"../chunks/runtime.DXFM950S.js";import{i as E}from"../chunks/if.B0gD0YUf.js";import{i as N,s as O,a as A,p as J}from"../chunks/stores.Gyvbv5UC.js";import{o as q}from"../chunks/index-client.DsNkMVdX.js";import{g as K}from"../chunks/utils.eU39CwJM.js";const Q=`
id,
isActive: is_active
inMainNavigation: in_main_navigation
metaTranslations: meta_translations(${S}) {
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
}`,D=`
themeColor1: theme_color_1
themeColor2: theme_color_2
displayTicketing: display_ticketing
ticketingLink: ticketing_link
footerLinks: footer_links {
    translations(${S}) {
        label
        url
    } 
}`,H=`#graphql
query($lang: String){
    navigation: pages(sort: "order") {
        ${Q}
    }
    settings {
        ${D}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;async function R(){return await I(async function(){return await M.query(H,{lang:"de"})})}async function U(){try{return await R()}catch(i){return console.error(i),null}}const rt=Object.freeze(Object.defineProperty({__proto__:null,load:U},Symbol.toStringTag,{value:"Module"}));function V(i,t){L(t,!1),q(()=>{const a=r=>{document.documentElement.style.setProperty("--scrollbar-width",`${r}px`)},c=()=>window.innerWidth-document.body.clientWidth;let e;const s=()=>{const r=c();a(r),e=setTimeout(()=>{window.addEventListener("resize",s,{once:!0})},500)};return s(),()=>{clearTimeout(e),window.removeEventListener("resize",s)}}),N(),P()}var X=f('<link rel="icon" href="/assets/favicons/favicon.ico"> <link rel="icon" href="/assets/favicons/favicon-16x16.png" sizes="16x16"> <link rel="icon" href="/assets/favicons/favicon-32x32.png" sizes="32x32"> <link rel="icon" href="/assets/favicons/favicon-180x180.png" sizes="180x180"> <link rel="icon" href="/assets/favicons/favicon-192x192.png" sizes="192x192"> <link rel="icon" href="/assets/favicons/favicon-512x512.png" sizes="512x512"> <link rel="apple-touch-icon" href="/favicon/favicon-180x180.png">',1);function Y(i){K(t=>{var a=X();G(12),m(t,a)})}var Z=f('<a target="_blank"><img src="/assets/images/tdl_tickets.png" class="floating-tickets" alt="Tickets"></a>'),$=f('<div><!></div> <div class="SITE"><!></div> <!> <!>',1);function ct(i,t){L(t,!0);const a=O(),c=()=>A(J,"$page",a),{settings:e={},navigation:s={},currentEdition:r=null}=(t==null?void 0:t.data)||{},v=t==null?void 0:t.children;W("site",{navigation:s,settings:e,currentEdition:r}),j(()=>{var o,_,y,p;(_=(o=c())==null?void 0:o.url)!=null&&_.hash||((p=(y=document.getElementById("scroll"))==null?void 0:y.style)==null||p.setProperty("scroll-behavior","auto"),window.scrollTo({top:0}));let n=setTimeout(()=>{var k,b;(b=(k=document.getElementById("scroll"))==null?void 0:k.style)==null||b.setProperty("scroll-behavior","smooth")},500);return()=>{clearTimeout(n)}}),q(()=>{const{themeColor1:n,themeColor2:o}=e;document.body.style.setProperty("--color-theme-1",n),document.body.style.setProperty("--color-theme-2",o)});var g=$(),d=B(g),C=T(d);E(C,()=>e==null?void 0:e.displayTicketing,n=>{var o=Z();w(()=>x(o,"href",(e==null?void 0:e.ticketingLink)||"#")),m(n,o)}),z(d);var l=u(d,2),F=T(l);E(F,()=>v,n=>{v(n)}),z(l);var h=u(l,2);V(h,{}),u(h,2),Y(),w(()=>x(l,"data-route",c().params.page)),m(i,g),P()}export{ct as component,rt as universal};

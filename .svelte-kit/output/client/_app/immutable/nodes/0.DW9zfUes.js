import{t as S,a as q,d as M,s as x}from"../chunks/QUmjvB7P.js";import{b as m,t as f}from"../chunks/DDJZBS6B.js";import{p as L,u as P,L as G,ao as O,D as W,O as j,G as w,J as T,K as z,I as u}from"../chunks/6M0omE6E.js";import{i as E}from"../chunks/CcL1oHS0.js";import{i as B,s as N,a as A,p as D}from"../chunks/Cryz591v.js";import{o as C}from"../chunks/DLIo2lIt.js";import{c as J}from"../chunks/CN3DVnmc.js";const K=`
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
}`,Q=`
themeColor1: theme_color_1
themeColor2: theme_color_2
displayTicketing: display_ticketlink
ticketingLink: ticketing_link
footerLinks: footer_links {
    translations(${S}) {
        label
        url
    } 
}`,H=`#graphql
query($lang: String){
    navigation: pages(sort: "order") {
        ${K}
    }
    settings {
        ${Q}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;async function R(){return await q(async function(){return await M.query(H,{lang:"de"})})}async function U(){try{return await R()}catch(i){return console.error(i),null}}const rt=Object.freeze(Object.defineProperty({__proto__:null,load:U},Symbol.toStringTag,{value:"Module"}));function V(i,t){L(t,!1),C(()=>{const a=r=>{document.documentElement.style.setProperty("--scrollbar-width",`${r}px`)},c=()=>window.innerWidth-document.body.clientWidth;let e;const s=()=>{const r=c();a(r),e=setTimeout(()=>{window.addEventListener("resize",s,{once:!0})},500)};return s(),()=>{clearTimeout(e),window.removeEventListener("resize",s)}}),B(),P()}var X=f('<link rel="icon" href="/assets/favicons/favicon.ico"> <link rel="icon" href="/assets/favicons/favicon-16x16.png" sizes="16x16"> <link rel="icon" href="/assets/favicons/favicon-32x32.png" sizes="32x32"> <link rel="icon" href="/assets/favicons/favicon-180x180.png" sizes="180x180"> <link rel="icon" href="/assets/favicons/favicon-192x192.png" sizes="192x192"> <link rel="icon" href="/assets/favicons/favicon-512x512.png" sizes="512x512"> <link rel="apple-touch-icon" href="/favicon/favicon-180x180.png">',1);function Y(i){J(t=>{var a=X();G(12),m(t,a)})}var Z=f('<a target="_blank"><img src="/assets/images/tdl_tickets.png" class="floating-tickets" alt="Tickets"></a>'),$=f('<div><!></div> <div class="SITE"><!></div> <!> <!>',1);function ct(i,t){L(t,!0);const a=N(),c=()=>A(D,"$page",a),{settings:e={},navigation:s={},currentEdition:r=null}=(t==null?void 0:t.data)||{},v=t==null?void 0:t.children;O("site",{navigation:s,settings:e,currentEdition:r}),W(()=>{var o,_,y,p;(_=(o=c())==null?void 0:o.url)!=null&&_.hash||((p=(y=document.getElementById("scroll"))==null?void 0:y.style)==null||p.setProperty("scroll-behavior","auto"),window.scrollTo({top:0}));let n=setTimeout(()=>{var k,b;(b=(k=document.getElementById("scroll"))==null?void 0:k.style)==null||b.setProperty("scroll-behavior","smooth")},500);return()=>{clearTimeout(n)}}),C(()=>{const{themeColor1:n,themeColor2:o}=e;document.body.style.setProperty("--color-theme-1",n),document.body.style.setProperty("--color-theme-2",o)});var h=$(),d=j(h),F=T(d);E(F,()=>e==null?void 0:e.displayTicketing,n=>{var o=Z();w(()=>x(o,"href",(e==null?void 0:e.ticketingLink)||"#")),m(n,o)}),z(d);var l=u(d,2),I=T(l);E(I,()=>v,n=>{v(n)}),z(l);var g=u(l,2);V(g,{}),u(g,2),Y(),w(()=>x(l,"data-route",c().params.page)),m(i,h),P()}export{ct as component,rt as universal};

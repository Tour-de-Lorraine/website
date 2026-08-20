import{t as c,a as n,d as a}from"./translations.DCGVWq8T.js";import{l as g,d as u,g as p}from"./PageSections.SspGakVz.js";import{a as y,s as _,b as f}from"./sortEvents.D9CVdOFU.js";const h=`#graphql
query($page_id: ID!, $lang: String){
    page: pages_by_id(id: $page_id) {
        id
        type
        isActive: is_active
        metaTranslations: meta_translations(${c}) {
            title
            description
        }
        hero {
            ${g}
        }
	}
}`,m=`#graphql
query($lang: String) {
    currentEdition: current_edition {
        edition {
            id,
            ${y}
        }
    }
}`;async function $(){return await n(async function(){const t=(await a.query(m,{lang:"de"})).currentEdition.edition,i=_((t==null?void 0:t.events)||[]);return{currentEdition:{...t,events:i}}})}const q=`#graphql
translations(${c}) {
    title
    formatedText: formated_text
    slug
}
images {
    eleImagesId: ele_images_id {
        ${u}
    }
}
details {
    item {
        ${p}
    }
}
isMenuItem: is_menu_item`,v=`
collection
item {
    ... on pages_sections__basic {
        ${q}
    }
}`,w="filter: {pages_id: {id: {_eq: $page_id}}}",S=`#graphql
query($page_id: String, $lang: String){
    sections: pages_sections(sort: "order", ${w}) {
    	${v}
	},
}`;async function E(e=""){return await n(async function(){return await a.query(S,{page_id:e,lang:"de"})})}const F=`#graphql
query($page_id: ID!, $lang: String){
    additionalContent: pages_by_id(id: $page_id) {
        translations: archive_translations {
            formatedText: formated_text
        }
    }
    editions(sort: "-year") {
        ${f}
    }
    currentEdition: current_edition {
        edition {
            year
        }
    }
}`;async function C(e){return await n(async function(){var o;const t=await a.query(F,{lang:"de",page_id:e}),i=t.additionalContent,d=t.editions,r=((o=t==null?void 0:t.currentEdition)==null?void 0:o.edition)||null;return{archived:r?t.editions.filter(l=>l.year<r.year):d,additionalContent:i}})}async function A(e=""){return await n(async function(){const{page:t}=await a.query(h,{page_id:e,lang:"de"});if(!t||!t.type)throw`Can not fetch Page "${e}".`;const i=t.type==="sections"?await E(e):t.type==="edition"?await $():t.type==="archive"?await C(e):{};return{...t,...i}})}export{A as f};

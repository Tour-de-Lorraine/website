import{d as D,f as v,g as A,j as $}from"./xuTD3LP9.js";import{t as F}from"./QUmjvB7P.js";const P=`
image {
    ${D}
}
video {
    id
    ${v}
}
useVideo: use_video`,S=`
year
translations(${F}) {
    title
}
visual {
    ${P}
}
details(sort: "order") {
    item {
        ${A}
    }
}
useOtherProgramSource: use_other_program_source
otherProgramSourceType: other_program_source_type
otherProgramUrl: other_program__url
otherProgramPdf: other_program__pdf {
    type
    id
}`,B=`
${S}
events {
    ${$}
}`;function E(t){const o=j(t),e={},s={},n={},r={};for(let i=0;i<o.length;i++){const a=o[i],c=_(a,"attributes");f(a,c,e);const u=_(a,"categories");f(a,u,s);const{dates:d,locations:l}=p(a);f(a,d,n),f(a,l,r)}return{all:o,byDate:n,byCategory:s,byLocation:r,byAttribute:e}}function _(t,o){var s;if(!(o in t))throw`Property "${o}" does not exist in event`;return(s=t[o])==null?void 0:s.map(n=>{var r,i;return(i=(r=n==null?void 0:n.junction)==null?void 0:r.translations)==null?void 0:i[0].name}).filter(n=>typeof n=="string")}function p(t){var e;return(e=t.issues)==null?void 0:e.reduce((s,{dateStart:n,dateEnd:r,location:i})=>(n&&s.dates.push(...w(n,r)),i&&s.locations.push(i),s),{dates:[],locations:[]})}function w(t,o){if(!o)return[t];const e=[t],s=new Date(o),n=new Date(t);for(;n<s;){n.setDate(n.getDate()+1);const r=n.toISOString().split("T")[0];e.push(r)}return e}function f(t,o,e){o.forEach(s=>{s in e?e[s].push(t.id):e[s]=[t.id]})}function j(t){return t.sort((e,s)=>{var c,u,d,l,g,m,h,y;const n=new Date((u=(c=e.issues)==null?void 0:c[0])==null?void 0:u.dateStart),r=new Date((l=(d=s.issues)==null?void 0:d[0])==null?void 0:l.dateStart),i=b((m=(g=e.issues)==null?void 0:g[0])==null?void 0:m.timeStart),a=b((y=(h=s.issues)==null?void 0:h[0])==null?void 0:y.timeStart);return n-r||i-a})}function b(t){if(typeof t!="string")return 0;const[o,e]=t.split(":");return(o||0)*60+(e||0)}export{B as a,S as b,E as s};

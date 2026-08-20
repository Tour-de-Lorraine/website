import { d as ensure_array_like, e as escape_html, c as attr } from "../../../chunks/root.js";
import { P as Page, a as PageSections, h as html, D as DetailsList, b as Picture, _ } from "../../../chunks/PageSections.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const data = props.data;
    const archived = data?.archived || [];
    const translations = data?.additionalContent?.translations?.[0] || {};
    Page($$renderer2, {
      data,
      children: ($$renderer3) => {
        PageSections($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<section><div class="content svelte-1xgwc2h" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1"><header><h3>Archiv</h3></header></div> <div class="column _2">${html(translations?.formatedText || "")}</div></div></section> <ul class="ARCHIVE svelte-1xgwc2h"><!--[-->`);
            const each_array = ensure_array_like(archived);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let programLink = function($$renderer5) {
                const {
                  useOtherProgramSource,
                  otherProgramSourceType,
                  otherProgramUrl,
                  otherProgramPdf
                } = program;
                const href = useOtherProgramSource && otherProgramSourceType === "pdf" ? otherProgramPdf : useOtherProgramSource && otherProgramSourceType === "url" ? otherProgramUrl : `/archiv/${year}`;
                const label = !useOtherProgramSource ? "Programm" : otherProgramSourceType === "pdf" || otherProgramSourceType === "url" && otherProgramUrl.endsWith("pdf") ? "Programm Pdf" : "Webseite";
                $$renderer5.push(`<a${attr("href", href)}><div class="label">${escape_html(label)}</div> `);
                _($$renderer5, { name: "arrow" });
                $$renderer5.push(`<!----></a>`);
              };
              let { translations: translations2, year, details, visual, ...program } = each_array[$$index];
              const { title } = translations2?.[0] || "";
              $$renderer4.push(`<li class="EDITION"><div class="content svelte-1xgwc2h" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1 svelte-1xgwc2h"><header class="svelte-1xgwc2h"><h3>${escape_html(year)}</h3> <h4 data-text="h3 guillemets">${escape_html(title)}</h4></header> <div class="_details">`);
              {
                let childrenAfter = function($$renderer5) {
                  programLink($$renderer5);
                };
                DetailsList($$renderer4, {
                  data: details,
                  childrenAfter
                });
              }
              $$renderer4.push(`<!----></div></div> <div class="column _2 svelte-1xgwc2h"><div class="_visual svelte-1xgwc2h">TTT: ${escape_html(visual)} `);
              if (visual?.image) {
                $$renderer4.push("<!--[0-->");
                $$renderer4.push(`KKKkkk `);
                Picture($$renderer4, { data: visual?.image });
                $$renderer4.push(`<!---->`);
              } else {
                $$renderer4.push("<!--[-1-->");
              }
              $$renderer4.push(`<!--]--></div></div></div></li>`);
            }
            $$renderer4.push(`<!--]--></ul>`);
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
  });
}
export {
  _page as default
};

import { p as pop, a as push, d as ensure_array_like, e as escape_html, c as attr } from "../../../chunks/index2.js";
import { P as Page, a as PageSections, h as html, D as DetailsList, b as Picture, _ } from "../../../chunks/PageSections.js";
function _page($$payload, $$props) {
  push();
  const props = $$props;
  const data = props.data;
  const archived = data?.archived || [];
  const translations = data?.additionalContent?.translations?.[0] || {};
  Page($$payload, {
    data,
    children: ($$payload2) => {
      PageSections($$payload2, {
        children: ($$payload3) => {
          const each_array = ensure_array_like(archived);
          $$payload3.out += `<section><div class="content svelte-14ezwto" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1"><header><h3>Archiv</h3></header></div> <div class="column _2">${html(translations?.formatedText || "")}</div></div></section> <ul class="ARCHIVE svelte-14ezwto"><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let programLink = function($$payload4) {
              const {
                useOtherProgramSource,
                otherProgramSourceType,
                otherProgramUrl,
                otherProgramPdf
              } = program;
              const href = useOtherProgramSource && otherProgramSourceType === "pdf" ? otherProgramPdf : useOtherProgramSource && otherProgramSourceType === "url" ? otherProgramUrl : `/archiv/${year}`;
              const label = !useOtherProgramSource ? "Programm" : otherProgramSourceType === "pdf" || otherProgramSourceType === "url" && otherProgramUrl.endsWith("pdf") ? "Programm Pdf" : "Webseite";
              $$payload4.out += `<a${attr("href", href)}><div class="label">${escape_html(label)}</div> `;
              _($$payload4, { name: "arrow" });
              $$payload4.out += `<!----></a>`;
            };
            const {
              translations: translations2,
              year,
              details,
              visual,
              ...program
            } = each_array[$$index];
            const { title } = translations2?.[0] || "";
            $$payload3.out += `<li class="EDITION"><div class="content svelte-14ezwto" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1 svelte-14ezwto"><header class="svelte-14ezwto"><h3>${escape_html(year)}</h3> <h4 data-text="h3 guillemets">${escape_html(title)}</h4></header> <div class="_details">`;
            {
              let childrenAfter = function($$payload4) {
                programLink($$payload4);
              };
              DetailsList($$payload3, { data: details, childrenAfter });
            }
            $$payload3.out += `<!----></div></div> <div class="column _2 svelte-14ezwto"><div class="_visual svelte-14ezwto">TTT: ${escape_html(visual)} `;
            if (visual?.image) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `KKKkkk `;
              Picture($$payload3, { data: visual?.image });
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></div></div></div></li>`;
          }
          $$payload3.out += `<!--]--></ul>`;
        }
      });
    }
  });
  pop();
}
export {
  _page as default
};

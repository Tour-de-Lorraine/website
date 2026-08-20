import { p as pop, a as push, e as escape_html } from "../../../../../chunks/index2.js";
import { P as Page, a as PageSections, D as DetailsList, F as FormatedText } from "../../../../../chunks/PageSections.js";
import { E as EventIssues, a as EventCategories, b as EventAttributes } from "../../../../../chunks/EventCategories.js";
function _page($$payload, $$props) {
  push();
  const { data } = $$props;
  const {
    details,
    issues,
    images,
    videos,
    attributes,
    categories
  } = data;
  const { title, description } = data.translations[0];
  Page($$payload, {
    data,
    children: ($$payload2) => {
      PageSections($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<article class="_event svelte-1sb5x9d" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1"><header class="svelte-1sb5x9d"><h2>${escape_html(title)}</h2> `;
          EventIssues($$payload3, { data: issues });
          $$payload3.out += `<!----> `;
          EventCategories($$payload3, { data: categories });
          $$payload3.out += `<!----> `;
          EventAttributes($$payload3, { data: attributes });
          $$payload3.out += `<!----></header> `;
          DetailsList($$payload3, { data: details });
          $$payload3.out += `<!----></div> <div class="column _2">`;
          FormatedText($$payload3, { data: description });
          $$payload3.out += `<!----></div></article>`;
        }
      });
    }
  });
  pop();
}
export {
  _page as default
};

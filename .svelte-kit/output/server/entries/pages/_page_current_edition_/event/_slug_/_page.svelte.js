import { e as escape_html } from "../../../../../chunks/root.js";
import "clsx";
import { P as Page, a as PageSections, D as DetailsList, F as FormatedText } from "../../../../../chunks/PageSections.js";
import { E as EventIssues, a as EventCategories, b as EventAttributes } from "../../../../../chunks/EventCategories.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    const { details, issues, images, videos, attributes, categories } = data;
    const { title, description } = data.translations[0];
    Page($$renderer2, {
      data,
      children: ($$renderer3) => {
        PageSections($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<article class="_event svelte-1xvm578" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1"><header class="svelte-1xvm578"><h2>${escape_html(title)}</h2> `);
            EventIssues($$renderer4, { data: issues });
            $$renderer4.push(`<!----> `);
            EventCategories($$renderer4, { data: categories });
            $$renderer4.push(`<!----> `);
            EventAttributes($$renderer4, { data: attributes });
            $$renderer4.push(`<!----></header> `);
            DetailsList($$renderer4, { data: details });
            $$renderer4.push(`<!----></div> <div class="column _2">`);
            FormatedText($$renderer4, { data: description });
            $$renderer4.push(`<!----></div></article>`);
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

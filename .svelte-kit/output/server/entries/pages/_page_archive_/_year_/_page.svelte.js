import "clsx";
import { P as Page } from "../../../../chunks/PageSections.js";
import { E as Edition } from "../../../../chunks/Edition.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    const edition = data?.edition;
    Page($$renderer2, {
      data,
      children: ($$renderer3) => {
        if (edition) {
          $$renderer3.push("<!--[0-->");
          Edition($$renderer3, { data: edition });
        } else {
          $$renderer3.push("<!--[-1-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
  });
}
export {
  _page as default
};

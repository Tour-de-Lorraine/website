import { p as pop, a as push } from "../../../../chunks/index2.js";
import { P as Page } from "../../../../chunks/PageSections.js";
import { E as Edition } from "../../../../chunks/Edition.js";
function _page($$payload, $$props) {
  push();
  const { data } = $$props;
  const edition = data?.edition;
  Page($$payload, {
    data,
    children: ($$payload2) => {
      if (edition) {
        $$payload2.out += "<!--[-->";
        Edition($$payload2, { data: edition });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  pop();
}
export {
  _page as default
};

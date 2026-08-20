import { p as pop, a as push } from "../../../chunks/index2.js";
import { P as Page } from "../../../chunks/PageSections.js";
import { E as Edition } from "../../../chunks/Edition.js";
function _page($$payload, $$props) {
  push();
  const props = $$props;
  const data = props.data;
  const currentEdition = data?.currentEdition;
  Page($$payload, {
    data,
    children: ($$payload2) => {
      if (currentEdition) {
        $$payload2.out += "<!--[-->";
        Edition($$payload2, {
          data: currentEdition,
          "data-is-current-edition": true
        });
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

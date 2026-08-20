import { p as pop, a as push } from "../../../chunks/index2.js";
import { P as Page, a as PageSections } from "../../../chunks/PageSections.js";
function _page($$payload, $$props) {
  push();
  const props = $$props;
  const data = props.data;
  Page($$payload, {
    data,
    children: ($$payload2) => {
      PageSections($$payload2, { data: data?.sections || [] });
    }
  });
  pop();
}
export {
  _page as default
};

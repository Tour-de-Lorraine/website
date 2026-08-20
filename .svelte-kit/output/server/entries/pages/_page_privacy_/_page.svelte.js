import "clsx";
import { P as Page, a as PageSections } from "../../../chunks/PageSections.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const data = props.data;
    Page($$renderer2, {
      data,
      children: ($$renderer3) => {
        PageSections($$renderer3, { data: data?.sections || [] });
      },
      $$slots: { default: true }
    });
  });
}
export {
  _page as default
};

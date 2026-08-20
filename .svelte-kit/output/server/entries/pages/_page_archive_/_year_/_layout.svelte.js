import { p as pop, a as push } from "../../../../chunks/index2.js";
function _layout($$payload, $$props) {
  push();
  const { children } = $$props;
  $$payload.out += `<div class="banner _archive svelte-1nyplgu"><div class="_inner">Archiv</div></div> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};

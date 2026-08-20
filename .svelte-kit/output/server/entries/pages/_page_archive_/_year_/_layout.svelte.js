import "clsx";
function _layout($$renderer, $$props) {
  const { children } = $$props;
  $$renderer.push(`<div class="banner _archive svelte-1rhejr8"><div class="_inner">Archiv</div></div> `);
  if (children) {
    $$renderer.push("<!--[0-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
}
export {
  _layout as default
};

import { a as push, c as attr, p as pop, f as stringify } from "../../../chunks/index2.js";
import { P as Page, H as Hero, a as PageSections } from "../../../chunks/PageSections.js";
function Animation($$payload, $$props) {
  push();
  const { SourceIn, SourceOut } = $$props;
  let isReady = false;
  let showAnimation = "";
  function Video($$payload2, name, Source, setPlayer) {
    $$payload2.out += `<video${attr("class", `_animation _${stringify(name)} svelte-wc91il`)} muted playsinline>`;
    if (Source) {
      $$payload2.out += "<!--[-->";
      Source($$payload2);
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></video>`;
  }
  $$payload.out += `<figure class="_ANIMATION svelte-wc91il"${attr("data-show-animation", showAnimation)}${attr("data-is-ready", isReady)}>`;
  if (SourceIn) {
    $$payload.out += "<!--[-->";
    Video($$payload, "in", SourceIn);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (SourceOut) {
    $$payload.out += "<!--[-->";
    Video($$payload, "out", SourceOut);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></figure>`;
  pop();
}
function _($$payload) {
  $$payload.out += `<div class="TDL-VISUAL svelte-b3k5it"><div class="if :wide svelte-b3k5it">`;
  {
    let SourceIn = function($$payload2) {
      $$payload2.out += `<source src="/assets/tdlVisual/videos/visual-wide-sw-1.mp4">`;
    }, SourceOut = function($$payload2) {
      $$payload2.out += `<source src="/assets/tdlVisual/videos/visual-wide-sw-2.mp4">`;
    };
    Animation($$payload, { SourceIn, SourceOut });
  }
  $$payload.out += `<!----></div> <div class="if :tall svelte-b3k5it">`;
  {
    let SourceIn = function($$payload2) {
      $$payload2.out += `<source src="/assets/tdlVisual/videos/visual-tall-sw-1.mp4">`;
    }, SourceOut = function($$payload2) {
      $$payload2.out += `<source src="/assets/tdlVisual/videos/visual-tall-sw-2.mp4">`;
    };
    Animation($$payload, { SourceIn, SourceOut });
  }
  $$payload.out += `<!----></div></div>`;
}
function _page($$payload, $$props) {
  push();
  const props = $$props;
  const data = props.data;
  Page($$payload, {
    data,
    children: ($$payload2) => {
      Hero($$payload2, {
        "data-use-background": "true",
        "data-is-fullwidth": "true",
        children: ($$payload3) => {
          _($$payload3);
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      PageSections($$payload2, { data: data?.sections || [] });
      $$payload2.out += `<!---->`;
    }
  });
  pop();
}
export {
  _page as default
};

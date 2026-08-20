import "clsx";
import { P as Page, H as Hero, a as PageSections } from "../../../chunks/PageSections.js";
import { c as attr, f as attr_class, g as stringify } from "../../../chunks/root.js";
function Animation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { SourceIn, SourceOut } = $$props;
    let isReady = false;
    let showAnimation = "";
    function Video($$renderer3, name, Source, setPlayer) {
      $$renderer3.push(`<video${attr_class(`_animation _${stringify(name)}`, "svelte-s4cl27")} muted="" playsinline="">`);
      if (Source) {
        $$renderer3.push("<!--[0-->");
        Source($$renderer3);
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></video>`);
    }
    $$renderer2.push(`<figure class="_ANIMATION svelte-s4cl27"${attr("data-show-animation", showAnimation)}${attr("data-is-ready", isReady)}>`);
    if (SourceIn) {
      $$renderer2.push("<!--[0-->");
      Video($$renderer2, "in", SourceIn);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (SourceOut) {
      $$renderer2.push("<!--[0-->");
      Video($$renderer2, "out", SourceOut);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></figure>`);
  });
}
function _($$renderer) {
  $$renderer.push(`<div class="TDL-VISUAL svelte-k70kqy"><div class="if :wide svelte-k70kqy">`);
  {
    let SourceIn = function($$renderer2) {
      $$renderer2.push(`<source src="/assets/tdlVisual/videos/visual-wide-sw-1.mp4"/>`);
    }, SourceOut = function($$renderer2) {
      $$renderer2.push(`<source src="/assets/tdlVisual/videos/visual-wide-sw-2.mp4"/>`);
    };
    Animation($$renderer, {
      SourceIn,
      SourceOut
    });
  }
  $$renderer.push(`<!----></div> <div class="if :tall svelte-k70kqy">`);
  {
    let SourceIn = function($$renderer2) {
      $$renderer2.push(`<source src="/assets/tdlVisual/videos/visual-tall-sw-1.mp4"/>`);
    }, SourceOut = function($$renderer2) {
      $$renderer2.push(`<source src="/assets/tdlVisual/videos/visual-tall-sw-2.mp4"/>`);
    };
    Animation($$renderer, {
      SourceIn,
      SourceOut
    });
  }
  $$renderer.push(`<!----></div></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const data = props.data;
    Page($$renderer2, {
      data,
      children: ($$renderer3) => {
        Hero($$renderer3, {
          "data-use-background": "true",
          "data-is-fullwidth": "true",
          children: ($$renderer4) => {
            _($$renderer4);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        PageSections($$renderer3, { data: data?.sections || [] });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
  });
}
export {
  _page as default
};

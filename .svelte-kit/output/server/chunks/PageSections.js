import { m as getContext, d as ensure_array_like, c as attr, g as stringify, e as escape_html, s as store_get, u as unsubscribe_stores, o as attr_style, k as attributes, f as attr_class, a as setContext, h as head } from "./root.js";
import { w as writable } from "./index.js";
import { p as page } from "./stores.js";
import { d as definitions } from "./routes.js";
import "clsx";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const site = getContext("site");
    const footerLinks = site?.settings?.footerLinks.map((link) => link?.translations?.[0]).filter((link) => link?.label?.length && link?.url?.length);
    $$renderer2.push(`<footer class="svelte-7lfk2o"><nav class="svelte-7lfk2o"><!--[-->`);
    const each_array = ensure_array_like(footerLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { label, url } = each_array[$$index];
      $$renderer2.push(`<a${attr("href", url)}${attr("title", `${!url.startsWith("/") ? "Externer " : ""}Link zu ${stringify(label)}`)} class="svelte-7lfk2o">${escape_html(label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav></footer>`);
  });
}
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const site = getContext("site");
    const { navigation = [], currentEdition } = site;
    let { isVisible = false } = $$props;
    $$renderer2.push(`<nav class="PAGE-NAVIGATION svelte-1mok3ed"${attr("data-is-visible", isVisible)}><ul class="_navItems svelte-1mok3ed"><!--[-->`);
    const each_array = ensure_array_like(navigation);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let navItem = each_array[$$index_1];
      if (navItem.isActive && navItem.inMainNavigation && definitions[navItem.id]) {
        $$renderer2.push("<!--[0-->");
        const route = definitions[navItem.id];
        const routeTranslations = route.translations;
        const pageTranslations = navItem?.metaTranslations?.[0];
        const pageSlug = routeTranslations.de;
        const sections = navItem.sections.filter((navItem2) => navItem2?.item?.isMenuItem);
        $$renderer2.push(`<li${attr("data-id", navItem.id)}${attr("data-is-current", store_get($$store_subs ??= {}, "$page", page).params.page === pageSlug)} class="svelte-1mok3ed"><a${attr("href", `/${stringify(pageSlug)}`)} data-as="link-2" class="svelte-1mok3ed">${escape_html(pageTranslations?.title)}
						${escape_html(navItem.id === "current_edition" ? currentEdition?.edition?.year || "" : "")}</a> `);
        if (sections.length) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<ul class="_navSubItems svelte-1mok3ed"><!--[-->`);
          const each_array_1 = ensure_array_like(sections);
          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
            let subItem = each_array_1[$$index];
            const translations = subItem?.item?.translations?.[0] || {};
            const sectionTitle = translations?.title;
            const sectionSlug = translations?.slug;
            $$renderer2.push(`<li class="svelte-1mok3ed"><a${attr("href", `/${stringify(pageSlug)}/#${stringify(sectionSlug)}`)} data-as="link-2" class="svelte-1mok3ed">${escape_html(sectionTitle)}</a></li>`);
          }
          $$renderer2.push(`<!--]--></ul>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></ul></nav>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Bubble($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isInflated = false } = $$props;
    $$renderer2.push(`<div class="BUBBLE _outer svelte-hmgokm"${attr("data-is-inflated", isInflated)}${attr_style("", { "--scrollbar-width": `${stringify(0)}px` })}><div class="_inner svelte-hmgokm"><div class="bubble _1 svelte-hmgokm" data-as="ellipse"></div> <div class="bubble _2 svelte-hmgokm" data-as="ellipse"></div></div></div>`);
  });
}
function IconArrow($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "320",
        height: "160",
        viewBox: "0 0 320 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><line x1="220" y1="80" x2="5" y2="80" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><polyline points="170 5 310 80 170 155" fill="none" fill-rule="evenodd" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline></svg>`);
  });
}
function IconMagnifier($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "34",
        height: "20",
        viewBox: "0 0 34 20",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><path d="M20.7656 14L33.6782 18.8747" stroke="black" stroke-miterlimit="10"></path><path d="M17.1407 9.12449C17.1407 11.3685 16.2368 13.3996 14.7777 14.8701C13.3169 16.339 11.2994 17.249 9.07034 17.249C4.6139 17.249 1 13.6108 1 9.12449C1 4.63815 4.6139 1 9.07034 1C13.5268 1 17.1407 4.63815 17.1407 9.12449Z" stroke="black" stroke-miterlimit="10"></path></svg>`);
  });
}
function IconMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { attributes: attributes$1 } = $$props;
    const menuIconState = getContext("menuIconState");
    $$renderer2.push(`<svg${attributes(
      {
        class: "ICON _menu",
        width: "320",
        height: "160",
        viewBox: "0 0 320 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "data-state": store_get($$store_subs ??= {}, "$menuIconState", menuIconState),
        ...attributes$1
      },
      "svelte-1xy4wmz",
      void 0,
      void 0,
      3
    )}><g class="if :burger svelte-1xy4wmz"><line x1="5" y1="20" x2="315" y2="20" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="315" y1="80" x2="5" y2="80" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="315" y1="140" x2="5" y2="140" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line></g><g class="if :cross svelte-1xy4wmz"><line x1="5" y1="20" x2="315" y2="140" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="5" y1="140" x2="315" y2="20" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line></g></svg>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function IconPeople($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "320",
        height: "160",
        viewBox: "0 0 320 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><path d="M160,5c41.977,0,81.362,8.134,110.901,22.904,14.085,7.042,25.089,15.18,32.708,24.186,7.559,8.935,11.391,18.326,11.391,27.91s-3.833,18.975-11.391,27.91c-7.619,9.006-18.623,17.144-32.708,24.186-29.539,14.77-68.924,22.904-110.901,22.904s-81.362-8.134-110.901-22.904c-14.085-7.042-25.089-15.18-32.708-24.186-7.559-8.935-11.391-18.326-11.391-27.91s3.833-18.975,11.391-27.91c7.619-9.006,18.623-17.144,32.708-24.186C78.638,13.134,118.023,5,160,5M160,0C71.634,0,0Z"></path><path d="M172.556,100.14c5.496-9.287,13.514-15.14,22.444-15.14,16.569,0,30,20.147,30,45" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></path><path d="M100,135c0-33.137,17.909-60,40-60s40,26.863,40,60" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></path><circle cx="195" cy="60" r="15" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle><circle cx="140" cy="45" r="20" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle></svg>`);
  });
}
function IconPlus($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "160",
        height: "160",
        viewBox: "80 0 160 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><line x1="85" y1="80" x2="235" y2="80" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="160" y1="155" x2="160" y2="5" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line></svg>`);
  });
}
function IconSpeechbubbles($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "320",
        height: "160",
        viewBox: "0 0 320 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><path d="M160,5c41.977,0,81.362,8.134,110.901,22.904,14.085,7.042,25.089,15.18,32.708,24.186,7.559,8.935,11.391,18.326,11.391,27.91s-3.833,18.975-11.391,27.91c-7.619,9.006-18.623,17.144-32.708,24.186-29.539,14.77-68.924,22.904-110.901,22.904s-81.362-8.134-110.901-22.904c-14.085-7.042-25.089-15.18-32.708-24.186-7.559-8.935-11.391-18.326-11.391-27.91s3.833-18.975,11.391-27.91c7.619-9.006,18.623-17.144,32.708-24.186C78.638,13.134,118.023,5,160,5M160,0C71.634,0,0Z"></path><path d="M179.782,47.748c7.674-1.767,16.154-2.748,25.069-2.748,34.518,0,62.495,14.701,62.495,32.84,0,12.69-13.704,23.702-33.774,29.162l-3.726,23.21-32.005-19.738c-25.362-1.485-46.146-10.945-53.049-23.504" fill="#fff" stroke="#000" stroke-width="5"></path><path d="M175.602,42.332c4.31,4.37,6.743,9.328,6.743,14.581,0,17.627-27.385,31.913-61.173,31.913-3.179,0-6.306-.123-9.357-.369l-36.97,16.331,7.5-25c-13.757-5.842-22.345-12.901-22.345-22.876,0-17.627,27.385-31.913,61.173-31.913,23.717,0,44.279,7.039,54.43,17.332Z" fill="none" stroke="#000" stroke-miterlimit="3" stroke-width="5"></path></svg>`);
  });
}
function IconWheelchair($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "320",
        height: "160",
        viewBox: "0 0 320 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><path d="M160,5c41.977,0,81.362,8.134,110.901,22.904,14.085,7.042,25.089,15.18,32.708,24.186,7.559,8.935,11.391,18.326,11.391,27.91s-3.833,18.975-11.391,27.91c-7.619,9.006-18.623,17.144-32.708,24.186-29.539,14.77-68.924,22.904-110.901,22.904s-81.362-8.134-110.901-22.904c-14.085-7.042-25.089-15.18-32.708-24.186-7.559-8.935-11.391-18.326-11.391-27.91s3.833-18.975,11.391-27.91c7.619-9.006,18.623-17.144,32.708-24.186C78.638,13.134,118.023,5,160,5M160,0C71.634,0,0Z"></path><circle cx="188.068" cy="35" r="10" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle><polyline points="173.068 105 193.068 105 203.068 135" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline><polyline points="156.012 82.057 183.068 55 153.068 55 138.068 70" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline><circle cx="145.568" cy="107.5" r="27.5" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle></svg>`);
  });
}
function IconX($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const attributes$1 = props?.attributes || {};
    $$renderer2.push(`<svg${attributes(
      {
        width: "320",
        height: "160",
        viewBox: "0 0 320 160",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...attributes$1
      },
      void 0,
      void 0,
      void 0,
      3
    )}><polyline points="85 5 160 80 85 155" fill="none" fill-rule="evenodd" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline><polyline points="235 155 160 80 235 5" fill="none" fill-rule="evenodd" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline></svg>`);
  });
}
function _$1($$renderer, $$props) {
  let { name, attributes: attributes2 = {} } = $$props;
  const icons = {
    arrow: IconArrow,
    magnifier: IconMagnifier,
    menu: IconMenu,
    people: IconPeople,
    plus: IconPlus,
    speechbubbles: IconSpeechbubbles,
    wheelchair: IconWheelchair,
    x: IconX
  };
  const Icon = icons?.[name];
  $$renderer.push(`<div${attr_class(`icon _${stringify(name)}`)}>`);
  if (Icon) {
    $$renderer.push("<!--[0-->");
    Icon($$renderer, { attributes: attributes2 });
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function _($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showNavigation = false;
    const menuIconState = writable("burger");
    setContext("menuIconState", menuIconState);
    $$renderer2.push(`<header class="PAGE-HEADER"${attr("data-show-navigation", showNavigation)}><a class="logo" href="/" title="Link zur Startseite" data-sveltekit-reload=""><div class="_full">TOUR DE LORRAINE</div> <div class="_short">TDL</div></a> <button class="_toggleNavigation">`);
    Bubble($$renderer2, { isInflated: showNavigation });
    $$renderer2.push(`<!----> <div class="_menuIcon">`);
    _$1($$renderer2, {
      name: "menu",
      attributes: { preserveAspectRatio: "none", "data-is-open": showNavigation }
    });
    $$renderer2.push(`<!----></div></button></header> `);
    Navigation($$renderer2, { isVisible: showNavigation });
    $$renderer2.push(`<!---->`);
  });
}
function Picture($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data, size = "normal" } = $$props;
    const { image } = data || {};
    const translations = data?.translations?.[0] || {};
    const { caption, altText } = translations;
    debugger;
    console.log("test:" + data + ":" + translations);
    const { focalPointX, focalPointY, height, width } = image || {};
    const aspectRatio = (width / height).toFixed(2);
    const calcObjectPosition = (focalPointX2, focalPointY2) => {
      if (typeof focalPointX2 !== "number" || typeof focalPointY2 !== "number") return "";
      return `${~~(focalPointX2 / width * 100)}% ${~~(focalPointY2 / height * 100)}%`;
    };
    const objectPosition = calcObjectPosition(focalPointX, focalPointY);
    const src = `/assets/${image?.id}`;
    function Sources($$renderer3, sizes = [], isDppx2 = false) {
      const sizesDesc = sizes.sort((a, b) => a.width - b.width);
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(sizesDesc);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let { directusKey, width: width2 } = each_array[i];
        const isFirst = i === 0;
        const isLast = i === sizesDesc.length - 1;
        const minWidth = isFirst ? "" : `(min-width: ${sizesDesc[i - 1].width + 1}px)`;
        const maxWidth = isLast ? "" : `(max-width: ${width2}px)`;
        const and = minWidth && maxWidth ? " and " : "";
        $$renderer3.push(`<source${attr("srcset", `${src}?key=${stringify(directusKey)}`)}${attr("media", `${isDppx2 ? "(-webkit-min-device-pixel-ratio: 1.5) and " : ""}${minWidth}${and}${maxWidth}`)}/>`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    $$renderer2.push(`<div>Test: ${escape_html(image)}</div> <figure class="PICTURE"${attr_style("", {
      "---aspect-ratio": aspectRatio,
      "---object-position": objectPosition
    })}><picture>`);
    if (size === "fullwidth") {
      $$renderer2.push("<!--[0-->");
      Sources(
        $$renderer2,
        [
          { directusKey: "fullwidth-vw-xl-2x", width: 1800 },
          { directusKey: "fullwidth-vw-l-2x", width: 1400 },
          { directusKey: "fullwidth-vw-m-2x", width: 1e3 },
          { directusKey: "fullwidth-vw-s-2x", width: 800 }
        ],
        true
      );
      $$renderer2.push(`<!----> `);
      Sources($$renderer2, [
        { directusKey: "fullwidth-vw-xl", width: 1800 },
        { directusKey: "fullwidth-vw-l", width: 1400 },
        { directusKey: "fullwidth-vw-m", width: 1e3 },
        { directusKey: "fullwidth-vw-s", width: 800 }
      ]);
      $$renderer2.push(`<!---->`);
    } else if (size === "normal") {
      $$renderer2.push("<!--[1-->");
      Sources(
        $$renderer2,
        [
          { directusKey: "vw-l-2x", width: 1e3 },
          { directusKey: "vw-m-2x", width: 850 },
          { directusKey: "vw-s-2x", width: 600 }
        ],
        true
      );
      $$renderer2.push(`<!----> `);
      Sources($$renderer2, [
        { directusKey: "vw-l", width: 1e3 },
        { directusKey: "vw-m", width: 850 },
        { directusKey: "vw-s", width: 600 }
      ]);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <img${attr("height", `${stringify(height)}px`)}${attr("width", `${stringify(width)}px`)}${attr("src", src)}${attr("alt", altText)}/></picture> <figcaption>${escape_html(caption && caption?.length ? caption : "")}</figcaption></figure>`);
  });
}
function Video($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data, attributes: attributes$1 = {} } = $$props;
    const video = data?.video?.translations?.[0] || {};
    const image = data?.image.image || {};
    const { title, caption, altText, videoLarge, videoMiddle, videoSmall } = video;
    const responsiveVideos = [];
    if (videoLarge !== null) responsiveVideos.push("l");
    if (videoMiddle !== null) responsiveVideos.push("m");
    if (videoSmall !== null) responsiveVideos.push("s");
    function vid($$renderer3, size, video2) {
      $$renderer3.push(`<video${attributes({
        "data-size": size,
        title,
        muted: true,
        autoplay: true,
        playsinline: true,
        "data-src": `/assets/${stringify(video2.id)}`,
        ...attributes$1,
        height: "1000",
        width: "1000"
      })}><source${attr("type", video2.type)}/> `);
      if (altText) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<p>${escape_html(altText)}</p>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></video>`);
    }
    $$renderer2.push(`<figure class="VIDEO"${attr("data-use-responsive", video.useResponsive)}${attr("data-responsive-videos", responsiveVideos.join(" "))}${attr("data-has-video", responsiveVideos.length > 0)} role="presentation"${attr("aria-label", altText)}>`);
    if (videoLarge) {
      $$renderer2.push("<!--[0-->");
      vid($$renderer2, "l", videoLarge);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (videoMiddle) {
      $$renderer2.push("<!--[0-->");
      vid($$renderer2, "m", videoMiddle);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (videoSmall) {
      $$renderer2.push("<!--[0-->");
      vid($$renderer2, "s", videoSmall);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <picture><img${attr("src", `/assets/${stringify(image.id)}`)}${attr("alt", altText)}/></picture> <figcaption>${escape_html(caption?.length ? caption : "")}</figcaption></figure>`);
  });
}
function Hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { children, data, $$slots, $$events, ...attributes$1 } = $$props;
    const gotData = typeof data === "object" && Array.isArray(data) === false && data !== null;
    const imageFromData = gotData && "image" in data;
    const videoFromData = gotData && data?.useVideo && "video" in data && data?.useVideo;
    $$renderer2.push(`<div${attributes(
      {
        class: "HERO",
        ...attributes$1,
        "data-has-video": videoFromData
      },
      "svelte-1cadjnr"
    )}><div class="_inner svelte-1cadjnr">`);
    if (videoFromData) {
      $$renderer2.push("<!--[0-->");
      Video($$renderer2, {
        data: { video: data.video, image: data?.image },
        attributes: { loop: true }
      });
    } else if (imageFromData) {
      $$renderer2.push("<!--[1-->");
      Picture($$renderer2, { data: data.image, size: "fullwidth" });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function Page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const children = props?.children;
    const data = props.data;
    const { title = "", description = "" } = data?.metaTranslations?.[0] || {};
    head("18r4hqc", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(title ? `${title} - ` : "")}Tour de Lorraine</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", description ? description : "Tour de Lorraine")}/>`);
    });
    _($$renderer2);
    $$renderer2.push(`<!----> <main class="PAGE-CONTENT">`);
    if (data?.hero) {
      $$renderer2.push("<!--[0-->");
      Hero($$renderer2, { data: data.hero, "data-is-fullwidth": "true" });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
function Drawer($$renderer, $$props) {
  const { title, content, icon, isOpen = false } = $$props;
  $$renderer.push(`<c-drawer class="DRAWER" data-lines="top bottom"${attr("is-open", isOpen)}><details><summary>`);
  if (title) {
    $$renderer.push("<!--[0-->");
    title($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if (icon) {
    $$renderer.push("<!--[0-->");
    _$1($$renderer, { name: "plus" });
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></summary> <div class="content">`);
  if (content) {
    $$renderer.push("<!--[0-->");
    content($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div></details></c-drawer>`);
}
function Images($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    $$renderer2.push(`<div class="IMAGES"><c-gallery${attr("mode", data.length > 1 ? "slideshow" : "singles")}><div class="content" slot="images"><!--[-->`);
    const each_array = ensure_array_like(data);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let eleImagesId = each_array[$$index];
      $$renderer2.push(`<!---->PPP${escape_html(eleImagesId)}:${escape_html(data[0])} `);
      Picture($$renderer2, { data: eleImagesId });
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--></div> <nav slot="navigation"><div class="_status"><span data-insert="currentIndex"></span>/<span data-insert="imageCount"></span></div> <button class="_next" title="Nächstes Bild"><div class="_inner">`);
    _$1($$renderer2, { name: "arrow" });
    $$renderer2.push(`<!----></div></button></nav></c-gallery></div>`);
  });
}
function FormatedText($$renderer, $$props) {
  const { data } = $$props;
  const headerRemap = { 1: "4", 2: "5", 3: "6", 4: "6", 5: "6", 6: "6" };
  function remapHeadings(html2 = "", mapping = {}) {
    const replacer = (chunk2, value) => {
      const newValue = mapping[value];
      if (newValue === void 0) throw `Map does not have a replacement for '${value}'}`;
      return chunk2.replace(value, newValue);
    };
    let done = "";
    let chunk = "";
    let checkIterations = 0;
    for (let i = 0; i < html2.length; i++) {
      const char = html2[i];
      if (char === "<") {
        done += chunk;
        chunk = "";
        checkIterations = 5;
      } else if (!checkIterations) {
        done += chunk + char;
        chunk = "";
        continue;
      }
      chunk += char;
      checkIterations--;
      if (chunk.length < 4) {
        continue;
      }
      const match = chunk.match(/<\/?h([1-6])>/);
      if (match) {
        const [_2, valueToReplace] = match;
        const newChunk = replacer(chunk, valueToReplace);
        done += newChunk;
        chunk = "";
        checkIterations = 0;
      } else if (i === html2.length - 1) {
        done += chunk;
      }
    }
    return done;
  }
  const text = typeof data === "string" ? remapHeadings(data, headerRemap) : "";
  $$renderer.push(`<div class="FORMATED-TEXT">${html(text)}</div>`);
}
function DetailsList($$renderer, $$props) {
  const { data, childrenBefore, childrenAfter } = $$props;
  $$renderer.push(`<div class="DETAILS-LIST">`);
  if (childrenBefore) {
    $$renderer.push("<!--[0-->");
    childrenBefore($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <!--[-->`);
  const each_array = ensure_array_like(data);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { item } = each_array[$$index];
    const translations = item?.translations?.[0] || {};
    if (item?.type === "ele_details__drawer") {
      $$renderer.push("<!--[0-->");
      {
        let title = function($$renderer2) {
          $$renderer2.push(`<div class="label">${escape_html(translations?.title)}</div>`);
        }, content = function($$renderer2) {
          FormatedText($$renderer2, { data: translations?.formatedText || "" });
        };
        Drawer($$renderer, {
          icon: "cross",
          isOpen: item?.isOpen || false,
          title,
          content
        });
      }
    } else if (item?.type === "ele_details__media") {
      $$renderer.push("<!--[1-->");
      {
        let title = function($$renderer2) {
          $$renderer2.push(`<div class="label">${escape_html(translations?.title)}</div>`);
        }, content = function($$renderer2) {
          Images($$renderer2, { data: item?.images || [] });
        };
        Drawer($$renderer, {
          icon: "cross",
          title,
          content
        });
      }
    } else if (item?.type === "ele_details__link") {
      $$renderer.push("<!--[2-->");
      $$renderer.push(`<a${attr("href", translations?.url)}${attr("title", `URL zu ${stringify(translations.label)} in neuem Tab öffnen.`)} referrerpolicy="noreferrer" target="_blank"><div class="label">${escape_html(translations.label)}</div> `);
      _$1($$renderer, { name: "arrow" });
      $$renderer.push(`<!----></a>`);
    } else if (item?.type === "ele_details__pdf") {
      $$renderer.push("<!--[3-->");
      const pdf = item?.pdf?.translations?.[0] || {};
      $$renderer.push(`<a${attr("href", `/assets/${stringify(pdf?.file?.id)}`)}${attr("title", `'${stringify(pdf?.title)}' PDF-Datei in neuem Tab öffnen.`)} target="_blank"><div class="label">${escape_html(pdf?.title)}</div> `);
      _$1($$renderer, { name: "arrow" });
      $$renderer.push(`<!----></a>`);
    } else {
      $$renderer.push("<!--[-1-->");
      $$renderer.push(`<div>Type "${escape_html(item?.type)}" does not exsit.</div>`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--> `);
  if (childrenAfter) {
    $$renderer.push("<!--[0-->");
    childrenAfter($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function Anchor($$renderer, $$props) {
  const { id } = $$props;
  $$renderer.push(`<div class="ANCHOR"><div${attr(
    "id",
    // const id_slugified = id
    // 	.toLowerCase()
    // 	.replaceAll(/[^a-z1-9äöü\-_]/g, '')
    // 	.replaceAll(/\d/g, '-')
    // 	.replaceAll('ä', 'ae')
    // 	.replaceAll('ö', 'oe')
    // 	.replaceAll('ü', 'ue');
    id
  )}></div></div>`);
}
function PageSectionBasic($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    const { title, formatedText, slug } = data?.translations?.[0] || {};
    const { details, images } = data;
    $$renderer2.push(`<section class="PAGE-SECTION">`);
    Anchor($$renderer2, { id: slug });
    $$renderer2.push(`<!----> <div class="layout" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1 svelte-142m9m3"><header>`);
    if (title) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<h2 class="title">${escape_html(title)}</h2>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> `);
    if (details?.length) {
      $$renderer2.push("<!--[0-->");
      DetailsList($$renderer2, { data: details });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="column _2 svelte-142m9m3">`);
    FormatedText($$renderer2, { data: formatedText });
    $$renderer2.push(`<!----> <div class="_images svelte-142m9m3">`);
    Images($$renderer2, { data: images });
    $$renderer2.push(`<!----></div></div></div></section>`);
  });
}
function PageSections($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { $$slots, $$events, ...props } = $$props;
    const children = props?.children;
    const data = props?.data || [];
    $$renderer2.push(`<div class="PAGE-SECTIONS svelte-10nm5cc">`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array = ensure_array_like(data);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let section = each_array[$$index];
      PageSectionBasic($$renderer2, { data: section.item });
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  Anchor as A,
  DetailsList as D,
  FormatedText as F,
  Hero as H,
  Page as P,
  Video as V,
  _$1 as _,
  PageSections as a,
  Picture as b,
  html as h
};

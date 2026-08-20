import { v as getContext, d as ensure_array_like, c as attr, f as stringify, e as escape_html, p as pop, a as push, s as store_get, u as unsubscribe_stores, w as add_styles, i as spread_attributes, b as setContext, h as head } from "./index2.js";
import { p as page } from "./stores.js";
import { d as definitions } from "./routes.js";
import { w as writable } from "./index.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Footer($$payload, $$props) {
  push();
  const site = getContext("site");
  const footerLinks = site?.settings?.footerLinks.map((link) => link?.translations?.[0]).filter((link) => link?.label?.length && link?.url?.length);
  const each_array = ensure_array_like(footerLinks);
  $$payload.out += `<footer class="svelte-1ce95js"><nav class="svelte-1ce95js"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const { label, url } = each_array[$$index];
    $$payload.out += `<a${attr("href", url)}${attr("title", `${stringify(!url.startsWith("/") ? "Externer " : "")}Link zu ${stringify(label)}`)} class="svelte-1ce95js">${escape_html(label)}</a>`;
  }
  $$payload.out += `<!--]--></nav></footer>`;
  pop();
}
function Navigation($$payload, $$props) {
  push();
  var $$store_subs;
  const site = getContext("site");
  const { navigation = [], currentEdition } = site;
  let { isVisible = false } = $$props;
  const each_array = ensure_array_like(navigation);
  $$payload.out += `<nav class="PAGE-NAVIGATION svelte-1i9i1w4"${attr("data-is-visible", isVisible)}><ul class="_navItems svelte-1i9i1w4"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    const navItem = each_array[$$index_1];
    if (navItem.isActive && navItem.inMainNavigation && definitions[navItem.id]) {
      $$payload.out += "<!--[-->";
      const route = definitions[navItem.id];
      const routeTranslations = route.translations;
      const pageTranslations = navItem?.metaTranslations?.[0];
      const pageSlug = routeTranslations.de;
      const sections = navItem.sections.filter((navItem2) => navItem2?.item?.isMenuItem);
      $$payload.out += `<li${attr("data-id", navItem.id)}${attr("data-is-current", store_get($$store_subs ??= {}, "$page", page).params.page === pageSlug)} class="svelte-1i9i1w4"><a${attr("href", `/${stringify(pageSlug)}`)} data-as="link-2" class="svelte-1i9i1w4">${escape_html(pageTranslations?.title)}
						${escape_html(navItem.id === "current_edition" ? currentEdition?.edition?.year || "" : "")}</a> `;
      if (sections.length) {
        $$payload.out += "<!--[-->";
        const each_array_1 = ensure_array_like(sections);
        $$payload.out += `<ul class="_navSubItems svelte-1i9i1w4"><!--[-->`;
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          const subItem = each_array_1[$$index];
          const translations = subItem?.item?.translations?.[0] || {};
          const sectionTitle = translations?.title;
          const sectionSlug = translations?.slug;
          $$payload.out += `<li class="svelte-1i9i1w4"><a${attr("href", `/${stringify(pageSlug)}/#${stringify(sectionSlug)}`)} data-as="link-2" class="svelte-1i9i1w4">${escape_html(sectionTitle)}</a></li>`;
        }
        $$payload.out += `<!--]--></ul>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></li>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></ul></nav>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Bubble($$payload, $$props) {
  push();
  let { isInflated = false } = $$props;
  $$payload.out += `<div${add_styles({
    "--scrollbar-width": `${stringify(0)}px`
  })} class="BUBBLE _outer svelte-1ldl8d2"${attr("data-is-inflated", isInflated)}><div class="_inner svelte-1ldl8d2"><div class="bubble _1 svelte-1ldl8d2" data-as="ellipse"></div> <div class="bubble _2 svelte-1ldl8d2" data-as="ellipse"></div></div></div>`;
  pop();
}
function IconArrow($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "320",
      height: "160",
      viewBox: "0 0 320 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><line x1="220" y1="80" x2="5" y2="80" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><polyline points="170 5 310 80 170 155" fill="none" fill-rule="evenodd" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline></svg>`;
  pop();
}
function IconMagnifier($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "34",
      height: "20",
      viewBox: "0 0 34 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><path d="M20.7656 14L33.6782 18.8747" stroke="black" stroke-miterlimit="10"></path><path d="M17.1407 9.12449C17.1407 11.3685 16.2368 13.3996 14.7777 14.8701C13.3169 16.339 11.2994 17.249 9.07034 17.249C4.6139 17.249 1 13.6108 1 9.12449C1 4.63815 4.6139 1 9.07034 1C13.5268 1 17.1407 4.63815 17.1407 9.12449Z" stroke="black" stroke-miterlimit="10"></path></svg>`;
  pop();
}
function IconMenu($$payload, $$props) {
  push();
  var $$store_subs;
  let { attributes } = $$props;
  const menuIconState = getContext("menuIconState");
  $$payload.out += `<svg${spread_attributes(
    {
      class: "ICON _menu",
      width: "320",
      height: "160",
      viewBox: "0 0 320 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "data-state": store_get($$store_subs ??= {}, "$menuIconState", menuIconState),
      ...attributes
    },
    { "svelte-1emw6m8": true },
    void 0,
    3
  )}><g class="if :burger svelte-1emw6m8"><line x1="5" y1="20" x2="315" y2="20" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="315" y1="80" x2="5" y2="80" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="315" y1="140" x2="5" y2="140" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line></g><g class="if :cross svelte-1emw6m8"><line x1="5" y1="20" x2="315" y2="140" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="5" y1="140" x2="315" y2="20" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line></g></svg>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function IconPeople($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "320",
      height: "160",
      viewBox: "0 0 320 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><path d="M160,5c41.977,0,81.362,8.134,110.901,22.904,14.085,7.042,25.089,15.18,32.708,24.186,7.559,8.935,11.391,18.326,11.391,27.91s-3.833,18.975-11.391,27.91c-7.619,9.006-18.623,17.144-32.708,24.186-29.539,14.77-68.924,22.904-110.901,22.904s-81.362-8.134-110.901-22.904c-14.085-7.042-25.089-15.18-32.708-24.186-7.559-8.935-11.391-18.326-11.391-27.91s3.833-18.975,11.391-27.91c7.619-9.006,18.623-17.144,32.708-24.186C78.638,13.134,118.023,5,160,5M160,0C71.634,0,0Z"></path><path d="M172.556,100.14c5.496-9.287,13.514-15.14,22.444-15.14,16.569,0,30,20.147,30,45" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></path><path d="M100,135c0-33.137,17.909-60,40-60s40,26.863,40,60" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></path><circle cx="195" cy="60" r="15" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle><circle cx="140" cy="45" r="20" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle></svg>`;
  pop();
}
function IconPlus($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "160",
      height: "160",
      viewBox: "80 0 160 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><line x1="85" y1="80" x2="235" y2="80" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line><line x1="160" y1="155" x2="160" y2="5" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></line></svg>`;
  pop();
}
function IconSpeechbubbles($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "320",
      height: "160",
      viewBox: "0 0 320 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><path d="M160,5c41.977,0,81.362,8.134,110.901,22.904,14.085,7.042,25.089,15.18,32.708,24.186,7.559,8.935,11.391,18.326,11.391,27.91s-3.833,18.975-11.391,27.91c-7.619,9.006-18.623,17.144-32.708,24.186-29.539,14.77-68.924,22.904-110.901,22.904s-81.362-8.134-110.901-22.904c-14.085-7.042-25.089-15.18-32.708-24.186-7.559-8.935-11.391-18.326-11.391-27.91s3.833-18.975,11.391-27.91c7.619-9.006,18.623-17.144,32.708-24.186C78.638,13.134,118.023,5,160,5M160,0C71.634,0,0Z"></path><path d="M179.782,47.748c7.674-1.767,16.154-2.748,25.069-2.748,34.518,0,62.495,14.701,62.495,32.84,0,12.69-13.704,23.702-33.774,29.162l-3.726,23.21-32.005-19.738c-25.362-1.485-46.146-10.945-53.049-23.504" fill="#fff" stroke="#000" stroke-width="5"></path><path d="M175.602,42.332c4.31,4.37,6.743,9.328,6.743,14.581,0,17.627-27.385,31.913-61.173,31.913-3.179,0-6.306-.123-9.357-.369l-36.97,16.331,7.5-25c-13.757-5.842-22.345-12.901-22.345-22.876,0-17.627,27.385-31.913,61.173-31.913,23.717,0,44.279,7.039,54.43,17.332Z" fill="none" stroke="#000" stroke-miterlimit="3" stroke-width="5"></path></svg>`;
  pop();
}
function IconWheelchair($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "320",
      height: "160",
      viewBox: "0 0 320 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><path d="M160,5c41.977,0,81.362,8.134,110.901,22.904,14.085,7.042,25.089,15.18,32.708,24.186,7.559,8.935,11.391,18.326,11.391,27.91s-3.833,18.975-11.391,27.91c-7.619,9.006-18.623,17.144-32.708,24.186-29.539,14.77-68.924,22.904-110.901,22.904s-81.362-8.134-110.901-22.904c-14.085-7.042-25.089-15.18-32.708-24.186-7.559-8.935-11.391-18.326-11.391-27.91s3.833-18.975,11.391-27.91c7.619-9.006,18.623-17.144,32.708-24.186C78.638,13.134,118.023,5,160,5M160,0C71.634,0,0Z"></path><circle cx="188.068" cy="35" r="10" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle><polyline points="173.068 105 193.068 105 203.068 135" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline><polyline points="156.012 82.057 183.068 55 153.068 55 138.068 70" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline><circle cx="145.568" cy="107.5" r="27.5" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="5"></circle></svg>`;
  pop();
}
function IconX($$payload, $$props) {
  push();
  const props = $$props;
  const attributes = props?.attributes || {};
  $$payload.out += `<svg${spread_attributes(
    {
      width: "320",
      height: "160",
      viewBox: "0 0 320 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...attributes
    },
    void 0,
    void 0,
    3
  )}><polyline points="85 5 160 80 85 155" fill="none" fill-rule="evenodd" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline><polyline points="235 155 160 80 235 5" fill="none" fill-rule="evenodd" stroke="#000" stroke-miterlimit="10" stroke-width="5"></polyline></svg>`;
  pop();
}
function _$1($$payload, $$props) {
  let { name, attributes = {} } = $$props;
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
  $$payload.out += `<div${attr("class", `icon _${stringify(name)}`)}>`;
  if (Icon) {
    $$payload.out += "<!--[-->";
    Icon($$payload, { attributes });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
}
function _($$payload, $$props) {
  push();
  let showNavigation = false;
  const menuIconState = writable("burger");
  setContext("menuIconState", menuIconState);
  $$payload.out += `<header class="PAGE-HEADER"${attr("data-show-navigation", showNavigation)}><a class="logo" href="/" title="Link zur Startseite" data-sveltekit-reload=""><div class="_full">TOUR DE LORRAINE</div> <div class="_short">TDL</div></a> <button class="_toggleNavigation">`;
  Bubble($$payload, { isInflated: showNavigation });
  $$payload.out += `<!----> <div class="_menuIcon">`;
  _$1($$payload, {
    name: "menu",
    attributes: {
      preserveAspectRatio: "none",
      "data-is-open": showNavigation
    }
  });
  $$payload.out += `<!----></div></button></header> `;
  Navigation($$payload, { isVisible: showNavigation });
  $$payload.out += `<!---->`;
  pop();
}
function Picture($$payload, $$props) {
  push();
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
  function Sources($$payload2, sizes = [], isDppx2 = false) {
    const sizesDesc = sizes.sort((a, b) => a.width - b.width);
    const each_array = ensure_array_like(sizesDesc);
    $$payload2.out += `<!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      const { directusKey, width: width2 } = each_array[i];
      const isFirst = i === 0;
      const isLast = i === sizesDesc.length - 1;
      const minWidth = isFirst ? "" : `(min-width: ${sizesDesc[i - 1].width + 1}px)`;
      const maxWidth = isLast ? "" : `(max-width: ${width2}px)`;
      const and = minWidth && maxWidth ? " and " : "";
      $$payload2.out += `<source${attr("srcset", `${stringify(src)}?key=${stringify(directusKey)}`)}${attr("media", `${stringify(isDppx2 ? "(-webkit-min-device-pixel-ratio: 1.5) and " : "")}${stringify(minWidth)}${stringify(and)}${stringify(maxWidth)}`)}>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  $$payload.out += `<div>Test: ${escape_html(image)}</div> <figure${add_styles({
    "---aspect-ratio": aspectRatio,
    "---object-position": objectPosition
  })} class="PICTURE"><picture>`;
  if (size === "fullwidth") {
    $$payload.out += "<!--[-->";
    Sources(
      $$payload,
      [
        {
          directusKey: "fullwidth-vw-xl-2x",
          width: 1800
        },
        { directusKey: "fullwidth-vw-l-2x", width: 1400 },
        { directusKey: "fullwidth-vw-m-2x", width: 1e3 },
        { directusKey: "fullwidth-vw-s-2x", width: 800 }
      ],
      true
    );
    $$payload.out += `<!----> `;
    Sources($$payload, [
      { directusKey: "fullwidth-vw-xl", width: 1800 },
      { directusKey: "fullwidth-vw-l", width: 1400 },
      { directusKey: "fullwidth-vw-m", width: 1e3 },
      { directusKey: "fullwidth-vw-s", width: 800 }
    ]);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    if (size === "normal") {
      $$payload.out += "<!--[-->";
      Sources(
        $$payload,
        [
          { directusKey: "vw-l-2x", width: 1e3 },
          { directusKey: "vw-m-2x", width: 850 },
          { directusKey: "vw-s-2x", width: 600 }
        ],
        true
      );
      $$payload.out += `<!----> `;
      Sources($$payload, [
        { directusKey: "vw-l", width: 1e3 },
        { directusKey: "vw-m", width: 850 },
        { directusKey: "vw-s", width: 600 }
      ]);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> <img${attr("height", `${stringify(height)}px`)}${attr("width", `${stringify(width)}px`)}${attr("src", src)}${attr("alt", altText)}></picture> <figcaption>${escape_html(caption && caption?.length ? caption : "")}</figcaption></figure>`;
  pop();
}
function Video($$payload, $$props) {
  push();
  const { data, attributes = {} } = $$props;
  const video = data?.video?.translations?.[0] || {};
  const image = data?.image.image || {};
  const {
    title,
    caption,
    altText,
    videoLarge,
    videoMiddle,
    videoSmall
  } = video;
  const responsiveVideos = [];
  if (videoLarge !== null) responsiveVideos.push("l");
  if (videoMiddle !== null) responsiveVideos.push("m");
  if (videoSmall !== null) responsiveVideos.push("s");
  function vid($$payload2, size, video2) {
    $$payload2.out += `<video${spread_attributes(
      {
        "data-size": size,
        title,
        muted: true,
        autoplay: true,
        playsinline: true,
        "data-src": `/assets/${stringify(video2.id)}`,
        ...attributes,
        height: "1000",
        width: "1000"
      },
      { "svelte-m2iopf": true }
    )}><source${attr("type", video2.type)}> `;
    if (altText) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<p>${escape_html(altText)}</p>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></video>`;
  }
  $$payload.out += `<figure class="VIDEO"${attr("data-use-responsive", video.useResponsive)}${attr("data-responsive-videos", responsiveVideos.join(" "))}${attr("data-has-video", responsiveVideos.length > 0)} role="presentation"${attr("aria-label", altText)}>`;
  if (videoLarge) {
    $$payload.out += "<!--[-->";
    vid($$payload, "l", videoLarge);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (videoMiddle) {
    $$payload.out += "<!--[-->";
    vid($$payload, "m", videoMiddle);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (videoSmall) {
    $$payload.out += "<!--[-->";
    vid($$payload, "s", videoSmall);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <picture><img${attr("src", `/assets/${stringify(image.id)}`)}${attr("alt", altText)}></picture> <figcaption>${escape_html(caption?.length ? caption : "")}</figcaption></figure>`;
  pop();
}
function Hero($$payload, $$props) {
  push();
  const { children, data, ...attributes } = $$props;
  const gotData = typeof data === "object" && Array.isArray(data) === false && data !== null;
  const imageFromData = gotData && "image" in data;
  const videoFromData = gotData && data?.useVideo && "video" in data && data?.useVideo;
  $$payload.out += `<div${spread_attributes(
    {
      class: "HERO",
      ...attributes,
      "data-has-video": videoFromData
    },
    { "svelte-1hweex2": true }
  )}><div class="_inner svelte-1hweex2">`;
  if (videoFromData) {
    $$payload.out += "<!--[-->";
    Video($$payload, {
      data: { video: data.video, image: data?.image },
      attributes: { loop: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    if (imageFromData) {
      $$payload.out += "<!--[-->";
      Picture($$payload, { data: data.image, size: "fullwidth" });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  pop();
}
function Page($$payload, $$props) {
  push();
  const props = $$props;
  const children = props?.children;
  const data = props.data;
  const { title = "", description = "" } = data?.metaTranslations?.[0] || {};
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(title ? `${title} - ` : "")}Tour de Lorraine</title>`;
    $$payload2.out += `<meta name="description"${attr("content", description ? description : "Tour de Lorraine")}>`;
  });
  _($$payload);
  $$payload.out += `<!----> <main class="PAGE-CONTENT">`;
  if (data?.hero) {
    $$payload.out += "<!--[-->";
    Hero($$payload, { data: data.hero, "data-is-fullwidth": "true" });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></main> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Drawer($$payload, $$props) {
  push();
  const { title, content, icon, isOpen = false } = $$props;
  $$payload.out += `<c-drawer class="DRAWER" data-lines="top bottom"${attr("is-open", isOpen)}><details><summary>`;
  if (title) {
    $$payload.out += "<!--[-->";
    title($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (icon) {
    $$payload.out += "<!--[-->";
    _$1($$payload, { name: "plus" });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></summary> <div class="content">`;
  if (content) {
    $$payload.out += "<!--[-->";
    content($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></details></c-drawer>`;
  pop();
}
function Images($$payload, $$props) {
  push();
  const { data } = $$props;
  const each_array = ensure_array_like(data);
  $$payload.out += `<div class="IMAGES"><c-gallery${attr("mode", data.length > 1 ? "slideshow" : "singles")}><div class="content" slot="images"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const eleImagesId = each_array[$$index];
    $$payload.out += `<!---->PPP${escape_html(eleImagesId)}:${escape_html(data[0])} `;
    Picture($$payload, { data: eleImagesId });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div> <nav slot="navigation"><div class="_status"><span data-insert="currentIndex"></span>/<span data-insert="imageCount"></span></div> <button class="_next" title="Nächstes Bild"><div class="_inner">`;
  _$1($$payload, { name: "arrow" });
  $$payload.out += `<!----></div></button></nav></c-gallery></div>`;
  pop();
}
function FormatedText($$payload, $$props) {
  const { data } = $$props;
  const headerRemap = {
    1: "4",
    2: "5",
    3: "6",
    4: "6",
    5: "6",
    6: "6"
  };
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
  $$payload.out += `<div class="FORMATED-TEXT">${html(text)}</div>`;
}
function DetailsList($$payload, $$props) {
  push();
  const { data, childrenBefore, childrenAfter } = $$props;
  const each_array = ensure_array_like(data);
  $$payload.out += `<div class="DETAILS-LIST">`;
  if (childrenBefore) {
    $$payload.out += "<!--[-->";
    childrenBefore($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const { item } = each_array[$$index];
    const translations = item?.translations?.[0] || {};
    if (item?.type === "ele_details__drawer") {
      $$payload.out += "<!--[-->";
      {
        let title = function($$payload2) {
          $$payload2.out += `<div class="label">${escape_html(translations?.title)}</div>`;
        }, content = function($$payload2) {
          FormatedText($$payload2, { data: translations?.formatedText || "" });
        };
        Drawer($$payload, {
          icon: "cross",
          isOpen: item?.isOpen || false,
          title,
          content
        });
      }
    } else {
      $$payload.out += "<!--[!-->";
      if (item?.type === "ele_details__media") {
        $$payload.out += "<!--[-->";
        {
          let title = function($$payload2) {
            $$payload2.out += `<div class="label">${escape_html(translations?.title)}</div>`;
          }, content = function($$payload2) {
            Images($$payload2, { data: item?.images || [] });
          };
          Drawer($$payload, { icon: "cross", title, content });
        }
      } else {
        $$payload.out += "<!--[!-->";
        if (item?.type === "ele_details__link") {
          $$payload.out += "<!--[-->";
          $$payload.out += `<a${attr("href", translations?.url)}${attr("title", `URL zu ${stringify(translations.label)} in neuem Tab öffnen.`)} referrerpolicy="noreferrer" target="_blank"><div class="label">${escape_html(translations.label)}</div> `;
          _$1($$payload, { name: "arrow" });
          $$payload.out += `<!----></a>`;
        } else {
          $$payload.out += "<!--[!-->";
          if (item?.type === "ele_details__pdf") {
            $$payload.out += "<!--[-->";
            const pdf = item?.pdf?.translations?.[0] || {};
            $$payload.out += `<a${attr("href", `/assets/${stringify(pdf?.file?.id)}`)}${attr("title", `'${stringify(pdf?.title)}' PDF-Datei in neuem Tab öffnen.`)} target="_blank"><div class="label">${escape_html(pdf?.title)}</div> `;
            _$1($$payload, { name: "arrow" });
            $$payload.out += `<!----></a>`;
          } else {
            $$payload.out += "<!--[!-->";
            $$payload.out += `<div>Type "${escape_html(item?.type)}" does not exsit.</div>`;
          }
          $$payload.out += `<!--]-->`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--> `;
  if (childrenAfter) {
    $$payload.out += "<!--[-->";
    childrenAfter($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Anchor($$payload, $$props) {
  const { id } = $$props;
  $$payload.out += `<div class="ANCHOR"><div${attr("id", id)}></div></div>`;
}
function PageSectionBasic($$payload, $$props) {
  push();
  const { data } = $$props;
  const { title, formatedText, slug } = data?.translations?.[0] || {};
  const { details, images } = data;
  $$payload.out += `<section class="PAGE-SECTION">`;
  Anchor($$payload, { id: slug });
  $$payload.out += `<!----> <div class="layout" data-layout="1-1 rsp-1 sticky-col-1"><div class="column _1 svelte-k0phmj"><header>`;
  if (title) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h2 class="title">${escape_html(title)}</h2>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></header> `;
  if (details?.length) {
    $$payload.out += "<!--[-->";
    DetailsList($$payload, { data: details });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="column _2 svelte-k0phmj">`;
  FormatedText($$payload, { data: formatedText });
  $$payload.out += `<!----> <div class="_images svelte-k0phmj">`;
  Images($$payload, { data: images });
  $$payload.out += `<!----></div></div></div></section>`;
  pop();
}
function PageSections($$payload, $$props) {
  push();
  const props = $$props;
  const children = props?.children;
  const data = props?.data || [];
  const each_array = ensure_array_like(data);
  $$payload.out += `<div class="PAGE-SECTIONS svelte-1nuo60f">`;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const section = each_array[$$index];
    PageSectionBasic($$payload, { data: section.item });
  }
  $$payload.out += `<!--]--></div>`;
  pop();
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

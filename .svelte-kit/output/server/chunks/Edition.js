import { i as ssr_context, d as ensure_array_like, c as attr, e as escape_html, g as stringify, j as derived, k as attributes, s as store_get, u as unsubscribe_stores } from "./root.js";
import { _ as _$1, V as Video, b as Picture, H as Hero, D as DetailsList, a as PageSections, A as Anchor } from "./PageSections.js";
import { E as EventIssues, a as EventCategories, b as EventAttributes, f as formatDate } from "./EventCategories.js";
import { p as page } from "./stores.js";
import "clsx";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function List($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let eventBaseUrl = "";
    const unsubPage = page.subscribe(($page) => {
      if ($page?.url?.pathname?.startsWith("/archiv")) {
        eventBaseUrl = $page.url.pathname;
      } else {
        eventBaseUrl = "/programm";
      }
    });
    onDestroy(() => {
      unsubPage();
    });
    $$renderer2.push(`<ul class="EVENTS"><!---->`);
    {
      if (data.length) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<!--[-->`);
        const each_array = ensure_array_like(data);
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let event = each_array[i];
          const { title, slug } = event.translations[0];
          $$renderer2.push(`<li class="_event"${attr("id", `i-${stringify(i)}`)}><h3><a class="_toEvent"${attr("href", `${stringify(eventBaseUrl)}/event/${stringify(slug)}`)} data-as="link-2">${escape_html(title)}</a></h3> `);
          EventIssues($$renderer2, { data: event.issues });
          $$renderer2.push(`<!----> `);
          EventCategories($$renderer2, { data: event.categories });
          $$renderer2.push(`<!----> <div class="_bottom">`);
          EventAttributes($$renderer2, { data: event.attributes });
          $$renderer2.push(`<!----> <a class="_toEvent"${attr("href", `${stringify(eventBaseUrl)}/event/${stringify(slug)}`)} data-as="link-2"><div class="_semanticLabel">mehr Infos</div> `);
          _$1($$renderer2, { name: "arrow" });
          $$renderer2.push(`<!----></a> <div class="_visibleLabel">mehr Infos</div></div></li>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<li class="if :noEvents"><div class="if :isFiltered">Kein Event zu diesem Filter gefunden.</div> <div class="else">Keine Events.</div></li>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!----></ul>`);
  });
}
function Filter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data: events } = $$props;
    const filterDef = [
      { id: "byDate", group: "byDate", title: "Datum" },
      { id: "byCategory", group: "byCategory", title: "Typ" },
      { id: "byLocation", group: "byLocation", title: "Ort" },
      { id: "byAttribute", group: "byAttribute", title: "Sonstiges" }
    ];
    const spotlightCategories = [
      { group: "byCategory", id: "Soliparty", title: "Soliparty" },
      { group: "byCategory", id: "Workshoptag", title: "Workshoptag" }
    ];
    filterDef.reduce((acc, group) => ({ ...acc, [group.group]: /* @__PURE__ */ new Set() }), {});
    initialScores();
    function initialScores() {
      return events.all.reduce((acc, { id }) => ({ ...acc, [id]: 0 }), {});
    }
    let crntGroup = "";
    function mainSelector($$renderer3, selector, type) {
      $$renderer3.push(`<input${attr("id", `pg-${stringify(selector.id)}`)} class="_mainSelector svelte-1q4rplo" type="checkbox" name="mainSelector"${attr("data-type", type)}${attr("data-group", selector.group)}${attr("data-id", selector.id)}/> <label class="_mainSelector svelte-1q4rplo" data-as="ellipse"${attr("for", `pg-${stringify(selector.id)}`)}${attr("data-is-active", crntGroup === selector.id)}>${escape_html(selector.title)}</label>`);
    }
    $$renderer2.push(`<div class="FILTER svelte-1q4rplo"><input id="toggleFilter" class="_toggleFilter svelte-1q4rplo" type="checkbox"/> <label class="_toggleFilter svelte-1q4rplo" data-as="ellipse" for="toggleFilter">Filter</label> <form class="svelte-1q4rplo"><fieldset class="_mainSelectors svelte-1q4rplo"><!--[-->`);
    const each_array = ensure_array_like(filterDef);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let group = each_array[$$index];
      mainSelector($$renderer2, group, "toggleGroup");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array_1 = ensure_array_like(spotlightCategories);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let category = each_array_1[$$index_1];
      mainSelector($$renderer2, category, `toggleSpotlightCategory`);
    }
    $$renderer2.push(`<!--]--></fieldset> <div class="_subSelectorGroups svelte-1q4rplo"><!--[-->`);
    const each_array_2 = ensure_array_like(filterDef);
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let group = each_array_2[$$index_3];
      $$renderer2.push(`<ul${attr("data-group", group.group)} class="_subSelectorGroup svelte-1q4rplo"${attr("data-is-visible", crntGroup === group.group)}><li><input${attr("id", `p-${stringify(group.group)}-all`)} type="checkbox" class="_reset svelte-1q4rplo"${attr("data-group", group.group)}/> <label${attr("for", `p-${stringify(group.group)}-all`)} class="svelte-1q4rplo">Alle</label></li> <!--[-->`);
      const each_array_3 = ensure_array_like(Object.keys(events[group.group]));
      for (let i = 0, $$length2 = each_array_3.length; i < $$length2; i++) {
        let property = each_array_3[i];
        $$renderer2.push(`<li><input${attr("id", `p-${stringify(group.group)}-${stringify(i)}`)} class="subSelector svelte-1q4rplo" name="subSelector" type="checkbox" data-type="toggleProperty"${attr("data-group", group.group)}${attr("data-value", property)}${attr("data-id", property)}/> <label${attr("for", `p-${stringify(group.group)}-${stringify(i)}`)} class="svelte-1q4rplo">`);
        if (group.group === "byDate") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`${escape_html(formatDate(property))}`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`${escape_html(property)}`);
        }
        $$renderer2.push(`<!--]--></label></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div></form></div>`);
  });
}
function _($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    let isFiltered = false;
    const maybeFiltered = derived(() => {
      return data.all;
    });
    const hasEvents = data?.all?.length > 0;
    $$renderer2.push(`<div class="EVENTS-LIST svelte-m79igr"${attr("data-is-filtered", isFiltered)}${attr("data-has-events", hasEvents)}>`);
    if (hasEvents) {
      $$renderer2.push("<!--[0-->");
      Filter($$renderer2, { data });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    List($$renderer2, { data: maybeFiltered() });
    $$renderer2.push(`<!----></div>`);
  });
}
function VidualEdition($$renderer, $$props) {
  const { data } = $$props;
  const { image, useVideo } = data || {};
  $$renderer.push(`<div class="VISUAL svelte-2pu6fo"${attr("data-type", useVideo ? "video" : "image")}>`);
  if (useVideo) {
    $$renderer.push("<!--[0-->");
    Video($$renderer, { data });
  } else {
    $$renderer.push("<!--[-1-->");
    Picture($$renderer, { data: image });
  }
  $$renderer.push(`<!--]--></div>`);
}
function Edition($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const { data, $$slots, $$events, ...attributes$1 } = $$props;
    const details = data?.details?.map((detail) => {
      if (detail?.item?.type === "ele_details__drawer") {
        detail.item.isOpen = true;
      }
      return detail;
    });
    $$renderer2.push(`<div${attributes({ class: "EDITION", ...attributes$1 }, "svelte-13iwzsp")}>`);
    if (details && details.length) {
      $$renderer2.push("<!--[0-->");
      Hero($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<div data-layout="1-1 rsp-1"><div class="column _1">`);
          if (data?.visual) {
            $$renderer3.push("<!--[0-->");
            VidualEdition($$renderer3, { data: data?.visual });
          } else {
            $$renderer3.push("<!--[-1-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="column _2">`);
          {
            let childrenBefore = function($$renderer4) {
              $$renderer4.push(`<a class="_toEvents"${attr("href", `${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "" : store_get($$store_subs ??= {}, "$page", page).url.pathname)}/#events`)} title="Zum Programm scrollen"><div class="label">Programm ${escape_html(data?.year)}</div> `);
              _$1($$renderer4, { name: "arrow" });
              $$renderer4.push(`<!----></a>`);
            };
            DetailsList($$renderer3, {
              data: details,
              childrenBefore
            });
          }
          $$renderer3.push(`<!----></div></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      PageSections($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<section class="_events svelte-13iwzsp">`);
          Anchor($$renderer3, { id: "events" });
          $$renderer3.push(`<!----> <div class="_content svelte-13iwzsp">`);
          _($$renderer3, { data: data?.events });
          $$renderer3.push(`<!----></div></section>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  Edition as E
};

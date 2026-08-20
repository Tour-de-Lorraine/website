import { g as current_component, a as push, d as ensure_array_like, c as attr, f as stringify, e as escape_html, p as pop, i as spread_attributes, u as unsubscribe_stores, s as store_get } from "./index2.js";
import { _ as _$1, V as Video, b as Picture, H as Hero, D as DetailsList, a as PageSections, A as Anchor } from "./PageSections.js";
import { E as EventIssues, a as EventCategories, b as EventAttributes, f as formatDate } from "./EventCategories.js";
import { p as page } from "./stores.js";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function List($$payload, $$props) {
  push();
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
  $$payload.out += `<ul class="EVENTS"><!---->`;
  {
    if (data.length) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(data);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        const event = each_array[i];
        const { title, slug } = event.translations[0];
        $$payload.out += `<li class="_event"${attr("id", `i-${stringify(i)}`)}><h3><a class="_toEvent"${attr("href", `${stringify(eventBaseUrl)}/event/${stringify(slug)}`)} data-as="link-2">${escape_html(title)}</a></h3> `;
        EventIssues($$payload, { data: event.issues });
        $$payload.out += `<!----> `;
        EventCategories($$payload, { data: event.categories });
        $$payload.out += `<!----> <div class="_bottom">`;
        EventAttributes($$payload, { data: event.attributes });
        $$payload.out += `<!----> <a class="_toEvent"${attr("href", `${stringify(eventBaseUrl)}/event/${stringify(slug)}`)} data-as="link-2"><div class="_semanticLabel">mehr Infos</div> `;
        _$1($$payload, { name: "arrow" });
        $$payload.out += `<!----></a> <div class="_visibleLabel">mehr Infos</div></div></li>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<li class="if :noEvents"><div class="if :isFiltered">Kein Event zu diesem Filter gefunden.</div> <div class="else">Keine Events.</div></li>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!----></ul>`;
  pop();
}
function Filter($$payload, $$props) {
  push();
  const { data: events } = $$props;
  const filterDef = [
    {
      id: "byDate",
      group: "byDate",
      title: "Datum"
    },
    {
      id: "byCategory",
      group: "byCategory",
      title: "Typ"
    },
    {
      id: "byLocation",
      group: "byLocation",
      title: "Ort"
    },
    {
      id: "byAttribute",
      group: "byAttribute",
      title: "Sonstiges"
    }
  ];
  const spotlightCategories = [
    {
      group: "byCategory",
      id: "Soliparty",
      title: "Soliparty"
    },
    {
      group: "byCategory",
      id: "Workshoptag",
      title: "Workshoptag"
    }
  ];
  filterDef.reduce((acc, group) => ({ ...acc, [group.group]: /* @__PURE__ */ new Set() }), {});
  initialScores();
  function initialScores() {
    return events.all.reduce((acc, { id }) => ({ ...acc, [id]: 0 }), {});
  }
  let crntGroup = "";
  function mainSelector($$payload2, selector, type) {
    $$payload2.out += `<input${attr("id", `pg-${stringify(selector.id)}`)} class="_mainSelector svelte-1qa6nrs" type="checkbox" name="mainSelector"${attr("data-type", type)}${attr("data-group", selector.group)}${attr("data-id", selector.id)}> <label class="_mainSelector svelte-1qa6nrs" data-as="ellipse"${attr("for", `pg-${stringify(selector.id)}`)}${attr("data-is-active", crntGroup === selector.id)}>${escape_html(selector.title)}</label>`;
  }
  const each_array = ensure_array_like(filterDef);
  const each_array_1 = ensure_array_like(spotlightCategories);
  const each_array_2 = ensure_array_like(filterDef);
  $$payload.out += `<div class="FILTER svelte-1qa6nrs"><input id="toggleFilter" class="_toggleFilter svelte-1qa6nrs" type="checkbox"> <label class="_toggleFilter svelte-1qa6nrs" data-as="ellipse" for="toggleFilter">Filter</label> <form class="svelte-1qa6nrs"><fieldset class="_mainSelectors svelte-1qa6nrs"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const group = each_array[$$index];
    mainSelector($$payload, group, "toggleGroup");
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    const category = each_array_1[$$index_1];
    mainSelector($$payload, category, `toggleSpotlightCategory`);
  }
  $$payload.out += `<!--]--></fieldset> <div class="_subSelectorGroups svelte-1qa6nrs"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
    const group = each_array_2[$$index_3];
    const each_array_3 = ensure_array_like(Object.keys(events[group.group]));
    $$payload.out += `<ul${attr("data-group", group.group)} class="_subSelectorGroup svelte-1qa6nrs"${attr("data-is-visible", crntGroup === group.group)}><li><input${attr("id", `p-${stringify(group.group)}-all`)} type="checkbox" class="_reset svelte-1qa6nrs"${attr("data-group", group.group)}> <label${attr("for", `p-${stringify(group.group)}-all`)} class="svelte-1qa6nrs">Alle</label></li> <!--[-->`;
    for (let i = 0, $$length2 = each_array_3.length; i < $$length2; i++) {
      const property = each_array_3[i];
      $$payload.out += `<li><input${attr("id", `p-${stringify(group.group)}-${stringify(i)}`)} class="subSelector svelte-1qa6nrs" name="subSelector" type="checkbox" data-type="toggleProperty"${attr("data-group", group.group)}${attr("data-value", property)}${attr("data-id", property)}> <label${attr("for", `p-${stringify(group.group)}-${stringify(i)}`)} class="svelte-1qa6nrs">`;
      if (group.group === "byDate") {
        $$payload.out += "<!--[-->";
        $$payload.out += `${escape_html(formatDate(property))}`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `${escape_html(property)}`;
      }
      $$payload.out += `<!--]--></label></li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  }
  $$payload.out += `<!--]--></div></form></div>`;
  pop();
}
function _($$payload, $$props) {
  push();
  const { data } = $$props;
  let isFiltered = false;
  const maybeFiltered = (() => {
    return data.all;
  })();
  const hasEvents = data?.all?.length > 0;
  $$payload.out += `<div class="EVENTS-LIST svelte-1xeuje9"${attr("data-is-filtered", isFiltered)}${attr("data-has-events", hasEvents)}>`;
  if (hasEvents) {
    $$payload.out += "<!--[-->";
    Filter($$payload, { data });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  List($$payload, { data: maybeFiltered });
  $$payload.out += `<!----></div>`;
  pop();
}
function VidualEdition($$payload, $$props) {
  const { data } = $$props;
  const { image, useVideo } = data || {};
  $$payload.out += `<div class="VISUAL svelte-mmxql8"${attr("data-type", useVideo ? "video" : "image")}>`;
  if (useVideo) {
    $$payload.out += "<!--[-->";
    Video($$payload, { data });
  } else {
    $$payload.out += "<!--[!-->";
    Picture($$payload, { data: image });
  }
  $$payload.out += `<!--]--></div>`;
}
function Edition($$payload, $$props) {
  push();
  var $$store_subs;
  const { data, ...attributes } = $$props;
  const details = data?.details?.map((detail) => {
    if (detail?.item?.type === "ele_details__drawer") {
      detail.item.isOpen = true;
    }
    return detail;
  });
  $$payload.out += `<div${spread_attributes({ class: "EDITION", ...attributes }, { "svelte-1vb984a": true })}>`;
  if (details && details.length) {
    $$payload.out += "<!--[-->";
    Hero($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<div data-layout="1-1 rsp-1"><div class="column _1">`;
        if (data?.visual) {
          $$payload2.out += "<!--[-->";
          VidualEdition($$payload2, { data: data?.visual });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div> <div class="column _2">`;
        {
          let childrenBefore = function($$payload3) {
            $$payload3.out += `<a class="_toEvents"${attr("href", `${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "" : store_get($$store_subs ??= {}, "$page", page).url.pathname)}/#events`)} title="Zum Programm scrollen"><div class="label">Programm ${escape_html(data?.year)}</div> `;
            _$1($$payload3, { name: "arrow" });
            $$payload3.out += `<!----></a>`;
          };
          DetailsList($$payload2, { data: details, childrenBefore });
        }
        $$payload2.out += `<!----></div></div>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    PageSections($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<section class="_events svelte-1vb984a">`;
        Anchor($$payload2, { id: "events" });
        $$payload2.out += `<!----> <div class="_content svelte-1vb984a">`;
        _($$payload2, { data: data?.events });
        $$payload2.out += `<!----></div></section>`;
      }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  Edition as E
};

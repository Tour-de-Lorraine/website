import { p as pop, a as push, h as head, b as setContext, c as attr, s as store_get, u as unsubscribe_stores } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
function GetScrollbarWidth($$payload, $$props) {
  push();
  pop();
}
function Favicon($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="icon" href="/assets/favicons/favicon.ico"> <link rel="icon" href="/assets/favicons/favicon-16x16.png" sizes="16x16"> <link rel="icon" href="/assets/favicons/favicon-32x32.png" sizes="32x32"> <link rel="icon" href="/assets/favicons/favicon-180x180.png" sizes="180x180"> <link rel="icon" href="/assets/favicons/favicon-192x192.png" sizes="192x192"> <link rel="icon" href="/assets/favicons/favicon-512x512.png" sizes="512x512"> <link rel="apple-touch-icon" href="/favicon/favicon-180x180.png">`;
  });
}
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  const props = $$props;
  const {
    settings = {},
    navigation = {},
    currentEdition = null
  } = props?.data || {};
  const children = props?.children;
  setContext("site", { navigation, settings, currentEdition });
  $$payload.out += `<div>`;
  if (settings?.displayTicketing) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${attr("href", settings?.ticketingLink || "#")} target="_blank"><img src="/assets/images/tdl_tickets.png" class="floating-tickets" alt="Tickets"></a>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="SITE"${attr("data-route", store_get($$store_subs ??= {}, "$page", page).params.page)}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  GetScrollbarWidth();
  $$payload.out += `<!----> `;
  Favicon($$payload);
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};

import { h as head, a as setContext, c as attr, s as store_get, u as unsubscribe_stores } from "../../chunks/root.js";
import { p as page } from "../../chunks/stores.js";
import "clsx";
function GetScrollbarWidth($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
  });
}
function Favicon($$renderer) {
  head("1ijesjd", $$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="icon" href="/assets/favicons/favicon.ico"/> <link rel="icon" href="/assets/favicons/favicon-16x16.png" sizes="16x16"/> <link rel="icon" href="/assets/favicons/favicon-32x32.png" sizes="32x32"/> <link rel="icon" href="/assets/favicons/favicon-180x180.png" sizes="180x180"/> <link rel="icon" href="/assets/favicons/favicon-192x192.png" sizes="192x192"/> <link rel="icon" href="/assets/favicons/favicon-512x512.png" sizes="512x512"/> <link rel="apple-touch-icon" href="/favicon/favicon-180x180.png"/>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const { $$slots, $$events, ...props } = $$props;
    const { settings = {}, navigation = {}, currentEdition = null } = props?.data || {};
    const children = props?.children;
    setContext("site", { navigation, settings, currentEdition });
    $$renderer2.push(`<div>`);
    if (settings?.displayTicketing) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<a${attr("href", settings?.ticketingLink || "#")} target="_blank"><img src="/assets/images/tdl_tickets.png" class="floating-tickets" alt="Tickets"/></a>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="SITE"${attr("data-route", store_get($$store_subs ??= {}, "$page", page).params.page)}>`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    GetScrollbarWidth($$renderer2);
    $$renderer2.push(`<!----> `);
    Favicon($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};

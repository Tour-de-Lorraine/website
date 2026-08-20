import { e as escape_html, s as store_get, u as unsubscribe_stores } from "../../chunks/root.js";
import { p as page } from "../../chunks/stores.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="ERROR svelte-1j96wlh"><h1>FEHLER</h1> <h2>${escape_html(store_get($$store_subs ??= {}, "$page", page).status >= 500 ? "Server Problem" : "Seite nicht gefunden")}</h2> <a data-as="link-1" href="/" title="Link zur Startseite" class="svelte-1j96wlh">Zur Startseite</a></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _error as default
};

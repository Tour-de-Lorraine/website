import { e as escape_html, s as store_get, u as unsubscribe_stores, p as pop, a as push } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
function _error($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div class="ERROR svelte-fm0u2f"><h1>FEHLER</h1> <h2>${escape_html(store_get($$store_subs ??= {}, "$page", page).status >= 500 ? "Server Problem" : "Seite nicht gefunden")}</h2> <a data-as="link-1" href="/" title="Link zur Startseite" class="svelte-fm0u2f">Zur Startseite</a></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _error as default
};

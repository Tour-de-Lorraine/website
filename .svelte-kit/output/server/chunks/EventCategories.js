import { a as push, d as ensure_array_like, c as attr, e as escape_html, p as pop } from "./index2.js";
import { _ } from "./PageSections.js";
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const full = date.toLocaleDateString("de-ch", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });
  return full;
}
function formatTime(timeStr) {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.split(":");
  return `${hours}:${minutes}`;
}
function EventIssues($$payload, $$props) {
  push();
  const { data } = $$props;
  function datetime($$payload2, { dateStart, dateEnd, timeStart, timeEnd }) {
    $$payload2.out += `<span class="_dates">`;
    if (dateStart) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="_start">${escape_html(formatDate(dateStart))}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
    if (dateEnd) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<span class="_end">${escape_html(formatDate(dateEnd))}</span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></span>`;
    if (timeStart || timeEnd) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `, <span class="_times">`;
      if (timeStart) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="_start">${escape_html(formatTime(timeStart))}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
      if (timeEnd) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<span class="_end">${escape_html(formatTime(timeEnd))}</span>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></span>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  const each_array = ensure_array_like(data);
  $$payload.out += `<ul class="EVENT-ISSUES svelte-13qdx8m"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const issue = each_array[$$index];
    $$payload.out += `<li class="svelte-13qdx8m"><div class="_dateTimes svelte-13qdx8m">`;
    datetime($$payload, issue);
    $$payload.out += `<!----></div> <div class="_location svelte-13qdx8m">`;
    if (issue.locationUrl) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<a${attr("href", issue.locationUrl)} data-as="link-1">${escape_html(issue.location)}</a>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(issue.location)}`;
    }
    $$payload.out += `<!--]--></div></li>`;
  }
  $$payload.out += `<!--]--></ul>`;
  pop();
}
function Badge($$payload, $$props) {
  const { icon, text = "" } = $$props;
  $$payload.out += `<button class="BADGE svelte-1r4xf0j"${attr("data-text", text)} role="hidden" tabindex="0">`;
  _($$payload, { name: icon });
  $$payload.out += `<!----></button>`;
}
function EventAttributes($$payload, $$props) {
  push();
  let { data } = $$props;
  let attributes = data.map((attr2) => attr2.junction);
  const each_array = ensure_array_like(attributes);
  $$payload.out += `<ul class="EVENT-ATTRIBUTES" data-as="badges-list" aria-label="Zugänglichkeit des Events"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const { iconKey, translations } = each_array[$$index];
    const text = `Dieser Event ist ${translations[0].name}`;
    $$payload.out += `<li class="_attribute"${attr("aria-label", text)}>`;
    Badge($$payload, { icon: iconKey, text });
    $$payload.out += `<!----></li>`;
  }
  $$payload.out += `<!--]--></ul>`;
  pop();
}
function EventCategories($$payload, $$props) {
  push();
  const { data } = $$props;
  const categories = data.map((cat) => cat.junction.translations[0]);
  const each_array = ensure_array_like(categories);
  $$payload.out += `<ul class="EVENT-CATEGORIES svelte-gyax80"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    const category = each_array[$$index];
    const { name } = category || {};
    $$payload.out += `<li class="svelte-gyax80">${escape_html(name)}</li>`;
  }
  $$payload.out += `<!--]--></ul>`;
  pop();
}
export {
  EventIssues as E,
  EventCategories as a,
  EventAttributes as b,
  formatDate as f
};

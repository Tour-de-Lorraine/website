import { d as ensure_array_like, c as attr, e as escape_html } from "./root.js";
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
function datetime($$renderer, { dateStart, dateEnd, timeStart, timeEnd }) {
  $$renderer.push(`<span class="_dates">`);
  if (dateStart) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<span class="_start">${escape_html(formatDate(dateStart))}</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
  if (dateEnd) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<span class="_end">${escape_html(formatDate(dateEnd))}</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></span>`);
  if (timeStart || timeEnd) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`, <span class="_times">`);
    if (timeStart) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<span class="_start">${escape_html(formatTime(timeStart))}</span>`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]-->`);
    if (timeEnd) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<span class="_end">${escape_html(formatTime(timeEnd))}</span>`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]--></span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]-->`);
}
function EventIssues($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    $$renderer2.push(`<ul class="EVENT-ISSUES svelte-yeh1kn"><!--[-->`);
    const each_array = ensure_array_like(
      // function formatDatetime({dateStart, dateEnd, timeStart, timeEnd}) {
      // 	const _dateStart = formatDate(dateStr);
      // 	const _timeStart = formatTime(timeStr);
      // 	let output = date;
      // 	if (_timeStart?.length > 0) output += `, ${time}`;
      // 	return output;
      // }
      // const timeStart = data?.startTime ? formatTime(data.endTime) : '';
      // const timeEnd = data?.endTime ? `bis ${formatTime(data.endTime)}` : '';
      data
    );
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let issue = each_array[$$index];
      $$renderer2.push(`<li class="svelte-yeh1kn"><div class="_dateTimes svelte-yeh1kn">`);
      datetime($$renderer2, issue);
      $$renderer2.push(`<!----></div> <div class="_location svelte-yeh1kn">`);
      if (issue.locationUrl) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<a${attr("href", issue.locationUrl)} data-as="link-1">${escape_html(issue.location)}</a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`${escape_html(issue.location)}`);
      }
      $$renderer2.push(`<!--]--></div></li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
  });
}
function Badge($$renderer, $$props) {
  const { icon, text = "" } = $$props;
  $$renderer.push(`<button class="BADGE svelte-mclxv0"${attr("data-text", text)} role="hidden" tabindex="0">`);
  _($$renderer, { name: icon });
  $$renderer.push(`<!----></button>`);
}
function EventAttributes($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let attributes = data.map((attr2) => attr2.junction);
    $$renderer2.push(`<ul class="EVENT-ATTRIBUTES" data-as="badges-list" aria-label="Zugänglichkeit des Events"><!--[-->`);
    const each_array = ensure_array_like(attributes);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let { iconKey, translations } = each_array[$$index];
      const text = `Dieser Event ist ${translations[0].name}`;
      $$renderer2.push(`<li class="_attribute"${attr("aria-label", text)}>`);
      Badge($$renderer2, { icon: iconKey, text });
      $$renderer2.push(`<!----></li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
  });
}
function EventCategories($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { data } = $$props;
    const categories = data.map((cat) => cat.junction.translations[0]);
    $$renderer2.push(`<ul class="EVENT-CATEGORIES svelte-1shy7zv"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let category = each_array[$$index];
      const { name } = category || {};
      $$renderer2.push(`<li class="svelte-1shy7zv">${escape_html(name)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
  });
}
export {
  EventIssues as E,
  EventCategories as a,
  EventAttributes as b,
  formatDate as f
};

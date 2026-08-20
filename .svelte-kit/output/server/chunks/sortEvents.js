import { i as imageFields, b as intern, d as detailsFields, c as basicFields$1 } from "./events.js";
import { t as translationsFilter } from "./translations.js";
const visualFields = `
image {
    ${imageFields}
}
video {
    id
    ${intern}
}
useVideo: use_video`;
const basicFields = `
year
translations(${translationsFilter}) {
    title
}
visual {
    ${visualFields}
}
details(sort: "order") {
    item {
        ${detailsFields}
    }
}
useOtherProgramSource: use_other_program_source
otherProgramSourceType: other_program_source_type
otherProgramUrl: other_program__url
otherProgramPdf: other_program__pdf {
    type
    id
}`;
const allFields = `
${basicFields}
events {
    ${basicFields$1}
}`;
function sortEvents(data) {
  const eventsAsc = orderEventsByDate(data);
  const byAttribute = {};
  const byCategory = {};
  const byDate = {};
  const byLocation = {};
  for (let i = 0; i < eventsAsc.length; i++) {
    const event = eventsAsc[i];
    const attributes = getProperty(event, "attributes");
    insert(event, attributes, byAttribute);
    const categories = getProperty(event, "categories");
    insert(event, categories, byCategory);
    const { dates, locations } = getDatesAndLocations(event);
    insert(event, dates, byDate);
    insert(event, locations, byLocation);
  }
  return {
    all: eventsAsc,
    byDate,
    byCategory,
    byLocation,
    byAttribute
  };
}
function getProperty(event, propertyName) {
  if (propertyName in event === false) throw `Property "${propertyName}" does not exist in event`;
  const names = event[propertyName]?.map((prop) => prop?.junction?.translations?.[0].name).filter((name) => typeof name === "string");
  return names;
}
function getDatesAndLocations(event) {
  const datesAndLocations = event.issues?.reduce(
    (acc, { dateStart, dateEnd, location }) => {
      if (dateStart) acc.dates.push(...getDateRange(dateStart, dateEnd));
      if (location) acc.locations.push(location);
      return acc;
    },
    { dates: [], locations: [] }
  );
  return datesAndLocations;
}
function getDateRange(dateStart, dateEnd) {
  if (!dateEnd) return [dateStart];
  const range = [dateStart];
  const dateEndObj = new Date(dateEnd);
  const crntDateObj = new Date(dateStart);
  while (crntDateObj < dateEndObj) {
    crntDateObj.setDate(crntDateObj.getDate() + 1);
    const asKey = crntDateObj.toISOString().split("T")[0];
    range.push(asKey);
  }
  return range;
}
function insert(event, properties, sorting) {
  properties.forEach((prop) => {
    if (prop in sorting) sorting[prop].push(event.id);
    else sorting[prop] = [event.id];
  });
}
function orderEventsByDate(events) {
  const eventsAsc = events.sort((a, b) => {
    const dateA = new Date(a.issues?.[0]?.dateStart);
    const dateB = new Date(b.issues?.[0]?.dateStart);
    const timeStartA = getTimeAsMinutes(a.issues?.[0]?.timeStart);
    const timeStartB = getTimeAsMinutes(b.issues?.[0]?.timeStart);
    return dateA - dateB || timeStartA - timeStartB;
  });
  return eventsAsc;
}
function getTimeAsMinutes(time) {
  if (typeof time !== "string") return 0;
  const [h, m] = time.split(":");
  return (h || 0) * 60 + (m || 0);
}
export {
  allFields as a,
  basicFields as b,
  sortEvents as s
};

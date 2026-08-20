import { s as safeFetch, d as directusGraphql } from "./translations.js";
import { a as allFields } from "./events.js";
const eventFilter = `filter: {translations: {slug: {_eq: $slug}}}`;
const eventQuery = `#graphql
query($slug: String, $lang: String){
    event: events(${eventFilter}) {
        ${allFields}
    }
}`;
async function fetchEvent(slug) {
  return await safeFetch(async function fetchEvent2() {
    const data = await directusGraphql.query(eventQuery, {
      lang: "de",
      slug
    });
    return data;
  });
}
export {
  fetchEvent as f
};

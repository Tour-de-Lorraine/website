import { s as safeFetch, d as directusGraphql } from "../../../../chunks/translations.js";
import { a as allFields, s as sortEvents } from "../../../../chunks/sortEvents.js";
const editionQuery = `#graphql
query($year: GraphQLStringOrFloat, $lang: String){
    edition: editions(filter: {year: {_eq: $year}}) {
        ${allFields}
    }
}`;
async function fetchEdition(year) {
  return await safeFetch(async function fetchEdition2() {
    const data = await directusGraphql.query(editionQuery, {
      lang: "de",
      year
    });
    const edition = data.edition?.[0];
    const sortedEvents = sortEvents(edition?.events || []);
    return {
      edition: {
        ...edition,
        events: sortedEvents
      }
    };
  });
}
async function load({ params }) {
  try {
    const data = await fetchEdition(params.year);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export {
  load
};

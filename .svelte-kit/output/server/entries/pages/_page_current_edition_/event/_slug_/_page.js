import { f as fetchEvent } from "../../../../../chunks/fetchEvent.js";
async function load({ params }) {
  try {
    const { slug } = params;
    const data = await fetchEvent(slug);
    const event = data.event[0];
    return event;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export {
  load
};

import { f as fetchPage } from "../../../chunks/fetchPage.js";
async function load() {
  try {
    const data = await fetchPage("support");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export {
  load
};

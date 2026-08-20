import { f as fetchPage } from "../../../chunks/fetchPage.js";
import { redirect } from "@sveltejs/kit";
async function load() {
  let data;
  try {
    data = await fetchPage("current_edition");
  } catch (err) {
    console.error(err);
    return null;
  }
  if (!data?.isActive || !data?.currentEdition) {
    throw redirect(307, "/verein");
  }
  return data;
}
export {
  load
};

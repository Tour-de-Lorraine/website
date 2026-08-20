import { redirect } from "@sveltejs/kit";
async function load() {
  throw redirect(307, "/programm");
}
export {
  load
};

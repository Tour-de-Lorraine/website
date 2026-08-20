import { createDirectus, staticToken, rest, graphql } from "@directus/sdk";
const PUBLIC_DIRECTUS_URL = "https://next.tourdelorraine.ch";
const PUBLIC_DIRECTUS_TOKEN = "your-directus-token-here";
const baseUrl = PUBLIC_DIRECTUS_URL;
createDirectus(baseUrl).with(staticToken(PUBLIC_DIRECTUS_TOKEN)).with(rest());
const directusGraphql = createDirectus(baseUrl).with(staticToken(PUBLIC_DIRECTUS_TOKEN)).with(graphql());
function handleError(errorData) {
  if (errorData instanceof Error) return errorData;
  if (typeof errorData !== "object") return errorData;
  if ("errors" in errorData === false) return errorData;
  const errors = errorData?.errors || null;
  const messages = errors.reduce((acc, err) => {
    let message = err?.message || "There is a problem displaying this Error.";
    let nested = Array.isArray(err?.extensions?.errors) ? err.extensions.errors.map(
      (errNested) => errNested?.message || "There is a problem displaying this Error."
    ) : [];
    return [...acc, message, ...nested];
  }, []);
  return messages.join("\n");
}
async function safeFetch(fn) {
  try {
    const data = await fn();
    if (!data) throw "No Data was fetched.";
    if (typeof data !== "object" || "errors" in data) throw data;
    return data;
  } catch (error) {
    const message = handleError(error);
    console.error("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    console.error(fn);
    console.error(message);
    console.error("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    return null;
  }
}
const translationsFilter = `filter: {languages_code: {code: {_starts_with: $lang}}}`;
export {
  directusGraphql as d,
  safeFetch as s,
  translationsFilter as t
};

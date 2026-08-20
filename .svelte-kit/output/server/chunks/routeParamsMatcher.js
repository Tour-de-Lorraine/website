import { d as definitions } from "./routes.js";
const language = /* @__PURE__ */ (() => {
  let lang = "init";
  let subs = [];
  const unsubscribe = (handler) => {
    subs = subs.filter((sub) => sub !== handler);
  };
  const subscribe = (handler) => {
    subs.push(handler);
    handler(lang);
    return unsubscribe.bind(null, handler);
  };
  const set = (newLang) => {
    if (lang === newLang) return;
    lang = newLang;
    subs.forEach((handler) => handler(lang));
  };
  const get = () => {
    return lang;
  };
  return {
    subscribe,
    set,
    get
  };
})();
const matchFunctions = Object.keys(definitions).reduce((acc, routeName) => {
  const route = definitions[routeName];
  const { translations } = route;
  const translationLanguages = Object.keys(translations);
  return {
    ...acc,
    [routeName]: (param) => {
      const match = translationLanguages.find((lang) => translations[lang] === param);
      if (!match) return false;
      language.set(match);
      return true;
    }
  };
}, {});
export {
  matchFunctions as m
};

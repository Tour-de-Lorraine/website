const definitions = {
  current_edition: {
    translations: {
      de: "programm",
      en: "events"
    }
  },
  association: {
    translations: {
      de: "verein",
      en: "association"
    }
  },
  support: {
    translations: {
      de: "projektfoerderung"
    }
  },
  archive: {
    translations: {
      de: "archiv",
      en: "archive"
    }
  },
  contact: {
    translations: {
      de: "kontakt"
    }
  },
  imprint: {
    translations: {
      de: "impressum"
    }
  },
  privacy: {
    translations: {
      de: "datenschutz"
    }
  }
};
const routeKeys = Object.keys(definitions);
routeKeys.map((key) => ({ key, ...definitions[key] }));
routeKeys.reduce((acc, routeName) => {
  const route = definitions[routeName];
  return {
    ...acc,
    ...Object.keys(route.translations).reduce((acc2, lang) => {
      const translatedRouteName = route.translations[lang];
      return {
        ...acc2,
        [translatedRouteName]: route
      };
    }, {})
  };
}, {});
export {
  definitions as d
};

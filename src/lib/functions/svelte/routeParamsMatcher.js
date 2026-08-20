import routesDef from '/src/config/routes';

// Create match functions for all defined routes
// Return an object with route name as key and function as value:
// {routeName: (params) => {...}, ...}
// The match function also sets the pages language.

import language from '/src/language.js';

const matchFunctions = Object.keys(routesDef).reduce((acc, routeName) => {
	const route = routesDef[routeName];
	const {translations} = route;
	const translationLanguages = Object.keys(translations);

	return {
		...acc,
		[routeName]: (param) => {
			const match = translationLanguages.find((lang) => translations[lang] === param);
			if (!match) return false;
			language.set(match);
			return true;
		},
	};
}, {});

export default matchFunctions;

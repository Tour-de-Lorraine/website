const definitions = {
	current_edition: {
		translations: {
			de: 'programm',
			en: 'events',
		},
	},

	association: {
		translations: {
			de: 'verein',
			en: 'association',
		},
	},

	support: {
		translations: {
			de: 'projektfoerderung',
		},
	},

	archive: {
		translations: {
			de: 'archiv',
			en: 'archive',
		},
	},

	contact: {
		translations: {
			de: 'kontakt',
		},
	},

	imprint: {
		translations: {
			de: 'impressum',
		},
	},

	privacy: {
		translations: {
			de: 'datenschutz',
		},
	},
};

export default definitions;

const routeKeys = Object.keys(definitions);

const routesArray = routeKeys.map((key) => ({key, ...definitions[key]}));

const routesByTranslations = routeKeys.reduce((acc, routeName) => {
	const route = definitions[routeName];
	return {
		...acc,
		...Object.keys(route.translations).reduce((acc, lang) => {
			const translatedRouteName = route.translations[lang];
			return {
				...acc,
				[translatedRouteName]: route,
			};
		}, {}),
	};
}, {});

export {routesArray, routesByTranslations};

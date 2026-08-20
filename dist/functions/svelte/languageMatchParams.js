/**
 * @param {}
 * @return {}
 */

export function createMatchFunction(langState, ...languages) {
	return function (param) {
		const lang = languages.find((lang) => param === lang.route) || null;

		if (lang?.code) {
			langState.set(lang.code);
			return true;
		}

		return false;
	};
}

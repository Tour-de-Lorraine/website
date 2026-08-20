import {routesByTranslations} from '/src/config/routes.js';
import languagesDef from '/src/config/languages.js';

export async function handle({event, resolve}) {
	const {request, url, cookies} = event || {};
	const {headers} = request || {};

	// Try to get language in the following order:
	let lang =
		// route is /set-language
		url.searchParams.get('lang') ||
		// cookie - language has been set before
		cookies.get('lang') ||
		// initial visit - get accept-language
		headers.get('accept-language')?.split(/-|,/)?.[0];

	// default language
	if (!lang || lang in languagesDef === false) lang = 'de';

	if (url.pathname === '/set-language') {
		const route = url.searchParams.get('route');
		const newRoute = routesByTranslations?.[route]?.translations?.[lang] || '';
		cookies.set('lang', lang, {path: '/', httpOnly: false});
		return Response.redirect(`${url.origin}/${newRoute}`);
	}

	const response = resolve(event, {
		transformPageChunk: ({html}) => html.replace('%lang%', lang),
	});

	return response;
}

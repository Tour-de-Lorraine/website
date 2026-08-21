import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import siteQuery from './queries/site.js';

export default async function () {
	return await safeFetch(async function fetchSite() {
		const data = await directusGraphql.query(siteQuery, {
			lang: 'de',
		});

		return data;
	});
}

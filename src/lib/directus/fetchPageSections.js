import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import pagesSectionsQuery from './queries/pagesSections.js';

export default async function (pageId = '') {
	return await safeFetch(async function fetchPageSections() {
		return await directusGraphql.query(pagesSectionsQuery, {
			page_id: pageId,
			lang: 'de',
		});
	});
}

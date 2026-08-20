import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import eventQuery from './queries/event.js';

export default async function (slug) {
	return await safeFetch(async function fetchEvent() {
		const data = await directusGraphql.query(eventQuery, {
			lang: 'de',
			slug,
		});

		return data;
	});
}

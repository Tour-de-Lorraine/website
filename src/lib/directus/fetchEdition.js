import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import editionQuery from './queries/edition.js';
import sortEvents from './sortEvents.js';

export default async function (year) {
	return await safeFetch(async function fetchEdition() {
		const data = await directusGraphql.query(editionQuery, {
			lang: 'de',
			year,
		});

		const edition = data.edition?.[0];

		const sortedEvents = sortEvents(edition?.events || []);
		return {
			edition: {
				...edition,
				events: sortedEvents,
			},
		};
	});
}

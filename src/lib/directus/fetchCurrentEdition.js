import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import currentEditionQuery from './queries/currentEdition.js';
import sortEvents from './sortEvents.js';

export default async function () {
	return await safeFetch(async function fetchCurrentEdition() {
		const data = await directusGraphql.query(currentEditionQuery, {
			lang: 'de',
		});

		const currentEdition = data.currentEdition.edition;

		const sortedEvents = sortEvents(currentEdition?.events || []);
		return {
			currentEdition: {
				...currentEdition,
				events: sortedEvents,
			},
		};
	});
}

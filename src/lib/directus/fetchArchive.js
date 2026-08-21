import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import archiveQuery from './queries/archive.js';

export default async function (pageId) {
	return await safeFetch(async function fetchArchive() {
		const data = await directusGraphql.query(archiveQuery, {
			lang: 'de',
			page_id: pageId,
		});

		const additionalContent = data.additionalContent;
		const editions = data.editions;
		const currentEdition = data?.currentEdition?.edition || null;

		const archived = currentEdition
			? data.editions.filter((edition) => edition.year < currentEdition.year)
			: editions;

		return {archived, additionalContent};
	});
}

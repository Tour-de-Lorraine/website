import {directusGraphql} from './index.js';
import safeFetch from './safeFetch.js';
import pagesQuery from './queries/pages.js';
import fetchCurrentEdition from './fetchCurrentEdition.js';
import fetchPageSections from './fetchPageSections.js';
import fetchArchive from './fetchArchive.js';

export default async function (pageId = '') {
	return await safeFetch(async function fetchPage() {
		const {page} = await directusGraphql.query(pagesQuery, {
			page_id: pageId,
			lang: 'de',
		});

		if (!page || !page.type) {
			throw `Can not fetch Page "${pageId}".`;
		}

		const content =
			page.type === 'sections'
				? await fetchPageSections(pageId)
				: page.type === 'edition'
					? await fetchCurrentEdition()
					: page.type === 'archive'
						? await fetchArchive(pageId)
						: {};

		return {
			...page,
			...content,
		};
	});
}

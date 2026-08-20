import fetchEdition from '$lib/directus/fetchEdition';

export async function load({params}) {
	try {
		const data = await fetchEdition(params.year);
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

import fetchSite from '$lib/directus/fetchSite';

export async function load() {
	try {
		const data = await fetchSite();
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

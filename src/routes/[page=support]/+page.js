import fetchPage from '$lib/directus/fetchPage';

export async function load() {
	try {
		const data = await fetchPage('support');
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

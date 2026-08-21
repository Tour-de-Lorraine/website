import fetchPage from '$lib/directus/fetchPage';

export async function load() {
	try {
		const data = await fetchPage('contact');
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

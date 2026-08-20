import fetchPage from '$lib/directus/fetchPage';

export async function load() {
	try {
		const data = await fetchPage('imprint');
		return data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

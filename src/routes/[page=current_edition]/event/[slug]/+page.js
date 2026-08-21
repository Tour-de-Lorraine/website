import fetchEvent from '$lib/directus/fetchEvent';

export async function load({params}) {
	try {
		const {slug} = params;
		const data = await fetchEvent(slug);
		const event = data.event[0];
		return event;
	} catch (err) {
		console.error(err);
		return null;
	}
}

import {PUBLIC_DIRECTUS_URL} from '$env/static/public';

const FALLBACK_DIRECTUS_URL = 'https://next.tourdelorraine.ch';

export function getDirectusFileUrl(id) {
	if (!id) return '';
	const baseUrl = PUBLIC_DIRECTUS_URL || FALLBACK_DIRECTUS_URL;
	return `${baseUrl}/assets/${id}`;
}

import {PUBLIC_DIRECTUS_TOKEN} from '$env/static/public';
import {PUBLIC_DIRECTUS_URL} from '$env/static/public';
import {browser} from '$app/environment';

import {createDirectus, staticToken, rest, graphql} from '@directus/sdk';

// Fallback URL if env var is not available during build
const FALLBACK_DIRECTUS_URL = 'https://next.tourdelorraine.ch';

// Always use the configured Directus URL directly
// CORS is configured on next.tourdelorraine.ch, so cross-origin requests work
const baseUrl = PUBLIC_DIRECTUS_URL || FALLBACK_DIRECTUS_URL;

export const directusRest = createDirectus(baseUrl)
	.with(staticToken(PUBLIC_DIRECTUS_TOKEN))
	.with(rest());

export const directusGraphql = createDirectus(baseUrl)
	.with(staticToken(PUBLIC_DIRECTUS_TOKEN))
	.with(graphql());

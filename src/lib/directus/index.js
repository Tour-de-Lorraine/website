import {PUBLIC_DIRECTUS_TOKEN} from '$env/static/public';
import {PUBLIC_DIRECTUS_URL} from '$env/static/public';
import {browser} from '$app/environment';

import {createDirectus, staticToken, rest, graphql} from '@directus/sdk';

// Fallback URL if env var is not available during build
const FALLBACK_DIRECTUS_URL = 'https://next.tourdelorraine.ch';

// In browser: use current origin so requests go through the proxy (same-origin, no CORS)
// During SSR/build: use full Directus URL directly
const baseUrl = browser ? window.location.origin : (PUBLIC_DIRECTUS_URL || FALLBACK_DIRECTUS_URL);

export const directusRest = createDirectus(baseUrl)
	.with(staticToken(PUBLIC_DIRECTUS_TOKEN))
	.with(rest());

export const directusGraphql = createDirectus(baseUrl)
	.with(staticToken(PUBLIC_DIRECTUS_TOKEN))
	.with(graphql());

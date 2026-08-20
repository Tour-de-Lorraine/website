import {SECRET_DIRECTUS_TOKEN} from '$env/static/private';
import {PUBLIC_DIRECTUS_URL} from '$env/static/public';

import {createDirectus, staticToken, rest, graphql} from '@directus/sdk';

export const directusRest = createDirectus(PUBLIC_DIRECTUS_URL)
	.with(staticToken(SECRET_DIRECTUS_TOKEN))
	.with(rest());

export const directusGraphql = createDirectus(PUBLIC_DIRECTUS_URL)
	.with(staticToken(SECRET_DIRECTUS_TOKEN))
	.with(graphql());

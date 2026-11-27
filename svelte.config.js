import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@use "./src/lib/styles/breakpoints" as *;`,
		},
	}),
	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),
		paths: {
			relative: false,
		},
	},
};

export default config;

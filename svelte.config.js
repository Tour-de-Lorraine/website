import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@import "./src/lib/styles/breakpoints.scss";`,
		},
	}),
	kit: {
		adapter: adapter({
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		prerender: {
			entries: []
		}
	},
};

export default config;

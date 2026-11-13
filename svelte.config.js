import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import {readFileSync} from 'fs';

let prerenderEntries;
try {
	prerenderEntries = JSON.parse(readFileSync('./prerender-entries.json', 'utf-8'));
} catch {
	prerenderEntries = ['/'];
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: `@use "./src/lib/styles/breakpoints" as *;`,
		},
	}),
	kit: {
		adapter: adapter(),
		paths: {
			relative: false
		},
		prerender: {
			entries: prerenderEntries,
			handleHttpError: ({path, message}) => {
				console.warn(`⚠️  Prerender warning: ${message}`);
				return;
			}
		}
	},
};

export default config;

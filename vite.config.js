import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000,
		proxy: {
			'/graphql': {
				target: 'https://next.tourdelorraine.ch',
				changeOrigin: true,
				secure: true,
				headers: {
					Origin: 'https://www.tourdelorraine.ch',
					Referer: 'https://www.tourdelorraine.ch/'
				}
			},
			'/items': {
				target: 'https://next.tourdelorraine.ch',
				changeOrigin: true,
				secure: true,
				headers: {
					Origin: 'https://www.tourdelorraine.ch',
					Referer: 'https://www.tourdelorraine.ch/'
				}
			},
			'/files': {
				target: 'https://next.tourdelorraine.ch',
				changeOrigin: true,
				secure: true,
				headers: {
					Origin: 'https://www.tourdelorraine.ch',
					Referer: 'https://www.tourdelorraine.ch/'
				}
			},
			'/assets': {
				target: 'https://next.tourdelorraine.ch',
				changeOrigin: true,
				secure: true,
				headers: {
					Origin: 'https://www.tourdelorraine.ch',
					Referer: 'https://www.tourdelorraine.ch/'
				}
			}
		}
	}
});

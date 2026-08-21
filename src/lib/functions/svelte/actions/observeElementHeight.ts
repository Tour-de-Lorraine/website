import {browser} from '$app/environment';
import type {Writable} from 'svelte/store';

export function observeElementHeight(N: HTMLElement, store: Writable<number>) {
	if (!browser) return;
	store?.set(N?.clientHeight);

	const observer = new ResizeObserver(() => {
		store?.set(N.clientHeight);
	});

	observer.observe(N);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

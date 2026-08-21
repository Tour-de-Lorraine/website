import type {Writable} from 'svelte/store';

const setStoreValue = (N, store) => store?.set(N?.getBoundingClientRect());

const useResizeobserver = (N, store) => {
	const observer = new ResizeObserver(() => setStoreValue(N, store));
	observer.observe(N);
	return {
		destroy() {
			observer.disconnect();
		}
	};
};

const useEventListener = (N, store) => {
	const eventHandler = () => setStoreValue(N, store);
	window.addEventListener('resize', eventHandler);
	return {
		destroy() {
			window.removeEventListener('resize', eventHandler);
		}
	};
};

export const observeElementRect = function (N: HTMLElement, store: Writable<DOMRect>) {
	setStoreValue(N, store);

	if (window?.ResizeObserver) {
		return useResizeobserver(N, store);
	}

	return useEventListener(N, store);
};

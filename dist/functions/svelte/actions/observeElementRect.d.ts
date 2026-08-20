import type { Writable } from 'svelte/store';
export declare const observeElementRect: (N: HTMLElement, store: Writable<DOMRect>) => {
    destroy(): void;
};

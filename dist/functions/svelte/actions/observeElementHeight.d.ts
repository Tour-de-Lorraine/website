import type { Writable } from 'svelte/store';
export declare function observeElementHeight(N: HTMLElement, store: Writable<number>): {
    destroy(): void;
};

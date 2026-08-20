import { browser } from '$app/environment';
export function observeElementHeight(N, store) {
    if (!browser)
        return;
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

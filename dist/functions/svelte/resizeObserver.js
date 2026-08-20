import {writable, derived} from "svelte/store";

function polyfill(NTarget, cb) {
  let last = NTarget.getBoundingClientRect();

  function onResize() {
    const crnt = NTarget.getBoundingClientRect();
    if (last.width === crnt.width && last.height === crnt.height) return;
    cb(crnt);
    last = crnt;
  }

  window.addEventListener("resize", onResize);

  cb(last);

  return () => window.removeEventListener("resize", onResize);
}

export function sizeObserver(NTarget, cb) {
  if (!NTarget || !cb || typeof cb !== "function") return;

  try {
    const ro = new ResizeObserver(([entry]) => {
      cb(entry?.contentRect);
    });
    ro.observe(NTarget);
    return () => ro.disconnect();
  } catch (_) {
    return polyfill(NTarget, cb);
  }
}

export function sizeObserverSvelte() {
  const N = writable();
  const size = derived(N, sizeObserver);
  return [N.set, size];
}

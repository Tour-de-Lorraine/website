import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DW9zfUes.js","_app/immutable/chunks/QUmjvB7P.js","_app/immutable/chunks/6M0omE6E.js","_app/immutable/chunks/CN3DVnmc.js","_app/immutable/chunks/DDJZBS6B.js","_app/immutable/chunks/CcL1oHS0.js","_app/immutable/chunks/Cryz591v.js","_app/immutable/chunks/Ba9GZAhY.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/DLIo2lIt.js"];
export const stylesheets = ["_app/immutable/assets/0.2XpMVj2_.css"];
export const fonts = [];

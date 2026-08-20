import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CATEJIes.js","_app/immutable/chunks/ChwcRCr0.js","_app/immutable/chunks/DxLzY48c.js","_app/immutable/chunks/BfPyFkIi.js","_app/immutable/chunks/BRfSnfG9.js","_app/immutable/chunks/hdG8LYG1.js","_app/immutable/chunks/DcoUKV6N.js","_app/immutable/chunks/D2WcWwHk.js","_app/immutable/chunks/Dvft-XFv.js","_app/immutable/chunks/OA8UcISh.js"];
export const stylesheets = ["_app/immutable/assets/0.CRWZqApN.css"];
export const fonts = [];

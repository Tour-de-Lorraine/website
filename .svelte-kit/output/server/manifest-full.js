export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/favicons/favicon-16x16.png","assets/favicons/favicon-180x180.png","assets/favicons/favicon-192x192.png","assets/favicons/favicon-32x32.png","assets/favicons/favicon-512x512.png","assets/favicons/favicon.ico","assets/fonts/MZ-OTR-Grotesk-144-Bold-italic.woff","assets/fonts/MZ-OTR-Grotesk-144-Bold-italic.woff2","assets/fonts/MZ-OTR-Grotesk-144-Bold.woff","assets/fonts/MZ-OTR-Grotesk-144-Bold.woff2","assets/fonts/MZ-OTR-Grotesk-96-Regular-Italic.woff","assets/fonts/MZ-OTR-Grotesk-96-Regular-Italic.woff2","assets/fonts/MZ-OTR-Grotesk-96-Regular.woff","assets/fonts/MZ-OTR-Grotesk-96-Regular.woff2","assets/images/tdl_tickets.png","assets/tdlVisual/lottieFiles/visual-tall-1.json","assets/tdlVisual/lottieFiles/visual-tall-2.json","assets/tdlVisual/lottieFiles/visual-wide-1.json","assets/tdlVisual/lottieFiles/visual-wide-2.json","assets/tdlVisual/videos/TdL_Lottie_Desktop_Teil_1+2_Ansicht.mp4","assets/tdlVisual/videos/TdL_Lottie_Mobile_Teil_1+2_Ansicht.mp4","assets/tdlVisual/videos/visual-tall-1.mp4","assets/tdlVisual/videos/visual-tall-1.webm","assets/tdlVisual/videos/visual-tall-2.mp4","assets/tdlVisual/videos/visual-tall-2.webm","assets/tdlVisual/videos/visual-tall-sw-1.mp4","assets/tdlVisual/videos/visual-tall-sw-2.mp4","assets/tdlVisual/videos/visual-wide-1.mp4","assets/tdlVisual/videos/visual-wide-1.webm","assets/tdlVisual/videos/visual-wide-2.mp4","assets/tdlVisual/videos/visual-wide-2.webm","assets/tdlVisual/videos/visual-wide-sw-1.mp4","assets/tdlVisual/videos/visual-wide-sw-2.mp4","assets/webComponents/drawer.js","assets/webComponents/drawerGroup.js","assets/webComponents/gallery.js"]),
	mimeTypes: {".png":"image/png",".woff":"font/woff",".woff2":"font/woff2",".json":"application/json",".mp4":"video/mp4",".webm":"video/webm",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.CMbBhiTl.js",app:"_app/immutable/entry/app.CYlp2vbU.js",imports:["_app/immutable/entry/start.CMbBhiTl.js","_app/immutable/chunks/Dvft-XFv.js","_app/immutable/chunks/DxLzY48c.js","_app/immutable/chunks/BRfSnfG9.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/entry/app.CYlp2vbU.js","_app/immutable/chunks/Cb4Av7S1.js","_app/immutable/chunks/DxLzY48c.js","_app/immutable/chunks/BfPyFkIi.js","_app/immutable/chunks/BRfSnfG9.js","_app/immutable/chunks/BCgzipj2.js","_app/immutable/chunks/hdG8LYG1.js","_app/immutable/chunks/DcoUKV6N.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(start)",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/[page=support]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"support","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/[page=privacy]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"privacy","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/[page=imprint]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"imprint","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/[page=current_edition]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"current_edition","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/[page=contact]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"contact","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/[page=association]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"association","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[page=archive]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"archive","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/[page=current_edition]/event/[slug]",
				pattern: /^\/([^/]+?)\/event\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"current_edition","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[page=archive]/[year]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"archive","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[page=archive]/[year]/event/[slug]",
				pattern: /^\/([^/]+?)\/([^/]+?)\/event\/([^/]+?)\/?$/,
				params: [{"name":"page","matcher":"archive","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			const { match: support } = await import ('./entries/matchers/support.js')
			const { match: privacy } = await import ('./entries/matchers/privacy.js')
			const { match: imprint } = await import ('./entries/matchers/imprint.js')
			const { match: current_edition } = await import ('./entries/matchers/current_edition.js')
			const { match: contact } = await import ('./entries/matchers/contact.js')
			const { match: association } = await import ('./entries/matchers/association.js')
			const { match: archive } = await import ('./entries/matchers/archive.js')
			return { support, privacy, imprint, current_edition, contact, association, archive };
		},
		server_assets: {}
	}
}
})();

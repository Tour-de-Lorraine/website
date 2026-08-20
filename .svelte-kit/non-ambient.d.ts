
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/(start)" | "/" | "/[page=support]" | "/[page=privacy]" | "/[page=imprint]" | "/[page=current_edition]" | "/[page=contact]" | "/[page=association]" | "/[page=archive]" | "/[page=current_edition]/event" | "/[page=current_edition]/event/[slug]" | "/[page=archive]/[year]" | "/[page=archive]/[year]/event" | "/[page=archive]/[year]/event/[slug]";
		RouteParams(): {
			"/[page=support]": { page: MatcherParam<typeof import('../src/params/support.js').match> };
			"/[page=privacy]": { page: MatcherParam<typeof import('../src/params/privacy.js').match> };
			"/[page=imprint]": { page: MatcherParam<typeof import('../src/params/imprint.js').match> };
			"/[page=current_edition]": { page: MatcherParam<typeof import('../src/params/current_edition.js').match> };
			"/[page=contact]": { page: MatcherParam<typeof import('../src/params/contact.js').match> };
			"/[page=association]": { page: MatcherParam<typeof import('../src/params/association.js').match> };
			"/[page=archive]": { page: MatcherParam<typeof import('../src/params/archive.js').match> };
			"/[page=current_edition]/event": { page: MatcherParam<typeof import('../src/params/current_edition.js').match> };
			"/[page=current_edition]/event/[slug]": { page: MatcherParam<typeof import('../src/params/current_edition.js').match>; slug: string };
			"/[page=archive]/[year]": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year: string };
			"/[page=archive]/[year]/event": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year: string };
			"/[page=archive]/[year]/event/[slug]": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year: string; slug: string }
		};
		LayoutParams(): {
			"/(start)": Record<string, never>;
			"/": { page?: MatcherParam<typeof import('../src/params/support.js').match> | MatcherParam<typeof import('../src/params/privacy.js').match> | MatcherParam<typeof import('../src/params/imprint.js').match> | MatcherParam<typeof import('../src/params/current_edition.js').match> | MatcherParam<typeof import('../src/params/contact.js').match> | MatcherParam<typeof import('../src/params/association.js').match> | MatcherParam<typeof import('../src/params/archive.js').match> | undefined; slug?: string | undefined; year?: string | undefined };
			"/[page=support]": { page: MatcherParam<typeof import('../src/params/support.js').match> };
			"/[page=privacy]": { page: MatcherParam<typeof import('../src/params/privacy.js').match> };
			"/[page=imprint]": { page: MatcherParam<typeof import('../src/params/imprint.js').match> };
			"/[page=current_edition]": { page: MatcherParam<typeof import('../src/params/current_edition.js').match>; slug?: string | undefined };
			"/[page=contact]": { page: MatcherParam<typeof import('../src/params/contact.js').match> };
			"/[page=association]": { page: MatcherParam<typeof import('../src/params/association.js').match> };
			"/[page=archive]": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year?: string | undefined; slug?: string | undefined };
			"/[page=current_edition]/event": { page: MatcherParam<typeof import('../src/params/current_edition.js').match>; slug?: string | undefined };
			"/[page=current_edition]/event/[slug]": { page: MatcherParam<typeof import('../src/params/current_edition.js').match>; slug: string };
			"/[page=archive]/[year]": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year: string; slug?: string | undefined };
			"/[page=archive]/[year]/event": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year: string; slug?: string | undefined };
			"/[page=archive]/[year]/event/[slug]": { page: MatcherParam<typeof import('../src/params/archive.js').match>; year: string; slug: string }
		};
		Pathname(): "/" | `/${string}` & {} | `/${string}/event/${string}` & {} | `/${string}/${string}` & {} | `/${string}/${string}/event/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/assets/favicons/favicon-16x16.png" | "/assets/favicons/favicon-180x180.png" | "/assets/favicons/favicon-192x192.png" | "/assets/favicons/favicon-32x32.png" | "/assets/favicons/favicon-512x512.png" | "/assets/favicons/favicon.ico" | "/assets/fonts/MZ-OTR-Grotesk-144-Bold-italic.woff" | "/assets/fonts/MZ-OTR-Grotesk-144-Bold-italic.woff2" | "/assets/fonts/MZ-OTR-Grotesk-144-Bold.woff" | "/assets/fonts/MZ-OTR-Grotesk-144-Bold.woff2" | "/assets/fonts/MZ-OTR-Grotesk-96-Regular-Italic.woff" | "/assets/fonts/MZ-OTR-Grotesk-96-Regular-Italic.woff2" | "/assets/fonts/MZ-OTR-Grotesk-96-Regular.woff" | "/assets/fonts/MZ-OTR-Grotesk-96-Regular.woff2" | "/assets/images/tdl_tickets.png" | "/assets/tdlVisual/lottieFiles/visual-tall-1.json" | "/assets/tdlVisual/lottieFiles/visual-tall-2.json" | "/assets/tdlVisual/lottieFiles/visual-wide-1.json" | "/assets/tdlVisual/lottieFiles/visual-wide-2.json" | "/assets/tdlVisual/videos/TdL_Lottie_Desktop_Teil_1+2_Ansicht.mp4" | "/assets/tdlVisual/videos/TdL_Lottie_Mobile_Teil_1+2_Ansicht.mp4" | "/assets/tdlVisual/videos/visual-tall-1.mp4" | "/assets/tdlVisual/videos/visual-tall-1.webm" | "/assets/tdlVisual/videos/visual-tall-2.mp4" | "/assets/tdlVisual/videos/visual-tall-2.webm" | "/assets/tdlVisual/videos/visual-tall-sw-1.mp4" | "/assets/tdlVisual/videos/visual-tall-sw-2.mp4" | "/assets/tdlVisual/videos/visual-wide-1.mp4" | "/assets/tdlVisual/videos/visual-wide-1.webm" | "/assets/tdlVisual/videos/visual-wide-2.mp4" | "/assets/tdlVisual/videos/visual-wide-2.webm" | "/assets/tdlVisual/videos/visual-wide-sw-1.mp4" | "/assets/tdlVisual/videos/visual-wide-sw-2.mp4" | "/assets/webComponents/drawer.js" | "/assets/webComponents/drawerGroup.js" | "/assets/webComponents/gallery.js" | string & {};
	}
}
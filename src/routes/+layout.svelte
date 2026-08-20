<script>
	import '$lib/styles/0-normalize.scss';
	import '$lib/styles/1-text.scss';
	import '$lib/styles/2-globals.scss';
	import '$lib/styles/3-elements.scss';
	import '$lib/styles/4-layout.scss';
	import '$lib/styles/5-webComponents.scss';

	import {page} from '$app/stores';
	import {browser} from '$app/environment';

	import GetScrollbarWidth from '$lib/components/bits/GetScrollbarWidth.svelte';
	import Favicon from '$lib/components/bits/Favicon.svelte';
	import {onMount, setContext} from 'svelte';

	const {data = {}, children} = $props();
	const {settings = {}, navigation = {}, currentEdition = null} = $derived(data || {});

	setContext('site', {
		get navigation() { return data?.navigation || {}; },
		get settings() { return data?.settings || {}; },
		get currentEdition() { return data?.currentEdition || null; },
	});

	$effect(() => {
		if (!browser) return;

		if (!$page?.url?.hash) {
			document.getElementById('scroll')?.style?.setProperty('scroll-behavior', 'auto');
			window.scrollTo({top: 0});
		}

		let timeout = setTimeout(() => {
			document.getElementById('scroll')?.style?.setProperty('scroll-behavior', 'smooth');
		}, 500);
		return () => {
			clearTimeout(timeout);
		};
	});

	onMount(() => {
		if (!browser) return;
		const {themeColor1, themeColor2} = settings;
		document.body.style.setProperty('--color-theme-1', themeColor1);
		document.body.style.setProperty('--color-theme-2', themeColor2);
	});
</script>

<div>
	{#if settings?.displayTicketing}
		<a href={settings?.ticketingLink || '#'} target="_blank">
			<img src="/assets/images/tdl_tickets.png" class="floating-tickets" alt="Tickets">
		</a>
	{/if}
</div>

<div class="SITE" data-route={$page.params.page}>
	{#if children}
		{@render children()}
	{/if}
</div>

<GetScrollbarWidth></GetScrollbarWidth>
<Favicon></Favicon>

<style lang="scss" global>
	html {
		scroll-behavior: smooth;
	}

	body {
		padding: var(--header-height) var(--page-padding-x) 0 var(--page-padding-x);
	}

	.SITE {
		min-height: calc(100vh - var(--header-height));
		display: flex;
		flex-direction: column;

		> * {
			isolation: isolate;
		}

		> nav {
			z-index: 100;
		}

		> header {
			z-index: 80;
		}

		> .banner._archive {
			z-index: 70;
		}

		> main {
			z-index: 60;
		}
		> footer {
			z-index: 60;
		}
	}
</style>

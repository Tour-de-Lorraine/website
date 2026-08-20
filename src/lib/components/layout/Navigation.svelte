<script>
	import {browser} from '$app/environment';
	import {page} from '$app/stores';
	import {getContext} from 'svelte';
	import routesById from '/src/config/routes.js';

	const site = getContext('site');
	const {navigation = [], currentEdition} = site;

	let {isVisible = false, setShowNavigation} = $props();

	$effect(() => {
		if (!browser) return;
	});

	function catchTabbingOff(N) {
		const handleTab = (e) => {
			if (N.contains(e.relatedTarget) === false) setShowNavigation(false);
		};

		N.addEventListener('blur', handleTab, {capture: true});

		return {
			destroy() {
				N.removeEventListener('blur', handleTab, {capture: true});
			},
		};
	}
</script>

<nav class="PAGE-NAVIGATION" data-is-visible={isVisible} use:catchTabbingOff>
	<ul class="_navItems">
		{#each navigation as navItem}
			{#if navItem.isActive && navItem.inMainNavigation && routesById[navItem.id]}
				{@const route = routesById[navItem.id]}
				{@const routeTranslations = route.translations}
				{@const pageTranslations = navItem?.metaTranslations?.[0]}
				{@const pageSlug = routeTranslations.de}
				{@const sections = navItem.sections.filter((navItem) => navItem?.item?.isMenuItem)}

				<li data-id={navItem.id} data-is-current={$page.params.page === pageSlug}>
					<a href="/{pageSlug}" data-as="link-2"
						>{pageTranslations?.title}
						{navItem.id === 'current_edition'
							? currentEdition?.edition?.year || ''
							: ''}
					</a>

					{#if sections.length}
						<ul class="_navSubItems">
							{#each sections as subItem}
								{@const translations = subItem?.item?.translations?.[0] || {}}
								{@const sectionTitle = translations?.title}
								{@const sectionSlug = translations?.slug}
								<li>
									<a href="/{pageSlug}/#{sectionSlug}" data-as="link-2">
										{sectionTitle}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style lang="scss">
	.PAGE-NAVIGATION {
		width: 100vw; // hide scrollbar
		---height: 100vh;
		---height: 100svh;
		height: calc(var(---height) - var(--header-height));
		font-size: var(--font-size-l);
		position: fixed;
		inset: 0;
		top: var(--header-height);
		display: flex;
		justify-content: center;
		overflow-y: auto;
		overscroll-behavior: contain;
		transition-property: opacity, transform;
		transition: var(--ms-toggleNavigation);
		transform: scale(0) translateY(calc(-1 * var(--header-height)));
		transform-origin: top right;
		opacity: 0;
		visibility: hidden;
	}

	ul {
		display: flex;
		flex-direction: column;
	}

	li,
	a {
		text-align: center;
	}

	._navItems {
		padding: 10vh 0;
		height: fit-content;
		gap: var(--size-l);
		> li {
			&[data-is-current='true'] > a {
				text-decoration: underline;
			}
		}
	}

	._navSubItems {
		[data-as='link-2'] {
			font-weight: 400;
			text-transform: unset;
		}
	}

	[data-is-visible='true'] {
		visibility: visible;
		opacity: 1;
		transform: scale(1) translateY(0);
	}
</style>

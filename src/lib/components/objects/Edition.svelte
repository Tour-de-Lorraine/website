<script>
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import DetailsList from '$lib/components/objects/DetailsList.svelte';
	import EventsList from '$lib/components/objects/EventsList.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import Visual from '$lib/components/objects/VidualEdition.svelte';
	import Icon from '$lib/components/bits/Icon.svelte';
	import {page} from '$app/stores';
	import Anchor from '$lib/components/bits/Anchor.svelte';

	const {data, ...attributes} = $props();

	const details = $derived(data?.details?.map((detail) => {
		if (detail?.item?.type === 'ele_details__drawer') {
			detail.item.isOpen = true;
		}
		return detail;
	}));
</script>

<div class="EDITION" {...attributes}>
	{#if details && details.length}
		<Hero>
			<div data-layout="1-1 rsp-1">
				<div class="column _1">
					{#if data?.visual}
						<Visual data={data?.visual}></Visual>
					{/if}
				</div>
				<div class="column _2">
					<DetailsList data={details}>
						{#snippet childrenBefore()}
							<a
								class="_toEvents"
								href="{$page.url.pathname === '/'
									? ''
									: $page.url.pathname}/#events"
								title="Zum Programm scrollen"
							>
								<div class="label">
									Programm {data?.year}
								</div>
								<Icon name="arrow"></Icon>
							</a>
						{/snippet}
					</DetailsList>
				</div>
			</div>
		</Hero>

		<PageSections>
			<section class="_events">
				<Anchor id="events"></Anchor>
				<div class="_content">
					<EventsList data={data?.events}></EventsList>
				</div>
			</section>
		</PageSections>
	{/if}
</div>

<style lang="scss">
	.EDITION {
		display: contents;

		:global(.HERO) {
			height: auto;
			min-height: var(--hero-height);

			:global([data-layout='1-1 rsp-1']) {
				padding-top: calc(3 * var(--size-s));
				height: auto;

				:global(.column._1) {
					max-height: var(--hero-height);
					:global(img) {
						object-fit: contain !important;
						object-position: center top;
					}
				}
			}
		}
	}

	section._events ._content {
		display: flex;
		flex-direction: column;
		gap: var(--size-2xl);
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	@media (width <= $bp-s-maxWidth) {
	}
</style>

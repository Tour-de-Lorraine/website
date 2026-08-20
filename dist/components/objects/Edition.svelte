<script>
	import PageSections from '../layout/PageSections.svelte';
	import DetailsList from './DetailsList.svelte';
	import EventsList from './EventsList.svelte';
	import Hero from '../layout/Hero.svelte';
	import Visual from './VidualEdition.svelte';
	import Icon from '../bits/Icon.svelte';
	import {page} from '$app/stores';
	import Anchor from '../bits/Anchor.svelte';

	const {data, ...attributes} = $props();

	const details = data?.details?.map((detail) => {
		if (detail?.item?.type === 'ele_details__drawer') {
			detail.item.isOpen = true;
		}
		return detail;
	});
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

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.EDITION {
  display: contents;
}
.EDITION :global(.HERO) {
  height: auto;
  min-height: var(--hero-height);
}
.EDITION :global(.HERO) :global([data-layout="1-1 rsp-1"]) {
  padding-top: calc(3 * var(--size-s));
  height: auto;
}
.EDITION :global(.HERO) :global([data-layout="1-1 rsp-1"]) :global(.column._1) {
  max-height: var(--hero-height);
}
.EDITION :global(.HERO) :global([data-layout="1-1 rsp-1"]) :global(.column._1) :global(img) {
  object-fit: contain !important;
  object-position: center top;
}

section._events ._content {
  display: flex;
  flex-direction: column;
  gap: var(--size-2xl);
}

/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/</style>

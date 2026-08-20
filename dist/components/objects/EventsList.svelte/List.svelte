<script>
	import Icon from '../../bits/Icon.svelte';
	import EventIssues from '../EventIssues.svelte';
	import EventAttributes from '../EventAttributes.svelte';
	import EventCategories from '../EventCategories.svelte';
	let {data} = $props();

	import {page} from '$app/stores';

	import {onDestroy} from 'svelte';
	let eventBaseUrl = $state('');
	const unsubPage = page.subscribe(($page) => {
		if ($page?.url?.pathname?.startsWith('/archiv')) {
			eventBaseUrl = $page.url.pathname;
		} else {
			eventBaseUrl = '/programm';
		}
	});

	onDestroy(() => {
		unsubPage();
	});
</script>

<ul class="EVENTS">
	{#key data}
		{#if data.length}
			{#each data as event, i}
				{@const {title, slug} = event.translations[0]}

				<li class="_event" id="i-{i}">
					<h3>
						<a class="_toEvent" href="{eventBaseUrl}/event/{slug}" data-as="link-2">
							{title}
						</a>
					</h3>

					<EventIssues data={event.issues}></EventIssues>
					<EventCategories data={event.categories}></EventCategories>

					<div class="_bottom">
						<EventAttributes data={event.attributes}></EventAttributes>
						<a class="_toEvent" href="{eventBaseUrl}/event/{slug}" data-as="link-2">
							<div class="_semanticLabel">mehr Infos</div>
							<Icon name="arrow"></Icon>
						</a>
						<div class="_visibleLabel">mehr Infos</div>
					</div>
				</li>
			{/each}
		{:else}
			<li class="if :noEvents">
				<div class="if :isFiltered">Kein Event zu diesem Filter gefunden.</div>
				<div class="else">Keine Events.</div>
			</li>
		{/if}
	{/key}
</ul>

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.EVENTS) {
  display: flex;
  flex-direction: column;
  gap: var(--size-l);
  min-height: 100vh;
}
:global(.EVENTS) > :global(._event) {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-block: var(--size-xs);
  font-size: var(--font-size-l);
}
:global(.EVENTS) > :global(._event::after) {
  content: "";
  display: block;
  height: var(--line-width);
  background-color: currentColor;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  transform: scale(1.0000001);
}
:global(.EVENTS) > :global(._event) :global(h3) {
  text-align: center;
}
:global(.EVENTS) > :global(._event) :global(.EVENT-ISSUES) :global(li) {
  justify-content: center;
}
:global(.EVENTS) > :global(._event) :global(.EVENT-ISSUES) :global(li) :global(*) {
  text-align: center;
}
:global(.EVENTS) > :global(._event) :global(.EVENT-CATEGORIES) {
  max-width: 60ch;
  text-align: center;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto;
  position: relative;
  margin-top: 0.2em;
  padding: var(--box-padding);
}
:global(.EVENTS) > :global(._event) > :global(._bottom::before) {
  content: "";
  display: block;
  position: absolute;
  height: var(--line-width);
  background-color: currentColor;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  transform: scale(1.0000001);
}
:global(.EVENTS) > :global(._event) > :global(._bottom) > :global(*) {
  margin-top: auto;
  grid-column: 1;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(.EVENT-ATTRIBUTES) {
  flex-wrap: wrap-reverse;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(.EVENT-ATTRIBUTES) :global(li) {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(._visibleLabel) {
  grid-column: 2;
  font-weight: 600;
  font-size: var(--font-size-m);
  text-align: center;
  text-transform: uppercase;
  pointer-events: none;
  margin: auto;
  padding-top: 0.2em;
  line-height: 1;
  position: relative;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:active),
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:focus),
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:hover) {
  outline: none;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:active) + :global(._visibleLabel),
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:focus) + :global(._visibleLabel),
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:hover) + :global(._visibleLabel) {
  text-decoration: underline;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:active) + :global(._visibleLabel::after),
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:focus) + :global(._visibleLabel::after),
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a:hover) + :global(._visibleLabel::after) {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  border: var(--outlineActive-width) var(--outlineActive-style) currentColor;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a._toEvent) {
  grid-column: 2/span 2;
  display: flex;
  --icon-size: var(--icon-size-m);
  justify-content: center;
  height: 100%;
  position: absolute;
  inset: 0;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a._toEvent) :global(._semanticLabel) {
  opacity: 0;
}
:global(.EVENTS) > :global(._event) > :global(._bottom) :global(a._toEvent) :global(.icon) {
  position: absolute;
  grid-column: 2;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
:global(.EVENTS) :global(.if.\:noEvents) {
  text-align: center;
}
:global(.EVENTS) :global(.if.\:noEvents) > :global(.if.\:isFiltered) {
  display: none;
}
:global(.EVENTS) :global(.if.\:noEvents) > :global(.else) {
  display: block;
}

:global([data-is-filtered=true]) :global(.if.\:noEvents) > :global(.if.\:isFiltered) {
  display: block;
}
:global([data-is-filtered=true]) :global(.if.\:noEvents) > :global(.else) {
  display: none;
}

/* Responsive
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
@media (width <= 900px) {
  :global(.EVENTS) > :global(._event) > :global(._bottom) {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
  }
}</style>

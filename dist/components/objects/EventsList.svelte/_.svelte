<script>
	import List from './List.svelte';
	import Filter from './Filter.svelte';
	const {data} = $props();

	let isFiltered = $state(false);
	const setIsFiltered = (value) => (isFiltered = value);
	let matchingIds = $state([]);
	const setMatches = (eventIds) => (matchingIds = eventIds);

	const maybeFiltered = $derived.by(() => {
		if (isFiltered) return matchingIds.map((id) => data.all.find((event) => event.id === id));
		else return data.all;
	});

	const hasEvents = data?.all?.length > 0;
</script>

<div class="EVENTS-LIST" data-is-filtered={isFiltered} data-has-events={hasEvents}>
	{#if hasEvents}
		<Filter {data} {setIsFiltered} {setMatches}></Filter>
	{/if}
	<List data={maybeFiltered}></List>
</div>

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.EVENTS-LIST {
  display: flex;
  flex-direction: column;
  gap: var(--size-xl);
}
.EVENTS-LIST :global(.FILTER) {
  z-index: var(--z-front);
}

/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
@media (width <= 600px) {
  .EVENTS-LIST {
    gap: var(--size-l);
  }
}</style>

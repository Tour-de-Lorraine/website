<script>
	import PageSectionBasic from './PageSectionBasic.svelte';
	const {children, data = []} = $props();
</script>

<div class="PAGE-SECTIONS">
	{#if children}
		{@render children()}
	{/if}
	{#each data as section}
		<PageSectionBasic data={section.item}></PageSectionBasic>
	{/each}
</div>

<style lang="scss">
	.PAGE-SECTIONS {
		display: flex;
		flex-direction: column;
		gap: calc(3 * var(--size-l));
		margin-top: calc(3 * var(--size-s));
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	@media (width <= $bp-s-maxWidth) {
		.PAGE-SECTIONS {
			gap: calc(3 * var(--size-m));
		}
	}
</style>

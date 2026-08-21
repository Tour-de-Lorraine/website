<script>
	import Page from '$lib/components/layout/Page.svelte';
	import Edition from '$lib/components/objects/Edition.svelte';
	const {data} = $props();

	const currentEdition = $derived(data?.currentEdition);
</script>

<Page {data}>
	{#if currentEdition}
		<Edition data={currentEdition} data-is-current-edition={true}></Edition>
	{/if}
</Page>

<style lang="scss">
</style>

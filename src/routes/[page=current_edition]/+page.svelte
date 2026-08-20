<script>
	import Page from '$lib/components/layout/Page.svelte';
	import Edition from '$lib/components/objects/Edition.svelte';
	const props = $props();
	const data = props.data;

	const currentEdition = data?.currentEdition;
</script>

<Page {data}>
	{#if currentEdition}
		<Edition data={currentEdition} data-is-current-edition={true}></Edition>
	{/if}
</Page>

<style lang="scss">
</style>

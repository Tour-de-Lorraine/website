<script>
	import Page from '$lib/components/layout/Page.svelte';
	import Edition from '$lib/components/objects/Edition.svelte';
	const {data} = $props();

	const edition = data?.edition;
</script>

<Page {data}>
	{#if edition}
		<Edition data={edition}></Edition>
	{/if}
</Page>

<style lang="scss">
</style>

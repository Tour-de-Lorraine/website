<script>
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	const {data} = $props();
</script>

<Page {data}>
	<PageSections data={data?.sections || []}></PageSections>
</Page>

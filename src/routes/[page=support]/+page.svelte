<script>
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	const props = $props();
	const data = props.data;
</script>

<Page {data}>
	<PageSections data={data?.sections || []}></PageSections>
</Page>

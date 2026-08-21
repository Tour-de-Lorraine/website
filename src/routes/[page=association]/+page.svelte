<script>
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import TdlVisual from '$lib/components/objects/TdlVisual.svelte';

	const {data} = $props();
</script>

<Page {data}>
	<Hero data-use-background="true" data-is-fullwidth="true">
		<TdlVisual></TdlVisual>
	</Hero>

	<PageSections data={data?.sections || []}></PageSections>
</Page>

<style lang="scss">
</style>

<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Hero from './Hero.svelte';

	const props = $props();
	const children = props?.children;

	const data = props.data;
	const {title = '', description = ''} = data?.metaTranslations?.[0] || {};
</script>

<svelte:head>
	<title>{title ? `${title} - ` : ''}Tour de Lorraine</title>
	<meta name="description" content={description ? description : 'Tour de Lorraine'} />
</svelte:head>

<Header></Header>

<main class="PAGE-CONTENT">
	{#if data?.hero}
		<Hero data={data.hero} data-is-fullwidth="true"></Hero>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</main>

<Footer></Footer>

<style lang="scss" global>
	main {
		isolation: isolate;
		position: relative;
		flex: 1;
	}

	main,
	:global(footer) {
		width: 100%;
		max-width: var(--page-maxWidth);
		margin-left: auto;
		margin-right: auto;
	}
</style>

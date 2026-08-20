<script>
	import Badge from '../bits/Badge.svelte';
	let {data} = $props();

	const attributes = $derived(data.map((attr) => attr.junction));
</script>

<ul class="EVENT-ATTRIBUTES" data-as="badges-list" aria-label="Zugänglichkeit des Events">
	{#each attributes as { iconKey, translations }}
		{@const text = `Dieser Event ist ${translations[0].name}`}
		<li class="_attribute" aria-label={text}>
			<Badge icon={iconKey} {text}></Badge>
		</li>
	{/each}
</ul>

<style lang="scss">
</style>

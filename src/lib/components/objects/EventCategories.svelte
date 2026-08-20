<script>
	const {data} = $props();
	const categories = data.map((cat) => cat.junction.translations[0]);
</script>

<ul class="EVENT-CATEGORIES">
	{#each categories as category}
		{@const {name} = category || {}}
		<li>{name}</li>
	{/each}
</ul>

<style lang="scss">
	.EVENT-CATEGORIES {
		text-wrap: balance;
		li {
			display: inline-block;
		}

		li:not(:last-child)::after {
			content: ', ';
			white-space: pre;
		}
	}
</style>

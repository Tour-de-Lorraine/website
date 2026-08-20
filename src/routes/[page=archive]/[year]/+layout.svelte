<script>
	const {children} = $props();
</script>

<div class="banner _archive">
	<div class="_inner">Archiv</div>
</div>

{#if children}
	{@render children()}
{/if}

<style lang="scss">
	.banner._archive {
		background-color: black;
		color: white;
		position: fixed;
		top: var(--header-height);
		height: var(--header-height);
		padding: var(--header-padding);
		width: 100vw;
		margin-left: -50%;
		left: 50%;
		font-weight: 700;
		text-transform: uppercase;
		line-height: 1;
		display: flex;
		align-items: center;

		~ :global(.PAGE-CONTENT) {
			margin-top: var(--header-height);
		}
	}
</style>

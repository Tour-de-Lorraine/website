<script>
	const {id} = $props();
	// const id_slugified = id
	// 	.toLowerCase()
	// 	.replaceAll(/[^a-z1-9äöü\-_]/g, '')
	// 	.replaceAll(/\d/g, '-')
	// 	.replaceAll('ä', 'ae')
	// 	.replaceAll('ö', 'oe')
	// 	.replaceAll('ü', 'ue');
</script>

<div class="ANCHOR">
	<div {id}></div>
</div>

<style global lang="scss">
	.ANCHOR {
		position: relative;
		pointer-events: none;
		div {
			position: absolute;
			top: calc(-1 * var(--header-height) - var(--size-m));
		}
	}
</style>

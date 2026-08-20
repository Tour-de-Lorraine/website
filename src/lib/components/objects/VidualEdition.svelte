<script>
	import Picture from './Picture.svelte';
	import Video from './Video.svelte';
	const {data} = $props();
	const {image, useVideo} = $derived(data || {});
</script>

<div class="VISUAL" data-type={useVideo ? 'video' : 'image'}>
	{#if useVideo}
		<Video {data}></Video>
	{:else}
		<Picture data={image}></Picture>
	{/if}
</div>

<style>
	.VISUAL {
		height: 100%;
		width: 100%;
		position: relative;
	}
</style>

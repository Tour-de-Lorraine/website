<script>
	import Picture from '../objects/Picture.svelte';
	import Video from '../objects/Video.svelte';
	const {children, data, ...attributes} = $props();

	const gotData = $derived(typeof data === 'object' && Array.isArray(data) === false && data !== null);

	const imageFromData = $derived(gotData && 'image' in data);
	const videoFromData = $derived(gotData && data?.useVideo && 'video' in data && data?.useVideo);
</script>

<div class="HERO" {...attributes} data-has-video={videoFromData}>
	<div class="_inner">
		{#if videoFromData}
			<Video data={{video: data.video, image: data?.image}} attributes={{loop: true}}></Video>
		{:else if imageFromData}
			<Picture data={data.image} size="fullwidth"></Picture>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>

<style lang="scss">
	.HERO {
		height: var(--hero-height);
		position: relative;

		display: flex;
		justify-content: center;

		> div {
			width: 100%;
			max-width: var(--page-maxWidth);
		}

		&[data-is-fullwidth='true'] {
			---width: calc(var(--document-width) + 2px);
			width: var(---width);
			left: calc(var(---width) / -2);
			margin-left: 50%;
		}

		&[data-use-background='true'] {
			background-color: var(--color-theme-1);
		}

		&[data-has-video='true'] {
			background-color: black;
			:global(video) {
				object-position: center;
				object-fit: cover;
			}
		}

		:global(picture) {
			:global(img) {
				object-fit: cover;
			}
		}

		:global(figcaption) {
			color: black;
			position: absolute;
			bottom: -1px;
			left: 0;
			background-color: white;
			padding: 0.2em 0.4em;
			margin-inline: var(--page-padding-x);
			font-size: var(--figcaption-fontSize);
		}
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	@media (width <= $bp-s-maxWidth) {
		.HERO {
			:global(figcaption) {
				margin-inline: 0px;
				padding-inline: var(--page-padding-x);
			}
		}
	}
</style>

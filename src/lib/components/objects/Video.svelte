<script>
	const {data, attributes = {}} = $props();
	const video = data?.video?.translations?.[0] || {};
	const image = data?.image.image || {};
	const {title, caption, altText, videoLarge, videoMiddle, videoSmall} = video;

	const responsiveVideos = [];
	if (videoLarge !== null) responsiveVideos.push('l');
	if (videoMiddle !== null) responsiveVideos.push('m');
	if (videoSmall !== null) responsiveVideos.push('s');

	function load(N) {
		N.children[0].src = N.dataset.src;
		requestAnimationFrame(() => {
			N.load();
		});
	}
</script>

<figure
	class="VIDEO"
	data-use-responsive={video.useResponsive}
	data-responsive-videos={responsiveVideos.join(' ')}
	data-has-video={responsiveVideos.length > 0}
	role="presentation"
	aria-label={altText}
>
	{#snippet vid(size, video)}
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			data-size={size}
			{title}
			muted
			autoplay
			playsinline
			data-src="/assets/{video.id}"
			oncanplay={(e) => (e.target.dataset.canPlayThrough = true)}
			{...attributes}
			height="1000"
			width="1000"
			use:load
		>
			<source type={video.type} />
			{#if altText}
				<p>
					{altText}
				</p>
			{/if}
		</video>
	{/snippet}

	{#if videoLarge}
		{@render vid('l', videoLarge)}
	{/if}
	{#if videoMiddle}
		{@render vid('m', videoMiddle)}
	{/if}
	{#if videoSmall}
		{@render vid('s', videoSmall)}
	{/if}

	<picture>
		<img src="/assets/{image.id}" alt={altText} />
	</picture>

	<figcaption>{caption?.length ? caption : ''}</figcaption>
</figure>

<style lang="scss" global>
	.VIDEO {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;

		video {
			height: 100%;
			width: 100%;
			pointer-events: none;
		}

		[data-can-play-through='true'] ~ picture {
			display: none;
		}

		picture {
			position: relative;
			inset: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			* {
				width: inherit;
				height: inherit;
				object-fit: contain;
			}
		}

		figcaption {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		figcaption:empty {
			display: none;
		}
	}

	[data-has-video='true'] {
		picture {
			position: absolute;
		}
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	[data-use-responsive='true'] {
		video {
			display: none;
		}

		@media (width > $bp-m-maxWidth) {
			video[data-size='l'] {
				display: block;
			}
		}

		@media (width <= $bp-m-maxWidth) and (width > $bp-s-maxWidth) {
			video[data-size='m'] {
				display: block;
			}
		}

		@media (width <= $bp-s-maxWidth) {
			video[data-size='s'] {
				display: block;
			}
		}
	}
</style>

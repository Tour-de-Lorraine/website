<script>
	import {PUBLIC_DIRECTUS_URL} from '$env/static/public';
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
			data-src="{PUBLIC_DIRECTUS_URL}/assets/{video.id}"
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
		<img src="{PUBLIC_DIRECTUS_URL}/assets/{image.id}" alt={altText} />
	</picture>

	<figcaption>{caption?.length ? caption : ''}</figcaption>
</figure>

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.VIDEO) {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
}
:global(.VIDEO) :global(video) {
  height: 100%;
  width: 100%;
  pointer-events: none;
}
:global(.VIDEO) :global([data-can-play-through=true]) ~ :global(picture) {
  display: none;
}
:global(.VIDEO) :global(picture) {
  position: relative;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
:global(.VIDEO) :global(picture) :global(*) {
  width: inherit;
  height: inherit;
  object-fit: contain;
}
:global(.VIDEO) :global(figcaption) {
  display: flex;
  justify-content: center;
  align-items: center;
}
:global(.VIDEO) :global(figcaption:empty) {
  display: none;
}

:global([data-has-video=true]) :global(picture) {
  position: absolute;
}

/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global([data-use-responsive=true]) :global(video) {
  display: none;
}
@media (width > 900px) {
  :global([data-use-responsive=true]) :global(video[data-size=l]) {
    display: block;
  }
}
@media (width <= 900px) and (width > 600px) {
  :global([data-use-responsive=true]) :global(video[data-size=m]) {
    display: block;
  }
}
@media (width <= 600px) {
  :global([data-use-responsive=true]) :global(video[data-size=s]) {
    display: block;
  }
}</style>

<script>
	import Icon from '../bits/Icon.svelte';
	import Picture from './Picture.svelte';
	const {data} = $props();
</script>

<div class="IMAGES">
	<c-gallery mode={data.length > 1 ? 'slideshow' : 'singles'}>
		<div class="content" slot="images">
			{#each data as { eleImagesId }}
				<Picture data={eleImagesId}></Picture>
			{/each}
		</div>

		<nav slot="navigation">
			<div class="_status">
				<span data-insert="currentIndex"></span>/<span data-insert="imageCount"></span>
			</div>
			<button class="_next" title="Nächstes Bild">
				<div class="_inner">
					<Icon name="arrow"></Icon>
				</div>
			</button>
		</nav>
	</c-gallery>
</div>

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.IMAGES) {
  position: relative;
}

:global(c-gallery[mode=slideshow]) {
  ---galleryNavigation-height: var(--size-l);
}
:global(c-gallery[mode=slideshow]) :global(nav),
:global(c-gallery[mode=slideshow]) :global(figcaption) {
  font-size: var(--font-size-m);
}
:global(c-gallery[mode=slideshow]) :global(nav) {
  display: flex;
  position: absolute;
  inset: 0;
  pointer-events: none;
}
:global(c-gallery[mode=slideshow]) :global(nav) > :global(*) {
  margin-top: auto;
  pointer-events: all;
}
:global(c-gallery[mode=slideshow]) :global(._status) {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  height: var(---galleryNavigation-height);
}
:global(c-gallery[mode=slideshow]) :global(button) {
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
:global(c-gallery[mode=slideshow]) :global(button._prev) :global(.icon) {
  transform: rotate(180deg);
}
:global(c-gallery[mode=slideshow]) :global(button._next) {
  margin-left: auto;
  justify-content: flex-end;
}
:global(c-gallery[mode=slideshow]) :global(button) :global(._inner) {
  margin-top: auto;
  height: var(---galleryNavigation-height);
  display: flex;
  align-items: center;
}
:global(c-gallery[mode=slideshow]) :global(button) :global(.icon) {
  height: var(--icon-size-m);
}
:global(c-gallery[mode=slideshow]) :global(.content) {
  aspect-ratio: 1.4;
}
:global(c-gallery[mode=slideshow]) :global(picture) {
  max-height: calc(100% - var(---galleryNavigation-height));
}
:global(c-gallery[mode=slideshow]) :global(picture) :global(img) {
  object-fit: cover !important;
}
:global(c-gallery[mode=slideshow]) :global(figcaption) {
  height: var(---galleryNavigation-height);
}

:global(c-gallery[mode=singles]) :global(nav) {
  display: none;
}

/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/</style>

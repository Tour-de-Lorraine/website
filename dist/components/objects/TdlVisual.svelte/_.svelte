<script>
	import Animation from './Animation.svelte';
</script>

<div class="TDL-VISUAL">
	<div class="if :wide">
		<Animation>
			{#snippet SourceIn()}
				<!-- <source src="/assets/tdlVisual/videos/visual-wide-1.webm" /> -->
				<source src="/assets/tdlVisual/videos/visual-wide-sw-1.mp4" />
			{/snippet}
			{#snippet SourceOut()}
				<!-- <source src="/assets/tdlVisual/videos/visual-wide-2.webm" /> -->
				<source src="/assets/tdlVisual/videos/visual-wide-sw-2.mp4" />
			{/snippet}
		</Animation>
	</div>
	<div class="if :tall">
		<Animation>
			{#snippet SourceIn()}
				<!-- <source src="/assets/tdlVisual/videos/visual-tall-1.webm" /> -->
				<source src="/assets/tdlVisual/videos/visual-tall-sw-1.mp4" />
			{/snippet}
			{#snippet SourceOut()}
				<!-- <source src="/assets/tdlVisual/videos/visual-tall-2.webm" /> -->
				<source src="/assets/tdlVisual/videos/visual-tall-sw-2.mp4" />
			{/snippet}
		</Animation>
	</div>
</div>

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.TDL-VISUAL {
  height: var(--hero-height);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  font-weight: 600;
  line-height: 1;
}

.if.\:wide {
  display: contents;
}

.if.\:tall {
  display: none;
}

@media (max-aspect-ratio: 0.7) {
  .if.\:tall {
    display: contents;
  }
  .if.\:wide {
    display: none;
  }
}</style>

<script>
	let {isInflated = false} = $props();
	import {browser} from '$app/environment';

	let scrollbarWidth = $state(undefined);

	$effect(() => {
		if (!browser) return;
		if (isInflated && scrollbarWidth === undefined)
			scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
	});
</script>

<div
	class="BUBBLE _outer"
	style:--scrollbar-width="{scrollbarWidth || 0}px"
	data-is-inflated={isInflated}
>
	<div class="_inner">
		<div class="bubble _1" data-as="ellipse"></div>
		<div class="bubble _2" data-as="ellipse"></div>
	</div>
</div>

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.BUBBLE._outer {
  ---padding: 0em;
  transition: opacity 0ms var(--ms-toggleNavigation);
  height: 100%;
  width: 100%;
  padding: var(---padding);
  aspect-ratio: 3.4;
}

._inner {
  position: relative;
  height: 100%;
  width: 100%;
}

.bubble {
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: var(--color-theme-2);
}

.bubble._2 {
  position: absolute;
  transition-property: height, width, transform;
  transition-duration: var(--ms-toggleNavigation);
  transform: translate(calc(-1 * var(--origin-top)), var(--origin-right));
}

[data-is-inflated=true] .bubble._2 {
  ---heigth: 100vh;
  ---height: 100dvh;
  height: calc(var(---height) - var(--header-height));
  width: calc(100vw - var(--scrollbar-width, 0px));
  transform: translate(calc(1 * var(--header-padding-x)), calc(var(--header-height) - var(--header-padding-y)));
}</style>

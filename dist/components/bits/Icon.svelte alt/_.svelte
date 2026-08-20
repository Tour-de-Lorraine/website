<script>
	import Arrow from './icons/IconArrow.svelte';
	import Magnifier from './icons/IconMagnifier.svelte';
	import Menu from './icons/IconMenu.svelte';
	import People from './icons/IconPeople.svelte';
	import Plus from './icons/IconPlus.svelte';
	import Speechbubbles from './icons/IconSpeechbubbles.svelte';
	import Wheelchair from './icons/IconWheelchair.svelte';
	import X from './icons/IconX.svelte';

	const {name, attributes = {}} = $props();
	const icons = {
		arrow: Arrow,
		magnifier: Magnifier,
		menu: Menu,
		people: People,
		plus: Plus,
		speechbubbles: Speechbubbles,
		wheelchair: Wheelchair,
		x: X,
	};

	const Icon = icons?.[name];
</script>

<div class="icon _{name}">
	{#if Icon}
		<Icon {attributes}></Icon>
	{/if}
</div>

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.icon) {
  height: var(--icon-size, 2em);
  width: var(--icon-size, 2em);
  aspect-ratio: 1;
  position: relative;
  display: flex;
  /* size corrections
        */
}
:global(.icon) :global(svg) {
  margin: auto;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  overflow: visible;
}
:global(.icon) :global(svg) :global(*) {
  vector-effect: non-scaling-stroke;
  stroke-width: var(--line-width);
  transform: scale(1.00001);
}
:global(.icon._people) :global(svg) {
  width: 70%;
}
:global(.icon._wheelchair) :global(svg) {
  width: 60%;
}
:global(.icon._plus) :global(svg) {
  width: 70%;
}
:global(.icon._magnifier) :global(svg) {
  width: 80%;
}
:global(.icon._speechbubbles) {
  width: 120%;
}</style>

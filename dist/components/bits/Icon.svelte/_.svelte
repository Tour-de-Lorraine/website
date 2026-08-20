<script>
	import Arrow from './icons/IconArrow.svelte';
	import Magnifier from './icons/IconMagnifier.svelte';
	import Menu from './icons/IconMenu.svelte';
	import People from './icons/IconPeople.svelte';
	import Plus from './icons/IconPlus.svelte';
	import Speechbubbles from './icons/IconSpeechbubbles.svelte';
	import Wheelchair from './icons/IconWheelchair.svelte';
	import X from './icons/IconX.svelte';

	let {name, attributes = {}} = $props();
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
  width: auto;
  max-width: 100%;
  position: relative;
  display: flex;
}
:global(.icon) :global(svg) {
  margin: auto;
  height: 100%;
  width: auto;
  overflow: visible;
}
:global(.icon) :global(svg) :global(*) {
  vector-effect: non-scaling-stroke;
  stroke-width: var(--line-width);
  transform: scale(1.00001);
  stroke: currentColor;
}</style>

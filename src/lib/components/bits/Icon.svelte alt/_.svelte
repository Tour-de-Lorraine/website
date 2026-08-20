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

<style lang="scss" global>
	.icon {
		height: var(--icon-size, 2em);
		width: var(--icon-size, 2em);
		aspect-ratio: 1;
		position: relative;
		display: flex;

		svg {
			margin: auto;
			width: 100%;
			height: 100%;
			aspect-ratio: 1;
			overflow: visible;

			* {
				vector-effect: non-scaling-stroke;
				stroke-width: var(--line-width);
				transform: scale(1.00001);
			}
		}

		/* size corrections
        */

		&._people svg {
			width: 70%;
		}

		&._wheelchair svg {
			width: 60%;
		}

		&._plus svg {
			width: 70%;
		}

		&._magnifier svg {
			width: 80%;
		}

		&._speechbubbles {
			width: 120%;
		}
	}
</style>

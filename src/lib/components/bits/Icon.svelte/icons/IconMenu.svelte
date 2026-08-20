<script>
	import {getContext} from 'svelte';

	let {attributes} = $props();

	const menuIconState = getContext('menuIconState'); // "cross" or "burger"
</script>

<svg
	class="ICON _menu"
	width="320"
	height="160"
	viewBox="0 0 320 160"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	data-state={$menuIconState}
	{...attributes}
>
	<g class="if :burger">
		<line
			x1="5"
			y1="20"
			x2="315"
			y2="20"
			fill="none"
			stroke="#000"
			stroke-miterlimit="10"
			stroke-width="5"
		/>
		<line
			x1="315"
			y1="80"
			x2="5"
			y2="80"
			fill="none"
			stroke="#000"
			stroke-miterlimit="10"
			stroke-width="5"
		/>
		<line
			x1="315"
			y1="140"
			x2="5"
			y2="140"
			fill="none"
			stroke="#000"
			stroke-miterlimit="10"
			stroke-width="5"
		/>
	</g>

	<g class="if :cross">
		<line
			x1="5"
			y1="20"
			x2="315"
			y2="140"
			fill="none"
			stroke="#000"
			stroke-miterlimit="10"
			stroke-width="5"
		/>
		<line
			x1="5"
			y1="140"
			x2="315"
			y2="20"
			fill="none"
			stroke="#000"
			stroke-miterlimit="10"
			stroke-width="5"
		/>
	</g>
</svg>

<style lang="scss">
	.if.\:cross {
		opacity: 0;
	}

	.ICON._menu[data-state='cross'] {
		.if.\:burger {
			opacity: 0;
		}

		.if.\:cross {
			opacity: 1;
		}
	}

	.ICON._menu[data-state='burger'] {
		.if.\:burger {
			opacity: 1;
		}
		.if.\:cross {
			opacity: 0;
		}
	}
</style>

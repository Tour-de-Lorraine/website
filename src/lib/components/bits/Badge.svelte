<script>
	import Icon from './Icon.svelte';
	const {icon, text = ''} = $props();
</script>

<button class="BADGE" data-text={text} role="hidden" tabindex="0">
	<Icon name={icon}></Icon>
</button>

<style lang="scss">
	.BADGE {
		position: relative;
		cursor: help;

		:global(.icon) {
			width: auto;
			height: var(--icon-size-m);
		}

		&::after {
			content: attr(data-text);
			position: absolute;
			max-width: 30ch;
			width: max-content;
			background-color: var(--color-theme-2);
			display: none;
			pointer-events: none;
			z-index: 9999999999;
			padding: var(--box-padding);
			font-size: var(--font-size-m);
			left: 0;
			top: 0;
			transform: translateY(-100%);
		}

		&:hover::after,
		&:focus::after {
			display: inline-block;
		}
	}

	/* Responsive
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	@media (width <= $bp-s-maxWidth) {
		.BADGE {
			position: unset;
		}

		.BADGE::after {
			max-width: 50vw;
			text-align: center;
			hyphens: auto;
		}
	}
</style>

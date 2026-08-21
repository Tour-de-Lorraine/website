<script>
	import Navigation from '../Navigation.svelte';
	import Bubble from './Bubble.svelte';
	import Icon from '$lib/components/bits/Icon.svelte';
	import {once} from '$lib/functions/svelte/eventModifier.js';
	import {setContext} from 'svelte';
	import {writable} from 'svelte/store';

	const NToggle = {crnt: null};

	let showNavigation = $state(false);

	const menuIconState = writable('burger');
	setContext('menuIconState', menuIconState);
	$effect(() => {
		menuIconState.set(showNavigation ? 'cross' : 'burger');
	});

	const setShowNavigation = (bool) => {
		showNavigation = bool;
	};

	function toggleNavigation() {
		document.documentElement.removeEventListener('click', toggleNavigation);
		NToggle.crnt.removeEventListener('click', toggleNavigation);

		showNavigation = !showNavigation;

		if (showNavigation) {
			// Close navigation on click anywhere (outside or link, doesnt mather):
			setTimeout(() => {
				document.documentElement.addEventListener('click', toggleNavigation, {
					once: true,
				});
			}, 10);
		}

		NToggle.crnt.addEventListener('click', toggleNavigation, {once: true});
	}
</script>

<header class="PAGE-HEADER" data-show-navigation={showNavigation}>
	<a class="logo" href="/" title="Link zur Startseite" data-sveltekit-reload>
		<div class="_full">TOUR DE LORRAINE</div>
		<div class="_short">TDL</div>
	</a>

	<button class="_toggleNavigation" bind:this={NToggle.crnt} onclick={once(toggleNavigation)}>
		<Bubble isInflated={showNavigation}></Bubble>
		<div class="_menuIcon">
			<Icon
				name="menu"
				attributes={{preserveAspectRatio: 'none', 'data-is-open': showNavigation}}
			></Icon>
		</div></button
	>
</header>

<Navigation isVisible={showNavigation} {setShowNavigation}></Navigation>

<style lang="scss" global>
	.PAGE-HEADER {
		height: calc(var(--header-height) + 1px); // Prevent blitzer
		width: 100%;
		background-color: var(--color-theme-1);
		padding: var(--header-padding);
		display: flex;
		position: fixed;
		top: 0;
		left: 0;

		.logo {
			display: flex;
			align-items: center;
			font-size: var(--font-size-m);
			font-weight: 600;
			line-height: 0;
			margin-top: 2px; // Optical vertical correction
			._full {
				display: block;
			}
			._short {
				display: none;
			}
		}

		@media (width <= 330px) {
			.logo {
				._full {
					display: none;
				}
				._short {
					display: block;
				}
			}
		}

		button {
			height: 100%;
			margin-left: auto;
			position: relative;
			display: flex;

			._menuIcon {
				position: absolute;
				inset: 0;
				> * {
					position: absolute;
					inset: 0;
					height: 70%;
					width: auto;
					aspect-ratio: 2;
					margin: auto;
					--icon-size: 100%;
				}
			}
		}

		// &[data-show-navigation='false'] button {
		// 	._x {
		// 		display: none;
		// 	}

		// 	._menu {
		// 		display: block;
		// 	}
		// }

		// &[data-show-navigation='true'] button {
		// 	._x {
		// 		display: block;
		// 	}

		// 	._menu {
		// 		display: none;
		// 	}
		// }
	}
</style>

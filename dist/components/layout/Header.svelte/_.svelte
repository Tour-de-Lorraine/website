<script>
	import Navigation from '../Navigation.svelte';
	import Bubble from './Bubble.svelte';
	import Icon from '../../bits/Icon.svelte';
	import {once} from '../../../functions/svelte/eventModifier.js';
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

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.PAGE-HEADER) {
  height: calc(var(--header-height) + 1px);
  width: 100%;
  background-color: var(--color-theme-1);
  padding: var(--header-padding);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
}
:global(.PAGE-HEADER) :global(.logo) {
  display: flex;
  align-items: center;
  font-size: var(--font-size-m);
  font-weight: 600;
  line-height: 0;
  margin-top: 2px;
}
:global(.PAGE-HEADER) :global(.logo) :global(._full) {
  display: block;
}
:global(.PAGE-HEADER) :global(.logo) :global(._short) {
  display: none;
}
@media (width <= 330px) {
  :global(.PAGE-HEADER) :global(.logo) :global(._full) {
    display: none;
  }
  :global(.PAGE-HEADER) :global(.logo) :global(._short) {
    display: block;
  }
}
:global(.PAGE-HEADER) :global(button) {
  height: 100%;
  margin-left: auto;
  position: relative;
  display: flex;
}
:global(.PAGE-HEADER) :global(button) :global(._menuIcon) {
  position: absolute;
  inset: 0;
}
:global(.PAGE-HEADER) :global(button) :global(._menuIcon) > :global(*) {
  position: absolute;
  inset: 0;
  height: 70%;
  width: auto;
  aspect-ratio: 2;
  margin: auto;
  --icon-size: 100%;
}</style>

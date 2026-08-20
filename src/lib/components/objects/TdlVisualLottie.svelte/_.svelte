<script>
	import Animation from './Animation.svelte';
	import {onMount} from 'svelte';
	import {browser} from '$app/environment';

	let isTallViewport = $state();

	onMount(() => {
		if (!browser) return;

		const query = window.matchMedia('(max-aspect-ratio: 0.7)');

		const setAspectRatio = (query) => {
			isTallViewport = query.matches;
		};

		setAspectRatio(query);
		query.addEventListener('change', setAspectRatio);

		return () => {
			query.removeEventListener('change', setAspectRatio);
		};
	});
</script>

<div class="TDL-VISUAL-LOTTIE">
	{#if isTallViewport === false}
		<!-- <div class="if :wide"> -->
		<Animation
			srcIn="/assets/tdlVisual/lottieFiles/visual-wide-1.json"
			srcOut="/assets/tdlVisual/lottieFiles/visual-wide-2.json"
		/>
		<!-- </div> -->
	{:else if isTallViewport === true}
		<!-- <div class="if :tall"> -->
		<Animation
			srcIn="/assets/tdlVisual/lottieFiles/visual-tall-1.json"
			srcOut="/assets/tdlVisual/lottieFiles/visual-tall-2.json"
		/>
		<!-- </div> -->
	{/if}
</div>

<style lang="scss">
	.TDL-VISUAL-LOTTIE {
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

	// Wide Window
	// .if.\:wide {
	// 	display: contents;
	// }
	// .if.\:tall {
	// 	display: none;
	// }

	// Tall window
	// @media (max-aspect-ratio: 0.7) {
	// 	.if.\:tall {
	// 		display: contents;
	// 	}

	// 	.if.\:wide {
	// 		display: none;
	// 	}
	// }
</style>

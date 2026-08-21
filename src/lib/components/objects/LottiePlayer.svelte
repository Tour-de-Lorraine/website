<script>
	import {onMount} from 'svelte';
	import {browser} from '$app/environment';
	const {setPlayer, ...props} = $props();
	export const isPlaying = $state(false);
	let isReady = $state(false);
	let NPlayer = $state(null);

	$effect(() => {
		if (isPlaying) {
			NPlayer?.play?.();
		} else {
			NPlayer?.pause?.();
		}
	});

	onMount(async () => {
		if (browser) await import('@lottiefiles/lottie-player');
		isReady = true;
	});

	function init(N) {
		NPlayer = N;
		setPlayer?.(N);
	}
</script>

{#if isReady}
	<lottie-player
		autoplay={false}
		loop={false}
		renderer="svg"
		background="transparent"
		preserveAspectRatio="xMidYMid meet"
		height={'100%'}
		width={'100%'}
		mode="normal"
		{...props}
		use:init
	></lottie-player>
{:else}
	<svg style={props?.style || ''} class="placeholder" height={'100%'} width={'100%'}></svg>
{/if}

<style lang="scss">
	:global lottie-player,
	.placeholder {
		aspect-ratio: var(--aspectRatio, unset);
	}

	.placeholder {
		height: 100%;
		width: 100%;
		aspect-ratio: var(--aspectRatio);
	}
</style>

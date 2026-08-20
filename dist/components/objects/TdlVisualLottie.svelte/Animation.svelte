<script>
	import LottiePlayer from '../LottiePlayer.svelte';
	import {onMount} from 'svelte';
	import {browser} from '$app/environment';

	const ANIMATION = {
		in: 'in',
		out: 'out',
	};

	const {srcIn = '', srcOut = ''} = $props();

	let NAnimationIn = $state();
	let NAnimationOut = $state();
	let isReady = $state(false);
	let afterMountDelay = $state(false);
	let showAnimation = $state('');

	$effect(() => {
		if (NAnimationIn && NAnimationOut && afterMountDelay) isReady = true;
		showAnimation = ANIMATION.in;
	});

	$effect(() => {
		if (!isReady || !showAnimation) return;

		if (showAnimation === ANIMATION.in) {
			NAnimationIn.seek(0);
			NAnimationIn.play();
		}
		if (showAnimation === ANIMATION.out) {
			NAnimationOut.seek(0);
			NAnimationOut.play();
		}
	});

	const setPlayerAnimationIn = (NPlayer) => {
		NAnimationIn = NPlayer;
	};

	const setPlayerAnimationOut = (NPlayer) => {
		NAnimationOut = NPlayer;
	};

	onMount(() => {
		if (!browser) return;
		setTimeout(() => {
			afterMountDelay = true;
		}, 1000);

		const addListener = () => {
			window.addEventListener('scroll', handleScroll, {once: true});
		};

		const removeListener = () => {
			window.removeEventListener('scroll', handleScroll);
		};

		let timeoutId;
		const handleScroll = () => {
			timeoutId = setTimeout(() => {
				const scrollOffsetTop = ~~document.documentElement.scrollTop;
				const clientHeight = document.documentElement.clientHeight;
				const ratio = (scrollOffsetTop / clientHeight) * 100;
				const _showAnimation = ratio < 5 ? ANIMATION.in : ANIMATION.out;

				if (showAnimation !== _showAnimation) {
					showAnimation = _showAnimation;
				}

				addListener();
			}, 100);
		};

		addListener();

		return () => {
			removeListener();
			clearTimeout(timeoutId);
		};
	});
</script>

<div class="-ANIMATION" data-show-animation={showAnimation} data-is-ready={isReady}>
	<div class="_animation _in">
		<LottiePlayer setPlayer={setPlayerAnimationIn} src={srcIn}></LottiePlayer>
	</div>

	<div class="_animation _out">
		<LottiePlayer setPlayer={setPlayerAnimationOut} src={srcOut}></LottiePlayer>
	</div>
</div>

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.-ANIMATION {
  height: 100%;
  width: 100%;
  display: flex;
}
.-ANIMATION ._animation {
  position: absolute;
  inset: 0;
  opacity: 0;
}
.-ANIMATION[data-is-ready=true][data-show-animation=in] ._animation._in {
  opacity: 1;
  animation: in;
  animation-duration: 300ms;
  animation-fill-mode: forwards;
  transform: scale(0);
}
.-ANIMATION[data-is-ready=true][data-show-animation=out] ._animation._out {
  opacity: 1;
  animation: out;
  animation-duration: 300ms;
  animation-delay: 1000ms;
  animation-fill-mode: forwards;
}
@keyframes in {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}</style>

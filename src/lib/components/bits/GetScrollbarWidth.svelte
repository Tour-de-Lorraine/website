<script>
	import {browser} from '$app/environment';
	import {onMount} from 'svelte';

	onMount(() => {
		if (!browser) return;

		const set = (width) => {
			document.documentElement.style.setProperty('--scrollbar-width', `${width}px`);
		};

		const calc = () => {
			return window.innerWidth - document.body.clientWidth;
		};

		let timeout;
		const run = () => {
			const width = calc();
			set(width);
			timeout = setTimeout(() => {
				window.addEventListener('resize', run, {once: true});
			}, 500);
		};

		run();

		return () => {
			clearTimeout(timeout);
			window.removeEventListener('resize', run);
		};
	});
</script>

<script>
	const {data} = $props();

	const slides = data || [];

	let crnt = 0;
	let NSlideContainer;
	const NSlides = {};

	function updateCrnt(step = 0) {
		const pos = (crnt + step) % slides.length;
		return pos < 0 ? slides.length + pos : pos;
	}

	function scrollToSlide(id) {
		const NSlide = NSlides[id];
		NSlideContainer?.scrollTo({
			left: NSlide.offsetLeft,
			behavior: 'smooth',
		});
	}

	function jumpToSlide(id) {
		return new Promise((resolve) => {
			requestAnimationFrame(() => {
				const NSlide = NSlides[id];
				NSlideContainer?.scrollTo({
					left: NSlide.offsetLeft,
					behavior: 'instant',
				});
				resolve(true);
			});
		});
	}

	async function next() {
		const newCrnt = updateCrnt(+1);
		if (crnt > newCrnt) {
			await jumpToSlide('preroll');
		}
		crnt = newCrnt;
		scrollToSlide(crnt);
	}

	async function prev() {
		const newCrnt = updateCrnt(-1);
		if (crnt < newCrnt) {
			await jumpToSlide('postroll');
		}
		crnt = newCrnt;
		scrollToSlide(crnt);
	}

	function handleResize(N) {
		let observer;

		let timeout = setTimeout(() => {
			const observer = new ResizeObserver(() => {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					jumpToSlide(crnt);
				}, 10);
			});
			observer.observe(N);
		}, 10);

		return {
			destroy() {
				observer?.disconnect();
				clearTimeout(timeout);
			},
		};
	}

	function calcRelPos(imgIndex, crntImgIndex) {
		const ahead = Math.abs(
			//
			(imgIndex - crntImgIndex + slides.length) % slides.length,
		);
		const back = Math.abs(
			//
			(crntImgIndex - imgIndex + slides.length) % slides.length,
		);

		return Math.min(ahead, back);
	}

	const lazyloadRange = 2;
</script>

{#snippet slide(data, i, id)}
	<div
		class="slide"
		id="slide-{id}"
		data-is-crnt={i === crnt}
		data-slide-index={i}
		bind:this={NSlides[id]}
	>
		<div class="slide _still">
			image
			<!-- <Image {data} load={calcRelPos(i, crnt) <= lazyloadRange} sizes={[120, 100]}
				></Image> -->
		</div>
	</div>
{/snippet}

<article class="slideshow" use:handleResize>
	<div class="slides _outer">
		<div class="slides _inner" bind:this={NSlideContainer}>
			<!-- Slide before, for circular sliding -->
			{@render slide(slides[slides.length - 1], slides.length - 1, 'preroll')}

			{#each slides || [] as data, i}
				{@render slide(data, i, i)}
			{/each}

			<!-- Slide After, for circular sliding -->
			{@render slide(slides[0], 0, 'postroll')}
		</div>
	</div>

	<div class="buttons">
		<button class="prev" onclick={prev} title="Vorheriges Bild"> <div>←</div></button>
		<button class="next" onclick={next} title="Nächstes Bild"> <div>→</div></button>
	</div>
</article>

<style lang="scss">
	.slideshow {
		width: 100%;
		display: flex;
		flex-direction: column;
		border: 4px solid red;
		position: relative;
	}

	.slides._outer {
		position: relative;
		flex: 1;
		width: 100%;
	}

	.slides._inner {
		height: 100%;
		width: 100vw;
		left: -50vw;
		margin-left: 50%;
		position: absolute;

		display: grid;
		grid-template-columns: auto;
		grid-auto-columns: auto;
		grid-template-rows: 100%;
		grid-auto-flow: column;
		gap: 0;

		overflow: hidden;

		&::before,
		&::after {
			content: '';
			display: block;
			width: 50vw;
		}
	}

	.slide {
		height: 100%;
		isolation: isolate;
		width: calc(var(--page-clientWidth) * 0.75);
		max-width: 1200px;

		:global(img) {
			object-fit: cover;
		}
	}

	.buttons {
		width: 100%;
		margin-top: 1em;
		display: flex;
		justify-content: space-between;
		position: absolute;
		inset: 0;

		button {
			display: flex;
			align-items: flex-end;
			width: 33%;
		}

		button.next div {
			margin-left: auto;
		}

		button.prev div {
			margin-right: auto;
		}
	}

	/* RESPONSIVE LAYOUT
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	@media (width <= $bp-l-maxWidth) {
		.slide {
			width: calc(var(--page-clientWidth) * 1);
		}
	}

	@media (width <= $bp-m-maxWidth) {
		.slide {
			width: calc(var(--page-clientWidth) * 1);
		}
	}
</style>

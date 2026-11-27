<script>
	import Icon from '$lib/components/bits/Icon.svelte';
	import Picture from './Picture.svelte';
	const {data} = $props();
</script>

<div class="IMAGES">
	<c-gallery mode={data?.length > 1 ? 'slideshow' : 'singles'}>
		<div class="content" slot="images">
			{#if data && data.length > 0}
				{#each data as imageData, i}
					{@const imageItem = imageData?.ele_images_id || imageData}
					<Picture data={imageItem}></Picture>
				{/each}
			{:else}
				<!-- No images -->
			{/if}
		</div>

		<nav slot="navigation">
			<div class="_status">
				<span data-insert="currentIndex"></span>/<span data-insert="imageCount"></span>
			</div>
			<button class="_next" title="Nächstes Bild">
				<div class="_inner">
					<Icon name="arrow"></Icon>
				</div>
			</button>
		</nav>
	</c-gallery>
</div>

<style lang="scss" global>
	.IMAGES {
		position: relative;
	}

	c-gallery[mode='slideshow'] {
		---galleryNavigation-height: var(--size-l);

		nav,
		figcaption {
			font-size: var(--font-size-m);
		}

		nav {
			display: flex;
			position: absolute;
			inset: 0;
			pointer-events: none;
			> * {
				margin-top: auto;
				pointer-events: all;
			}
		}

		._status {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			height: var(---galleryNavigation-height);
		}

		button {
			display: flex;
			justify-content: flex-start;
			height: 100%;
			width: 100%;

			&._prev {
				.icon {
					transform: rotate(180deg);
				}
			}

			&._next {
				margin-left: auto;
				justify-content: flex-end;
			}

			._inner {
				margin-top: auto;
				height: var(---galleryNavigation-height);
				display: flex;
				align-items: center;
			}

			.icon {
				height: var(--icon-size-m);
			}
		}

		.content {
			aspect-ratio: 1.4;
		}

		picture {
			max-height: calc(100% - var(---galleryNavigation-height));
			img {
				object-fit: cover !important;
			}
		}

		figcaption {
			height: var(---galleryNavigation-height);
		}
	}

	c-gallery[mode='singles'] {
		nav {
			display: none;
		}
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	// @media (width <= $bp-s-maxWidth) {
	// c-gallery[mode='slideshow'] {
	// .content {
	// 	aspect-ratio: unset;
	// 	width: 100%;
	// 	height: 70vh;
	// }
	// 	}
	// }
</style>

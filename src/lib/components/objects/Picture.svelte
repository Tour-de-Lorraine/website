<script>
	const {data, size = 'normal'} = $props();
	const {image} = $derived(data || {});
	const translations = $derived(data?.translations?.[0] || {});
	const {caption, altText} = $derived(translations);
	const {focalPointX, focalPointY, height, width} = $derived(image || {});
	const aspectRatio = $derived((width / height).toFixed(2));

	const calcObjectPosition = (focalPointX, focalPointY) => {
		if (typeof focalPointX !== 'number' || typeof focalPointY !== 'number') return '';
		return `${~~((focalPointX / width) * 100)}% ${~~((focalPointY / height) * 100)}%`;
	};

	const objectPosition = $derived(calcObjectPosition(focalPointX, focalPointY));
	const src = $derived(`/assets/${image?.id}`);
</script>

<figure
	class="PICTURE"
	style:---aspect-ratio={aspectRatio}
	style:---object-position={objectPosition}
>
	<!-- prettier-ignore -->
	<picture>
        {#snippet Sources(sizes = [], isDppx2 = false)}
            {@const sizesDesc = sizes.sort((a, b) => a.width - b.width)}
            {#each sizesDesc as {directusKey, width}, i}
                {@const isFirst = i === 0}
                {@const isLast = i === sizesDesc.length - 1}
                {@const minWidth = isFirst ? "" : `(min-width: ${sizesDesc[i - 1].width + 1}px)`}
                {@const maxWidth = isLast ? "" : `(max-width: ${width}px)`}
                {@const and = minWidth && maxWidth ? " and " : ""}
                <source
                    srcset="{src}?key={directusKey}"
                    media="{isDppx2 ? "(-webkit-min-device-pixel-ratio: 1.5) and " : ""}{minWidth}{and}{maxWidth}"
                />
            {/each}
        {/snippet}

        <!-- FULLWIDTH -->
        {#if size === "fullwidth"}
            {@render Sources([
                {directusKey: "fullwidth-vw-xl-2x", width: 1800},
                {directusKey: "fullwidth-vw-l-2x", width: 1400},
                {directusKey: "fullwidth-vw-m-2x", width: 1000},
                {directusKey: "fullwidth-vw-s-2x", width: 800},
            ], true)}

            {@render Sources([
                {directusKey: "fullwidth-vw-xl", width: 1800},
                {directusKey: "fullwidth-vw-l", width: 1400},
                {directusKey: "fullwidth-vw-m", width: 1000},
                {directusKey: "fullwidth-vw-s", width: 800},
            ])}

        <!-- NORMAL WIDTH -->
        {:else if size === "normal"}
            {@render Sources([
                {directusKey: "vw-l-2x", width: 1000},
                {directusKey: "vw-m-2x", width: 850},
                {directusKey: "vw-s-2x", width: 600},
            ], true)}

            {@render Sources([
                {directusKey: "vw-l", width: 1000},
                {directusKey: "vw-m", width: 850},
                {directusKey: "vw-s", width: 600},
            ])}
        {/if}

		<img height="{height}px" width="{width}px" {src} alt={altText} />
	</picture>
	<figcaption>{caption && caption?.length ? caption : ''}</figcaption>
</figure>

<style lang="scss" global>
	.PICTURE {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;

		picture {
			display: block;
			flex: 1;
			width: 100%;
			height: 100%;
			position: relative;
		}

		img {
			height: 100%;
			width: 100%;
			object-fit: contain;
			object-position: var(---object-position, center);
		}

		figcaption {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: var(--size-xs);
			font-size: var(--figcaption-fontSize);
		}

		figcaption:empty {
			display: none;
		}
	}
</style>

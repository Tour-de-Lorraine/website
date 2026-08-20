<script>
	import DetailsList from '../objects/DetailsList.svelte';
	import FormatedText from '../objects/FormatedText.svelte';
	import Images from '../objects/Images.svelte';
	import Anchor from '../bits/Anchor.svelte';
	const {data} = $props();

	const {title, formatedText, slug} = data?.translations?.[0] || {};
	const {details, images} = data;
</script>

<section class="PAGE-SECTION">
	<Anchor id={slug}></Anchor>
	<div class="layout" data-layout="1-1 rsp-1 sticky-col-1">
		<div class="column _1">
			<header>
				{#if title}
					<h2 class="title">{title}</h2>
				{/if}
			</header>

			{#if details?.length}
				<DetailsList data={details}></DetailsList>
			{/if}
		</div>

		<div class="column _2">
			<FormatedText data={formatedText}></FormatedText>

			<div class="_images">
				<Images data={images}></Images>
			</div>
		</div>
	</div>
</section>

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.column {
  display: flex;
  flex-direction: column;
  gap: var(--size-m);
  width: 100%;
}

._images {
  width: 100%;
}
._images :global(c-gallery::part(images)),
._images :global(c-gallery::part(images)) {
  width: 100%;
  background-color: red;
}</style>

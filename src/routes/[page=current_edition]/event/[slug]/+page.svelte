<script>
	import Page from '$lib/components/layout/Page.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import DetailsList from '$lib/components/objects/DetailsList.svelte';

	import EventIssues from '$lib/components/objects/EventIssues.svelte';
	import EventAttributes from '$lib/components/objects/EventAttributes.svelte';
	import EventCategories from '$lib/components/objects/EventCategories.svelte';
	import FormatedText from '$lib/components/objects/FormatedText.svelte';

	const {data} = $props();
	const {details, issues, images, videos, attributes, categories} = $derived(data);
	const {title, description} = $derived(data.translations[0]);
</script>

<Page {data}>
	<PageSections>
		<article class="_event" data-layout="1-1 rsp-1 sticky-col-1">
			<div class="column _1">
				<header>
					<h2>{title}</h2>
					<EventIssues data={issues}></EventIssues>
					<EventCategories data={categories}></EventCategories>
					<EventAttributes data={attributes}></EventAttributes>
				</header>
				<DetailsList data={details}></DetailsList>
			</div>

			<div class="column _2">
				<FormatedText data={description}></FormatedText>
			</div>
		</article>
	</PageSections>
</Page>

<style lang="scss">
	._heroContent {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;

		._fullwidth {
			width: 100vw;
			max-width: var(--page-maxWidth);
			height: 100%;
			background-color: darkblue;
			flex-shrink: 0;
			position: relative;
		}
	}

	._event {
		header {
			> :global(*) {
				font-size: var(--font-size-l);
			}

			:global(.EVENT-ATTRIBUTES) {
				margin-top: var(--size-xs);
				font-size: var(--font-size-m);
			}
		}

		:global(.DETAILS-LIST) {
			margin-top: var(--size-l);
		}
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
	._event {
		gap: var(--size-l);
		header {
			> :global(*) {
				font-size: var(--font-size-l);
			}

			:global(.EVENT-ATTRIBUTES) {
				margin-top: var(--size-xs);
				font-size: var(--font-size-m);
			}
		}

		:global(.DETAILS-LIST) {
			margin-top: var(--size-m);
		}
	}
</style>

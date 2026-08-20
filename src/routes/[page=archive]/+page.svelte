<script>
	import Page from '$lib/components/layout/Page.svelte';
	import Picture from '$lib/components/objects/Picture.svelte';
	import DetailsList from '$lib/components/objects/DetailsList.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import Icon from '$lib/components/bits/Icon.svelte';
	const props = $props();
	const data = props.data;
	const archived = data?.archived || [];
	const translations = data?.additionalContent?.translations?.[0] || {};
</script>

<Page {data}>
	<PageSections>
		<section>
			<div class="content" data-layout="1-1 rsp-1 sticky-col-1">
				<div class="column _1">
					<header>
						<h3>Archiv</h3>
					</header>
				</div>
				<div class="column _2">
					{@html translations?.formatedText || ''}
				</div>
			</div>
		</section>

		<ul class="ARCHIVE">
			{#each archived as { translations, year, details, visual, ...program }}
				{@const {title} = translations?.[0] || ''}
				<li class="EDITION">
					<div class="content" data-layout="1-1 rsp-1 sticky-col-1">
						<div class="column _1">
							<header>
								<h3>
									{year}
								</h3>
								<h4 data-text="h3 guillemets">
									{title}
								</h4>
							</header>

							<div class="_details">
								{#snippet programLink()}
									{@const {
										useOtherProgramSource,
										otherProgramSourceType,
										otherProgramUrl,
										otherProgramPdf,
									} = program}
									{@const href =
										useOtherProgramSource && otherProgramSourceType === 'pdf'
											? otherProgramPdf
											: useOtherProgramSource &&
												  otherProgramSourceType === 'url'
												? otherProgramUrl
												: `/archiv/${year}`}

									{@const label = !useOtherProgramSource
										? 'Programm'
										: otherProgramSourceType === 'pdf' ||
											  (otherProgramSourceType === 'url' &&
													otherProgramUrl.endsWith('pdf'))
											? 'Programm Pdf'
											: 'Webseite'}
									<a {href}>
										<div class="label">
											{label}
										</div>
										<Icon name="arrow" />
									</a>
								{/snippet}

								<DetailsList data={details}>
									{#snippet childrenAfter()}
										{@render programLink()}
									{/snippet}
								</DetailsList>
							</div>
						</div>

						<div class="column _2">
							<div class="_visual">
								TTT: {visual}
								{#if visual?.image}
									KKKkkk
									<Picture data={visual?.image}></Picture>
								{/if}
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</PageSections>
</Page>

<style lang="scss">
	.ARCHIVE {
		display: flex;
		flex-direction: column;
		gap: calc(2 * var(--size-l));

		.column._1 {
			header {
				margin-bottom: var(--size-m);
				hyphens: auto;
				text-wrap: balance;
			}
		}

		.column._2 {
			display: flex;
			flex-direction: column;
			gap: var(--size-l);
		}

		._visual {
			width: 100%;
			max-width: 60vh;
			max-height: 60vh;
		}
	}

	/* RESPONSIVE
    **************************************************************************/
	@media (width <= $bp-m-maxWidth) {
		.content {
			gap: var(--size-s);
		}
	}
</style>

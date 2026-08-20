<script>
	import Drawer from './Drawer.svelte';
	import Icon from '../bits/Icon.svelte';
	import Images from './Images.svelte';
	import FormatedText from './FormatedText.svelte';
	const {data, childrenBefore, childrenAfter} = $props();
</script>

<div class="DETAILS-LIST">
	{#if childrenBefore}
		{@render childrenBefore()}
	{/if}

	{#each data as { item }}
		{@const translations = item?.translations?.[0] || {}}

		{#if item?.type === 'ele_details__drawer'}
			<Drawer icon="cross" isOpen={item?.isOpen || false}>
				{#snippet title()}
					<div class="label">
						{translations?.title}
					</div>
				{/snippet}

				{#snippet content()}
					<FormatedText data={translations?.formatedText || ''}></FormatedText>
				{/snippet}
			</Drawer>
		{:else if item?.type === 'ele_details__media'}
			<Drawer icon="cross">
				{#snippet title()}
					<div class="label">
						{translations?.title}
					</div>
				{/snippet}

				{#snippet content()}
					<Images data={item?.images || []}></Images>
				{/snippet}
			</Drawer>
		{:else if item?.type === 'ele_details__link'}
			<a
				href={translations?.url}
				title="URL zu {translations.label} in neuem Tab öffnen."
				referrerpolicy="noreferrer"
				target="_blank"
			>
				<div class="label">
					{translations.label}
				</div>
				<Icon name="arrow"></Icon>
			</a>
		{:else if item?.type === 'ele_details__pdf'}
			{@const pdf = item?.pdf?.translations?.[0] || {}}

			<a
				href="/assets/{pdf?.file?.id}"
				title="'{pdf?.title}' PDF-Datei in neuem Tab öffnen."
				target="_blank"
			>
				<div class="label">
					{pdf?.title}
				</div>
				<Icon name="arrow"></Icon>
			</a>
		{:else}
			<div>
				Type "{item?.type}" does not exsit.
			</div>
		{/if}
	{/each}

	{#if childrenAfter}
		{@render childrenAfter()}
	{/if}
</div>

<style lang="scss" global>
	.DETAILS-LIST {
		--icon-size: var(--icon-size-m);

		> a,
		summary {
			font-size: var(--font-size-m);
			font-weight: 600;
			min-height: 2em;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-transform: uppercase;
			line-height: 1;
			padding: var(--box-padding);

			.label {
				margin-top: 0.1em;
				max-width: calc(100% - var(--icon-size) * 2.5);
			}
		}

		details > .content {
			padding: var(--box-padding);
			padding-top: 0px;
			margin-top: -0.1em;
		}

		> a {
			position: relative;

			&::before,
			&::after {
				content: '';
				position: absolute;
				display: block;
				height: var(--line-width);
				width: 100%;
				background-color: currentColor;
				transform: scale(1.00001);
				left: 0;
				right: 0;
			}

			&::before {
				top: 0;
			}

			&::after {
				bottom: 0;
			}
		}

		c-drawer .IMAGES .content {
			max-height: 50vh;
		}

		> * + * {
			&::before {
				content: unset !important;
			}
		}
	}
</style>

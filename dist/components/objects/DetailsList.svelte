<script>
	import Drawer from './Drawer.svelte';
	import Icon from '../bits/Icon.svelte';
	import {PUBLIC_DIRECTUS_URL} from '$env/static/public';
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
				href="{PUBLIC_DIRECTUS_URL}/assets/{pdf?.file?.id}"
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

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.DETAILS-LIST) {
  --icon-size: var(--icon-size-m);
}
:global(.DETAILS-LIST) > :global(a),
:global(.DETAILS-LIST) :global(summary) {
  font-size: var(--font-size-m);
  font-weight: 600;
  min-height: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  line-height: 1;
  padding: var(--box-padding);
}
:global(.DETAILS-LIST) > :global(a) :global(.label),
:global(.DETAILS-LIST) :global(summary) :global(.label) {
  margin-top: 0.1em;
  max-width: calc(100% - var(--icon-size) * 2.5);
}
:global(.DETAILS-LIST) :global(details) > :global(.content) {
  padding: var(--box-padding);
  padding-top: 0px;
  margin-top: -0.1em;
}
:global(.DETAILS-LIST) > :global(a) {
  position: relative;
}
:global(.DETAILS-LIST) > :global(a::before), :global(.DETAILS-LIST) > :global(a::after) {
  content: "";
  position: absolute;
  display: block;
  height: var(--line-width);
  width: 100%;
  background-color: currentColor;
  transform: scale(1.00001);
  left: 0;
  right: 0;
}
:global(.DETAILS-LIST) > :global(a::before) {
  top: 0;
}
:global(.DETAILS-LIST) > :global(a::after) {
  bottom: 0;
}
:global(.DETAILS-LIST) :global(c-drawer) :global(.IMAGES) :global(.content) {
  max-height: 50vh;
}
:global(.DETAILS-LIST) > :global(*) + :global(*::before) {
  content: unset !important;
}</style>

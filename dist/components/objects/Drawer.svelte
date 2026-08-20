<script>
	import Icon from '../bits/Icon.svelte';
	const {title, content, icon, isOpen = false} = $props();
</script>

<c-drawer class="DRAWER" data-lines="top bottom" is-open={isOpen}>
	<details>
		<summary>
			{#if title}
				{@render title()}
			{/if}
			{#if icon}
				<Icon name={'plus'}></Icon>
			{/if}
		</summary>
		<div class="content">
			{#if content}
				{@render content()}
			{/if}
		</div>
	</details>
</c-drawer>

<style global>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(c-drawer) {
  --c-drawerborderWidth: var(--line-width);
}
:global(c-drawer) :global(details) :global(summary) {
  display: flex;
  justify-content: space-between;
}
:global(c-drawer) :global(details) :global(summary) :global(.icon) {
  transform: rotate(0deg);
  transition: transform var(--ms-m);
}
:global(c-drawer[is-open=true]) :global(details) :global(summary) :global(.icon) {
  transform: rotate(-45deg);
}</style>

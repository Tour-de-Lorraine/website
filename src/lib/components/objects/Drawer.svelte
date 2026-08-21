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

<style lang="scss" global>
	c-drawer {
		--c-drawerborderWidth: var(--line-width);
		details summary {
			display: flex;
			justify-content: space-between;
		}

		details summary .icon {
			transform: rotate(0deg);
			transition: transform var(--ms-m);
		}

		&[is-open='true'] details summary .icon {
			transform: rotate(-45deg);
		}
	}
</style>

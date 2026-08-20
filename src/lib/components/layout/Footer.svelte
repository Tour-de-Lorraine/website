<script>
	import {getContext} from 'svelte';

	const site = getContext('site');
	const footerLinks = site?.settings?.footerLinks
		.map((link) => link?.translations?.[0])
		.filter((link) => link?.label?.length && link?.url?.length);
</script>

<footer>
	<nav>
		{#each footerLinks as { label, url }}
			<a href={url} title="{!url.startsWith('/') ? 'Externer ' : ''}Link zu {label}"
				>{label}</a
			>
		{/each}
	</nav>
</footer>

<style lang="scss">
	footer {
		width: 100%;
		padding: var(--size-m) 0;
		margin-top: var(--size-2xl);
		font-size: var(--font-size-s);
		nav {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}

	/* RESPONSIVE   
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	@media (width <= $bp-s-maxWidth) {
		footer {
			margin-top: var(--size-xl);
			nav {
				width: 100%;
				display: block;
				justify-content: unset;
				flex-wrap: unset;
				text-wrap: balance;
				text-align: center;
				* {
					display: inline-block;
					margin-right: 0.75em;
					line-height: 2;
				}
			}
		}
	}
</style>

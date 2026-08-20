<script>
	import {page} from '$app/stores';
</script>

<div class="ERROR">
	<h1>FEHLER</h1>
	<h2>
		{$page.status >= 500 ? 'Server Problem' : 'Seite nicht gefunden'}
	</h2>
	<a data-as="link-1" href="/" title="Link zur Startseite">Zur Startseite</a>
</div>

<style lang="scss">
	.ERROR {
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;

		a {
			margin-top: var(--size-m);
		}
	}
</style>

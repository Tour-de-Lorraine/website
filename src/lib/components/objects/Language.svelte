<script>
	import {browser} from '$app/environment';
	const languages = [
		{code: 'de', label: 'DE', name: 'Deutsch'},
		{code: 'fr', label: 'FR', name: 'Français'},
		{code: 'it', label: 'IT', name: 'Italiano'},
		{code: 'en', label: 'EN', name: 'English'},
	];

	function setLanguage(e, lang) {
		e.preventDefault();
		window.location.href = `/set-language?lang=${lang}&route=${document.location.pathname.replace('/', '')}`;
		document.cookie = `lang=${lang};`;
	}
</script>

<ul class="LANGUAGE-SELECTOR">
	{#each languages as { code, label, name }}
		<li>
			<a
				href="/set-language?route={browser ? document.location?.pathname : ''}&lang={code}"
				hreflang={code}
				lang={code}
				title={name}
				onclick={(e) => setLanguage(e, code)}>{label}</a
			>
		</li>
	{/each}
</ul>

<style lang="scss">
	.LANGUAGE-SELECTOR {
		position: fixed;
		top: var(--header-height);
		right: 0;
	}
</style>

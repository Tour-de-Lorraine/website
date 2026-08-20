<script>
	const {data} = $props();

	const headerRemap = {
		1: '4',
		2: '5',
		3: '6',
		4: '6',
		5: '6',
		6: '6',
	};

	function remapHeadings(html = '', mapping = {}) {
		const replacer = (chunk, value) => {
			const newValue = mapping[value];
			if (newValue === undefined) throw `Map does not have a replacement for '${value}'}`;
			return chunk.replace(value, newValue);
		};

		let done = '';
		let chunk = '';

		let checkIterations = 0;
		for (let i = 0; i < html.length; i++) {
			const char = html[i];

			if (char === '<') {
				done += chunk;
				chunk = '';
				checkIterations = 5;
			} else if (!checkIterations) {
				done += chunk + char;
				chunk = '';
				continue;
			}

			chunk += char;
			checkIterations--;
			if (chunk.length < 4) {
				continue;
			}

			const match = chunk.match(/<\/?h([1-6])>/);

			if (match) {
				const [_, valueToReplace] = match;
				const newChunk = replacer(chunk, valueToReplace);
				done += newChunk;
				chunk = '';
				checkIterations = 0;
			} else if (i === html.length - 1) {
				done += chunk;
			}
		}
		return done;
	}

	const text = typeof data === 'string' ? remapHeadings(data, headerRemap) : '';
</script>

<div class="FORMATED-TEXT">
	{@html text}
</div>

<style global>@charset "UTF-8";
/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
:global(.FORMATED-TEXT) :global(h2),
:global(.FORMATED-TEXT) :global(h3),
:global(.FORMATED-TEXT) :global(h4) {
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 1em;
  font-style: normal !important;
}
:global(.FORMATED-TEXT) :global(h2:first-child),
:global(.FORMATED-TEXT) :global(h3:first-child),
:global(.FORMATED-TEXT) :global(h4:first-child) {
  margin: unset;
}
:global(.FORMATED-TEXT) :global(h2) :global(em),
:global(.FORMATED-TEXT) :global(h2) :global(i),
:global(.FORMATED-TEXT) :global(h3) :global(em),
:global(.FORMATED-TEXT) :global(h3) :global(i),
:global(.FORMATED-TEXT) :global(h4) :global(em),
:global(.FORMATED-TEXT) :global(h4) :global(i) {
  font-style: normal;
}
:global(.FORMATED-TEXT) :global(a) {
  text-decoration: underline;
}
:global(.FORMATED-TEXT) :global(a:hover) {
  font-weight: 600;
  letter-spacing: -0.024em;
}
:global(.FORMATED-TEXT) :global(strong) {
  font-weight: 400;
  background-color: var(--color-theme-2);
}
:global(.FORMATED-TEXT) > :global(*) + :global(*) {
  margin-top: 1em;
}
:global(.FORMATED-TEXT) :global(ul) {
  ---indent: 0.8em;
  ---bullet-size: 0.2em;
}
:global(.FORMATED-TEXT) :global(ul) :global(li) {
  padding-left: var(---indent);
  position: relative;
}
:global(.FORMATED-TEXT) :global(ul) :global(li::before) {
  position: absolute;
  content: "–";
  left: calc(-0.1 * var(---indent));
  display: block;
}
:global(.FORMATED-TEXT) :global(ol) {
  list-style: outside number;
  counter-reset: list;
  padding-left: 2.25em;
}
@media (width <= 800px) {
  :global(.FORMATED-TEXT) :global(.FORMATED-TEXT) {
    hyphens: auto;
  }
}

:global(c-drawer) :global(.FORMATED-TEXT) :global(a) {
  hyphens: auto;
}</style>

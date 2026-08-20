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

<style lang="scss" global>
	.FORMATED-TEXT {
		h2,
		h3,
		h4 {
			font-weight: 600;
			text-transform: uppercase;
			margin-top: 1em;
			font-style: normal !important;

			&:first-child {
				margin: unset;
			}

			em,
			i {
				font-style: normal;
			}
		}

		a {
			text-decoration: underline;
			&:hover {
				font-weight: 600;
				letter-spacing: -0.024em;
			}
		}

		strong {
			font-weight: 400;
			background-color: var(--color-theme-2);
		}

		> * + * {
			margin-top: 1em;
		}

		ul {
			---indent: 0.8em;
			---bullet-size: 0.2em;
			li {
				padding-left: var(---indent);
				position: relative;
			}

			// Disc
			// li::before {
			// 	position: absolute;
			// 	content: '';
			// 	left: calc(-0.2 * var(---indent));
			// 	display: block;
			// 	height: var(---bullet-size);
			// 	width: var(---bullet-size);
			// 	background-color: currentColor;
			// 	border-radius: 100%;
			// 	top: 0.55em;
			// }

			// Strich
			li::before {
				position: absolute;
				// content: '—'; // Geviert
				content: '–'; // Halbgeviert
				left: calc(-0.1 * var(---indent));
				display: block;
			}
		}

		// Ordered
		ol {
			list-style: outside number;
			counter-reset: list;
			padding-left: 2.25em;
		}

		@media (width <= 800px) {
			.FORMATED-TEXT {
				hyphens: auto;
			}
		}
	}

	:global(c-drawer) .FORMATED-TEXT a {
		// line-break: anywhere;
		hyphens: auto;
	}
</style>

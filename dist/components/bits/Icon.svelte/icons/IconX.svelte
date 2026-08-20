<script>
	const props = $props();
	const attributes = props?.attributes || {};
</script>

<svg
	width="320"
	height="160"
	viewBox="0 0 320 160"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	{...attributes}
>
	<polyline
		points="85 5 160 80 85 155"
		fill="none"
		fill-rule="evenodd"
		stroke="#000"
		stroke-miterlimit="10"
		stroke-width="5"
	/>
	<polyline
		points="235 155 160 80 235 5"
		fill="none"
		fill-rule="evenodd"
		stroke="#000"
		stroke-miterlimit="10"
		stroke-width="5"
	/>
</svg>

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
	<line
		x1="220"
		y1="80"
		x2="5"
		y2="80"
		fill="none"
		stroke="#000"
		stroke-miterlimit="10"
		stroke-width="5"
	/>
	<polyline
		points="170 5 310 80 170 155"
		fill="none"
		fill-rule="evenodd"
		stroke="#000"
		stroke-miterlimit="10"
		stroke-width="5"
	/>
</svg>

<script>
	const {data} = $props();
	import {formatTime, formatDate} from '../../functions/formatDateTime.js';

	// function formatDatetime({dateStart, dateEnd, timeStart, timeEnd}) {
	// 	const _dateStart = formatDate(dateStr);
	// 	const _timeStart = formatTime(timeStr);
	// 	let output = date;
	// 	if (_timeStart?.length > 0) output += `, ${time}`;
	// 	return output;
	// }

	// const timeStart = data?.startTime ? formatTime(data.endTime) : '';
	// const timeEnd = data?.endTime ? `bis ${formatTime(data.endTime)}` : '';
</script>

{#snippet datetime({dateStart, dateEnd, timeStart, timeEnd})}
	<span class="_dates">
		{#if dateStart}<span class="_start">{formatDate(dateStart, {hasWeekday: false})}</span
			>{/if}{#if dateEnd}<span class="_end">{formatDate(dateEnd)}</span>{/if}
	</span>{#if timeStart || timeEnd},
		<span class="_times">
			{#if timeStart}<span class="_start">{formatTime(timeStart)}</span
				>{/if}{#if timeEnd}<span class="_end">{formatTime(timeEnd)}</span>{/if}
		</span>
	{/if}
{/snippet}

<ul class="EVENT-ISSUES">
	{#each data as issue}
		<li>
			<div class="_dateTimes">
				{@render datetime(issue)}
			</div>
			<div class="_location">
				{#if issue.locationUrl}
					<a href={issue.locationUrl} data-as="link-1">
						{issue.location}
					</a>
				{:else}
					{issue.location}
				{/if}
			</div>
		</li>
	{/each}
</ul>

<style>@charset "UTF-8";
/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.EVENT-ISSUES {
  display: flex;
  flex-direction: column;
}
.EVENT-ISSUES li {
  display: flex;
  flex-wrap: wrap;
}
.EVENT-ISSUES li > :last-child::before {
  content: " — ";
  white-space: break-spaces;
}
.EVENT-ISSUES ._dateTimes :global(> *) {
  display: inline-block;
}
.EVENT-ISSUES ._dateTimes :global(._end:nth-child(1)::before) {
  content: "bis ";
}
.EVENT-ISSUES ._dateTimes :global(._end:nth-child(2)::before) {
  content: "–";
}</style>

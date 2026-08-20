<script>
	import event from '../../../directus/queries/event.js';
	import {formatDate} from '../../../functions/formatDateTime.js';
	const {data: events, setIsFiltered, setMatches} = $props();

	const FILTER_TYPES = {
		fullfillAll: 1,
		fullfillOnePlus: 2,
	};
	const filterType = FILTER_TYPES.fullfillOnePlus;

	const filterDef = [
		{
			id: 'byDate',
			group: 'byDate',
			title: 'Datum',
		},
		{
			id: 'byCategory',
			group: 'byCategory',
			title: 'Typ',
		},
		{
			id: 'byLocation',
			group: 'byLocation',
			title: 'Ort',
		},
		{
			id: 'byAttribute',
			group: 'byAttribute',
			title: 'Sonstiges',
		},
	];

	let NForm;
	const spotlightCategories = [
		{group: 'byCategory', id: 'Soliparty', title: 'Soliparty'},
		{group: 'byCategory', id: 'Workshoptag', title: 'Workshoptag'},
	];

	const filter = filterDef.reduce(
		(acc, group) => ({
			...acc,
			[group.group]: new Set(),
		}),
		{},
	);

	let isFiltered = $state(false);
	// Count of all the applied filters:
	let filterCount = $state(0);
	// A Score for each event. The score is the number of passed filters:
	let scoredIds = initialScores();
	// The events which have a score equal to the filterCount pass the filter:
	let matchingIds = [];

	function initialScores() {
		return events.all.reduce((acc, {id}) => ({...acc, [id]: 0}), {});
	}

	function reset() {
		// Reset JS
		isFiltered = false;
		filterCount = 0;
		scoredIds = initialScores();
		matchingIds = [];
		crntGroup = '';
		setMatches([]);
		setIsFiltered(false);
		// Reset HTML
		const NInputs = [...NForm.querySelectorAll('input')];
		NInputs.forEach((NInput) => {
			NInput.checked = false;
		});
	}

	let crntGroup = $state('');
	function handleChange(e) {
		e.preventDefault();
		const NInput = e.target;
		const type = NInput.dataset.type;
		const group = NInput.dataset.group;
		const id = NInput.dataset.id;

		let lastGroup = crntGroup;
		if (type === 'toggleGroup' || type.startsWith('toggleSpotlightCategory')) {
			const stateBeforeReset = e.target.checked;
			reset();
			e.target.checked = stateBeforeReset;
			if (lastGroup !== id) crntGroup = id;
			if (type.startsWith('toggleSpotlightCategory') && crntGroup) {
				handleToggleSpotlightCategory(id);
			}
			return;
		}
		const change = {
			type,
			group,
			id,
			action: NInput.checked ? 'add' : 'remove',
		};
		if (type === 'toggleProperty') {
			handleToggleSubSelector(change);
		}
	}

	// function checkHasResults() {
	// = matchingIds.length > 0;
	// isFiltered = Object.keys(filter).find((group) => filter[group].size > 0) !== undefined;
	// setIsFiltered(isFiltered);
	// }

	function handleToggleSpotlightCategory(category) {
		matchingIds = events?.['byCategory']?.[category] || [];
		filterCount = 1;
		setIsFiltered(true);
		setMatches(matchingIds);
	}

	function handleToggleSubSelector(change) {
		if (change.action === 'add') {
			filter[change.group].add(change.id);
			updateFilterScores('add', change.group, change.id);
		} else {
			filter[change.group].delete(change.id);
			updateFilterScores('remove', change.group, change.id);
		}
		setIsFiltered(matchingIds?.length > 0 || false);
	}

	function updateFilterScores(action, group, property) {
		const eventIds = events?.[group]?.[property] || [];
		if (action === 'add') {
			filterCount++;
			eventIds.forEach((id) => scoredIds[id]++);
		} else if (action === 'remove') {
			filterCount--;
			eventIds.forEach((id) => scoredIds[id]--);
		}

		updateMatchList();
	}

	function updateMatchList() {
		matchingIds = [];

		if (filterType === FILTER_TYPES.fullfillAll) {
			matchingIds = Object.keys(scoredIds).filter(
				// use >= not ===
				// The score of an event can be higher than the filterCount.
				// Example: Filtered by location XY. An event can have multiple issues at location XY.
				// If it has 3 issues at location XY, 3 points are added to its score.
				(eventId) => scoredIds[eventId] >= filterCount,
			);
		} else if (filterType === FILTER_TYPES.fullfillOnePlus) {
			matchingIds = Object.keys(scoredIds).filter((id) => scoredIds[id] > 0);
		}

		setMatches(matchingIds);
	}

	function handleReset(e) {
		e.stopPropagation();
		e.preventDefault();
		reset();
	}

	function handleToggleShowFilter(e) {
		// if (e.target.checked === false) {
		// 	reset();
		// }
	}

	function handleKeydownMainSelector(e) {
		const {code} = e;

		if (code === 'ArrowDown') {
			const NSubSelectorGroup = document.querySelector(
				"._subSelectorGroup[data-is-visible='true']",
			);
			if (NSubSelectorGroup?.nodeType === 1) {
				NSubSelectorGroup.querySelector('input')?.focus();
				e.preventDefault();
			}
		}
	}

	function handleKeydownSubSelector(e) {
		const {code} = e;
		if (code === 'ArrowUp') {
			const NMainSelector = document.querySelector('input._mainSelector:checked');
			if (NMainSelector?.nodeType === 1) {
				e.preventDefault();
				NMainSelector?.focus();
			}
		} else if (code === 'ArrowLeft' || code === 'ArrowRight') {
			const siblingSelector =
				code === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
			const NSibling = e.target.parentNode?.[siblingSelector];
			if (NSibling?.nodeType === 1) {
				NSibling.querySelector('input').focus();
				e.preventDefault();
			}
		}
	}
</script>

<div class="FILTER">
	<input
		id="toggleFilter"
		class="_toggleFilter"
		type="checkbox"
		onclick={handleToggleShowFilter}
	/>
	<label class="_toggleFilter" data-as="ellipse" for="toggleFilter">Filter</label>

	<form bind:this={NForm} onchange={handleChange}>
		<fieldset class="_mainSelectors">
			{#snippet mainSelector(selector, type)}
				<input
					id="pg-{selector.id}"
					class="_mainSelector"
					type="checkbox"
					name="mainSelector"
					data-type={type}
					data-group={selector.group}
					data-id={selector.id}
					onkeydown={handleKeydownMainSelector}
				/>
				<label
					class="_mainSelector"
					data-as="ellipse"
					for="pg-{selector.id}"
					data-is-active={crntGroup === selector.id}
				>
					{selector.title}
				</label>
			{/snippet}
			{#each filterDef as group}
				{@render mainSelector(group, 'toggleGroup')}
			{/each}
			{#each spotlightCategories as category}
				{@render mainSelector(category, `toggleSpotlightCategory`)}
			{/each}
		</fieldset>

		<div class="_subSelectorGroups">
			{#each filterDef as group}
				<ul
					data-group={group.group}
					class="_subSelectorGroup"
					data-is-visible={crntGroup === group.group}
				>
					<li>
						<input
							id="p-{group.group}-all"
							type="checkbox"
							onchange={handleReset}
							class="_reset"
							data-group={group.group}
							onkeydown={handleKeydownSubSelector}
						/>
						<label for="p-{group.group}-all">Alle</label>
					</li>
					{#each Object.keys(events[group.group]) as property, i}
						<li>
							<input
								id="p-{group.group}-{i}"
								class="subSelector"
								name="subSelector"
								type="checkbox"
								data-type="toggleProperty"
								data-group={group.group}
								data-value={property}
								data-id={property}
								onkeydown={handleKeydownSubSelector}
							/>
							<label for="p-{group.group}-{i}">
								{#if group.group === 'byDate'}
									{formatDate(property)}
								{:else}
									{property}
								{/if}
							</label>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</form>
</div>

<style>/*  BREAKPOINTS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.FILTER {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: calc(var(--header-height) + 0.75px);
}
.FILTER input {
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
}
.FILTER label {
  position: relative;
}
.FILTER input:focus + label,
.FILTER input:hover + label,
.FILTER input:checked + label,
.FILTER label[data-is-active=true] {
  text-decoration: underline;
}
.FILTER input:focus + label,
.FILTER input:hover + label {
  text-decoration-style: dotted;
}
.FILTER input:checked:focus + label,
.FILTER input:checked:hover + label {
  text-decoration-style: dashed;
}
.FILTER input:checked + label {
  text-decoration-style: solid;
}
.FILTER input:active + label,
.FILTER input:checked + label,
.FILTER label[data-is-active=true] {
  text-decoration-style: solid;
}
.FILTER ._toggleFilter {
  display: none;
}

.FILTER form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
}
.FILTER form ._mainSelectors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.FILTER form label._mainSelector {
  background-color: var(--color-theme-2);
  display: inline-block;
  text-transform: uppercase;
  font-weight: 600;
  width: fit-content;
}
.FILTER form ._subSelectorGroups {
  width: 100%;
}
.FILTER form ._subSelectorGroup {
  display: none;
  flex-wrap: wrap;
  gap: 1em 2em;
  color: black;
  position: relative;
  padding-block: var(--box-padding);
}
.FILTER form ._subSelectorGroup[data-is-visible=true] {
  display: flex;
}
.FILTER form ._subSelectorGroup::before {
  background-color: var(--color-theme-2);
  content: "";
  position: absolute;
  display: block;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: -50vw;
  margin-left: 50%;
  width: 100vw;
}

:global([data-route="archiv"]) .FILTER {
  top: calc(2 * var(--header-height));
}

/* Responsive
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
@media (width <= 600px) {
  .FILTER ._toggleFilter {
    display: block;
  }
  .FILTER label._toggleFilter {
    background-color: var(--color-theme-2);
    font-size: var(--font-size-m);
    text-transform: uppercase;
    font-weight: 600;
    margin: auto;
  }
  .FILTER form {
    display: none;
    justify-content: center;
  }
  .FILTER form fieldset {
    justify-content: center !important;
  }
  .FILTER input._toggleFilter:checked ~ form {
    display: flex;
  }
}</style>

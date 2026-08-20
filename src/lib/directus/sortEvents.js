// For the filter functionality on the website,
// the events are mapped to sortings and grouped together by shared properties.
//
// Each sorting is an object that contains all the possible properties - retrieved by the events.
// Every option itself is an array, containing event-ids for every event with this property.
//
// Example for "byLocations":
//
// {
// 	locationA: [eventid1, eventid3, eventid4],
// 	locationB: [eventid5],
// 	locationC: [eventid1, eventid2, eventid6]
// }

/** @typedef {string} Property */
/** @typedef {string} EventId */
/** @typedef {Object<Property, EventId[]>} EventSorting */

export default function sortEvents(data) {
	const eventsAsc = orderEventsByDate(data);
	/** @type {EventSorting} */
	const byAttribute = {};
	/** @type {EventSorting} */
	const byCategory = {};
	/** @type {EventSorting} */
	const byDate = {};
	/** @type {EventSorting} */
	const byLocation = {};

	for (let i = 0; i < eventsAsc.length; i++) {
		const event = eventsAsc[i];

		const attributes = getProperty(event, 'attributes');
		insert(event, attributes, byAttribute);

		const categories = getProperty(event, 'categories');
		insert(event, categories, byCategory);

		const {dates, locations} = getDatesAndLocations(event);
		insert(event, dates, byDate);
		insert(event, locations, byLocation);
	}

	return {
		all: eventsAsc,
		byDate,
		byCategory,
		byLocation,
		byAttribute,
	};
}

function getProperty(event, propertyName) {
	if (propertyName in event === false) throw `Property "${propertyName}" does not exist in event`;
	const names = event[propertyName]
		?.map((prop) => prop?.junction?.translations?.[0].name)
		.filter((name) => typeof name === 'string');
	return names;
}

function getDatesAndLocations(event) {
	const datesAndLocations = event.issues?.reduce(
		(acc, {dateStart, dateEnd, location}) => {
			if (dateStart) acc.dates.push(...getDateRange(dateStart, dateEnd));
			if (location) acc.locations.push(location);
			return acc;
		},
		{dates: [], locations: []},
	);
	return datesAndLocations;
}

function getDateRange(dateStart, dateEnd) {
	if (!dateEnd) return [dateStart];
	const range = [dateStart];
	const dateEndObj = new Date(dateEnd);
	const crntDateObj = new Date(dateStart);

	// Get the dates between startDate and endDate + endDate:
	while (crntDateObj < dateEndObj) {
		crntDateObj.setDate(crntDateObj.getDate() + 1);
		const asKey = crntDateObj.toISOString().split('T')[0];
		range.push(asKey);
	}

	return range;
}

function insert(event, properties, sorting) {
	properties.forEach((prop) => {
		if (prop in sorting) sorting[prop].push(event.id);
		else sorting[prop] = [event.id];
	});
}

function orderEventsByDate(events) {
	const eventsAsc = events.sort((a, b) => {
		const dateA = new Date(a.issues?.[0]?.dateStart);
		const dateB = new Date(b.issues?.[0]?.dateStart);

		const timeStartA = getTimeAsMinutes(a.issues?.[0]?.timeStart);
		const timeStartB = getTimeAsMinutes(b.issues?.[0]?.timeStart);

		return dateA - dateB || timeStartA - timeStartB;
	});
	return eventsAsc;
}

function getTimeAsMinutes(time) {
	if (typeof time !== 'string') return 0;
	const [h, m] = time.split(':');
	return (h || 0) * 60 + (m || 0);
}

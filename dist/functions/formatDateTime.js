export function formatDate(dateStr) {
	const date = new Date(dateStr);
	const full = date.toLocaleDateString('de-ch', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	});

	return full;
}

// export function formatDate(dateStr) {
// 	const date = new Date(dateStr);
// 	const full = date.toLocaleDateString('de-ch', {
// 		weekday: 'short',
// 		day: '2-digit',
// 		month: '2-digit',
// 		year: '2-digit',
// 	});

// 	const [weekday, dateFormated] = full.split(' ');

// 	const output = `${weekday.replaceAll(/[.,]/g, '')}, ${dateFormated}`;
// 	return output;
// }

export function formatTime(timeStr) {
	if (!timeStr) return null;
	const [hours, minutes] = timeStr.split(':');
	return `${hours}:${minutes}`;
}

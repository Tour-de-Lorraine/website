export function createMatchFunction(...names) {
	return function (param) {
		return names.find((name) => param === name);
	};
}

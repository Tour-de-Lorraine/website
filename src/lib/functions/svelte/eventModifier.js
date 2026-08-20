export function once(fn) {
	return function (e) {
		if (fn) fn.call(this.event);
		fn = null;
	};
}

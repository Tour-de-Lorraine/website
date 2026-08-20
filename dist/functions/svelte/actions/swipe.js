export function swipe(N, cb = null, {threshold = 100} = {}) {
	if (typeof cb !== 'function') throw 'Callback must be of type "function".';
	const getClientX = (e) => {
		return e?.targetTouches?.[0]?.clientX;
	};

	let startX = 0;

	const start = (e) => {
		startX = getClientX(e);
		document.addEventListener('touchend', end);
		document.addEventListener('touchmove', move);
	};

	const move = (e) => {
		const posX = getClientX(e);
		const distX = posX - startX;

		if (Math.abs(distX) < threshold) return;
		cb(distX);

		startX = posX;
	};

	const end = () => {
		document.removeEventListener('touchend', end);
		document.removeEventListener('touchmove', move);
	};

	N.addEventListener('touchstart', start);

	return {
		destroy() {
			document.removeEventListener('touchend', end);
			document.removeEventListener('touchend', end);
			document.removeEventListener('touchmove', move);
		}
	};
}

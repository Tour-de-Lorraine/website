export function clickOutside(N, cb) {
	if (typeof cb !== 'function') throw 'Callback must be of type "function".';

	const handleClick = ({target: NTarget}) => {
		if (!N.contains(NTarget) || N.isEqualNode(NTarget)) cb();
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}

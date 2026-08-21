export default (() => {
	let lang = 'init';
	let subs = [];

	const unsubscribe = (handler) => {
		subs = subs.filter((sub) => sub !== handler);
	};

	const subscribe = (handler) => {
		subs.push(handler);
		handler(lang);
		return unsubscribe.bind(null, handler);
	};

	const set = (newLang) => {
		if (lang === newLang) return;
		lang = newLang;
		subs.forEach((handler) => handler(lang));
	};

	const get = () => {
		return lang;
	};

	return {
		subscribe,
		set,
		get,
	};
})();

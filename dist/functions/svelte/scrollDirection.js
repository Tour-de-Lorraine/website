import {browser} from '$app/environment';

export function observeScrollDirection(writable) {
	if (!browser) return;

	const NScroll = document.getElementById('scroll');
	if (NScroll?.tagName === 'HTML') throw "Scroll container can't be <html>";

	if (!NScroll) return;

	writable.set('');

	let lastScrollY = 0;

	let timeout;
	const runner = () => {
		timeout = setTimeout(() => {
			const crntScrollY = NScroll.scrollTop;
			if (crntScrollY - lastScrollY > 0) {
				writable.set('down');
			} else {
				writable.set('up');
			}

			lastScrollY = NScroll.scrollTop;
			NScroll?.addEventListener('scroll', runner, {once: true});
		}, 100);
	};

	lastScrollY = NScroll.scrollTop;

	NScroll?.addEventListener('scroll', runner, {once: true});

	return () => {
		clearTimeout(timeout);
		NScroll?.removeEventListener('scroll', runner);
	};
}

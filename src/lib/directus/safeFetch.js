import readableError from './readableError.js';

export default async function safeFetch(fn) {
	try {
		const data = await fn();
		if (!data) throw 'No Data was fetched.';
		if (typeof data !== 'object' || 'errors' in data) throw data;
		return data;
	} catch (error) {
		const message = readableError(error);
		console.error('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
		console.error(fn);
		console.error(message);
		console.error('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
		return null;
	}
}

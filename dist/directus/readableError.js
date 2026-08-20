export default function handleError(errorData) {
	if (errorData instanceof Error) return errorData;
	if (typeof errorData !== 'object') return errorData;
	if ('errors' in errorData === false) return errorData;

	const errors = errorData?.errors || null;
	const messages = errors.reduce((acc, err) => {
		let message = err?.message || 'There is a problem displaying this Error.';
		let nested = Array.isArray(err?.extensions?.errors)
			? err.extensions.errors.map(
					(errNested) =>
						errNested?.message || 'There is a problem displaying this Error.',
				)
			: [];

		return [...acc, message, ...nested];
	}, []);

	return messages.join('\n');
}

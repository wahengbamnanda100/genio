export function getDropDownValues<T>(
	data: T[],
	label: keyof T,
	value: keyof T
): { label: T[keyof T]; value: T[keyof T] }[] {
	return data.map((item) => ({
		label: item[label],
		value: item[value],
	}));
}

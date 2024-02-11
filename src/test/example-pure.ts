export function add(...numbers: number[]) {
	return numbers.reduce((total, next) => {
		return total + next;
	}, 0);
}

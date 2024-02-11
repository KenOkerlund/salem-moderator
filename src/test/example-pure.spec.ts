import { add } from './example-pure';

describe('nothing', () => {
	test('what is this?', () => {
		expect(1 + 1).toEqual(2);
	});
});

describe('add()', () => {
	test('it should add', () => {
		expect(add(1, 2)).toBe(3);
	});
});

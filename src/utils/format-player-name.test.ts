import { formatPlayerName } from './format-player-name';

describe('formatPlayerName()', () => {
	it('should give a name (using the id) if name is empty', () => {
		const player = {
			id: 0,
			name: '',
		};
		expect(formatPlayerName(player)).toBe('Player 1');
	});
	it('should not edit a non-empty player name', () => {
		const player = {
			id: 0,
			name: 'Joe',
		};
		expect(formatPlayerName(player)).toBe('Joe');
	});
	it('should handle strings that appear to be empty', () => {
		const player = {
			id: 0,
			name: '  ',
		};
		expect(formatPlayerName(player)).toBe('Player 1');
	});
});

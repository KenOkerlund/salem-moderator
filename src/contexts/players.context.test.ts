import { createPlayers } from './players-context';

describe('createPlayers()', () => {
	it('should initialize with 4 players', () => {
		expect(createPlayers()).toHaveLength(4);
	});
});

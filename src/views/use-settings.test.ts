import useSettings, { createPlayers } from './use-settings';

describe('Use settings hook', () => {
	describe('createPlayers()', () => {
		it('should initalize with 4 players', () => {
			expect(createPlayers()).toHaveLength(4);
		});
	});

	describe('useSettings()', () => {
		it('should never have less than 4 players', () => {
			// Arrange
			const {players, removePlayer} = useSettings();
			const player1 = players[0];

			// Act
			removePlayer(player1.id);

			// Assert
			// expect(useSettings()).toBeGreaterThan(3);
		});
	});
});

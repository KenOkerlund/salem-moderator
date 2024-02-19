import { renderHook, act } from '@testing-library/react';
import useSettings, { createPlayers } from './use-settings';

describe('Use settings hook', () => {
	describe('createPlayers()', () => {
		it('should initalize with 4 players', () => {
			expect(createPlayers()).toHaveLength(4);
		});
	});

	describe('useSettings()', () => {
		it('should initialize with 4 players (hook)', () => {
			const { result } = renderHook(() => useSettings());

			expect(result.current.players.length).toBe(4);
		});

		it('should add a player', () => {
			const { result } = renderHook(() => useSettings());

			act(() => {
				result.current.addPlayer();
			});

			const lastPlayer = result.current.players[4];

			expect(result.current.players.length).toBe(5);
			expect(lastPlayer).toMatchObject({ id: 4, name: '' });
		});

		it('should not be able to have more than 12 players', () => {
			const { result } = renderHook(() => useSettings());
			for (let i = 4; i < 15; i++) {
				act(() => {
					result.current.addPlayer();
				});
			}
			expect(result.current.players.length).toBe(12);
		});

		it('should remove a player', () => {
			const { result } = renderHook(() => useSettings());
			act(() => {
				result.current.addPlayer();
			});
			act(() => {
				result.current.removePlayer(result.current.players[0].id);
			});
			expect(result.current.players.length).toBe(4);
		});

		it('should not be able to have less than 4 players', () => {
			const { result } = renderHook(() => useSettings());
			expect(result.current.players.length).toBe(4);

			act(() => {
				result.current.removePlayer(result.current.players[0].id);
			});

			expect(result.current.players.length).toBe(4);
		});

		it('should change a player name', () => {
			const { result } = renderHook(() => useSettings());
			const mockEvent = { target: { value: 'John Smith' } } as React.ChangeEvent<HTMLInputElement>;
			act(() => {
				result.current.changePlayerName(mockEvent, 0);
			});
			// note that players[0] and the 2nd parameter in act happen to be the same number.
			expect(result.current.players[0].name).toBe('John Smith');
		});

		it('should move a player up', () => {
			const { result } = renderHook(() => useSettings());

			act(() => {
				result.current.movePlayerUp(1);
			});

			expect(result.current.players[0].id).toBe(1);
		});

		it('should move a player down', () => {
			const { result } = renderHook(() => useSettings());

			act(() => {
				result.current.movePlayerDown(0);
			});

			expect(result.current.players[0].id).toBe(1);
		});

		it('should reset players', () => {
			const { result } = renderHook(() => useSettings());
			const playersFromCreatePlayers = createPlayers();

			// Change something about the current players
			act(() => {
				result.current.movePlayerDown(0);
			});

			act(() => {
				result.current.resetPlayers();
			});

			expect(result.current.players).toMatchObject(playersFromCreatePlayers);
		});
	});
});

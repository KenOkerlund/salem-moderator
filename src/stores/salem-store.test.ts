import { act, renderHook } from '@testing-library/react';
import { useSalemStore, maxPlayers, minPlayers } from './salem-store';
// import { createPlayers } from './salem-store';

describe('useSalemStore', () => {
	// const initialState = {
	// 	instructionSpeech: true,
	// 	players: createPlayers(),
	// };
	// beforeEach(() => {
	// 	useSalemStore.setState(initialState);
	// });

	beforeEach(() => {
		const { result } = renderHook(() => useSalemStore());
		act(() => {
			result.current.resetPlayers();
		});
	});

	it('should reset players', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.addPlayer();
			result.current.setPlayerName(0, 'This should not persist');
			result.current.movePlayerDown(1);
			result.current.resetPlayers();
		});

		expect(result.current.players.length).toBe(4);
		expect(result.current.players[0].name).toBe('');
		expect(result.current.players[1].id).toBe(1);
	});
	it('should toggle instructionSpeech', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.setInstructionSpeech(false);
		});

		expect(result.current.instructionSpeech).toBe(false);

		act(() => {
			result.current.setInstructionSpeech(true);
		});

		expect(result.current.instructionSpeech).toBe(true);
	});

	it('should set player name', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.setPlayerName(0, 'Player 1');
		});

		expect(result.current.players[0].name).toBe('Player 1');
	});

	it('should add a player', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.addPlayer();
		});

		expect(result.current.players.length).toBe(5);
		expect(result.current.players[4]).toMatchObject({ id:4, name:'' });
	});

	it('should not add more than max players', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			for (let i = 0; i <= maxPlayers; i++) {
				result.current.addPlayer();
			}
		});

		expect(result.current.players.length).toBe(maxPlayers);
	});

	it('should remove a player', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.addPlayer();
			result.current.removePlayer(0);
		});

		expect(result.current.players.length).toBe(4);
	});

	it('should not remove below min players', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.removePlayer(0);
		});

		expect(result.current.players.length).toBe(minPlayers);
	});

	it('should move player down', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.movePlayerDown(0);
		});

		expect(result.current.players[1].id).toBe(0);
	});

	it('should move player up', () => {
		const { result } = renderHook(() => useSalemStore());

		act(() => {
			result.current.movePlayerUp(3);
		});

		expect(result.current.players[3].id).toBe(2);
	});
});

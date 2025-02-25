import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useSettings from './use-settings';
import { createPlayers } from '../../contexts/players-context';

describe('Use settings hook', () => {
	describe('useSettings()', () => {
		it('should add a player', () => {
			// Arrange
			const mockedFn = vi.fn();
			const { result } = renderHook(() =>
				useSettings(createPlayers(), mockedFn),
			);

			// Act
			result.current.addPlayer();

			// Assert

			// option 1
			expect(mockedFn).toHaveBeenCalledWith([
				...createPlayers(),
				{ id: 4, name: '' },
			]);

			// option 2
			const calledWith = mockedFn.mock.calls[0][0];
			const lastPlayer = calledWith[4];
			expect(calledWith.length).toBe(5);
			expect(lastPlayer).toMatchObject({ id: 4, name: '' });
		});

		it('should increment the largest id by 1 when a new player is created', () => {
			// Arrange
			const mockedFn = vi.fn();
			const { result } = renderHook(() =>
				useSettings([{ id: 100, name: 'Test' }], mockedFn),
			);

			// Act
			result.current.addPlayer();

			// Assert
			// option 1
			expect(mockedFn).toHaveBeenCalledWith([
				{ id: 100, name: 'Test' },
				{ id: 101, name: '' },
			]);

			//option 2
			const lastPlayer = mockedFn.mock.calls[0][0][1];
			// const lastPlayer = mockedFn.mock.lastCall[0].at(-1);
			expect(lastPlayer.id).toBe(101);
		});

		it('should not be able to have more than 12 players', () => {
			// Arrange
			const mockedFn = vi.fn();
			const twelvePlayers = Array.from({ length: 12 }).map((_, i) => ({
				id: i,
				name: `${i}`,
			}));
			const { result } = renderHook(() => useSettings(twelvePlayers, mockedFn));

			// Act
			result.current.addPlayer();

			// Assert
			expect(mockedFn).not.toHaveBeenCalled();
		});

		it('should remove a player', () => {
			// Arrange
			const mockedFn = vi.fn();
			const { result } = renderHook(() =>
				useSettings(
					[...createPlayers(), { id: 101, name: 'Remove Me' }],
					mockedFn,
				),
			);

			// Act
			result.current.removePlayer(101);

			// Assert
			expect(mockedFn).toHaveBeenCalledWith(createPlayers());
		});

		it('should not be able to have less than 4 players', () => {
			// Arrange
			const mockedFn = vi.fn();
			const fivePlayers = Array.from({ length: 4 }).map((_, i) => ({
				id: i,
				name: `${i}`,
			}));
			const firstPlayerId = fivePlayers[0].id;
			const { result } = renderHook(() => useSettings(fivePlayers, mockedFn));

			// Act
			result.current.removePlayer(firstPlayerId);

			// Assert
			expect(mockedFn).not.toHaveBeenCalled();
		});

		it('should change a player name', () => {
			// Arrange
			const mockedfn = vi.fn();
			const { result } = renderHook(() =>
				useSettings(createPlayers(), mockedfn),
			);
			const mockEvent = {
				target: { value: 'John Smith' },
			} as React.ChangeEvent<HTMLInputElement>;

			// Act
			result.current.changePlayerName(mockEvent, 0);

			// Assert

			// Option 1, to show diving into the mocked function
			// expect(mockedfn).toHaveBeenCalled();
			// expect(mockedfn.mock.calls[0][0][0].name).toEqual('John Smith');

			// This assertion is better than the first because it ensures that
			// changePlayerName didn't do anything else to the players
			const expectedResult = [
				{ id: 0, name: 'John Smith' },
				{ id: 1, name: '' },
				{ id: 2, name: '' },
				{ id: 3, name: '' },
			];
			expect(mockedfn).toHaveBeenCalledWith(expectedResult);
		});

		it('should move a player up', () => {
			// Arrange
			const mockedFn = vi.fn();
			const { result } = renderHook(() =>
				useSettings(createPlayers(), mockedFn),
			);

			// Act
			result.current.movePlayerUp(1);

			// Assert
			const expectedResult = [
				{ id: 1, name: '' },
				{ id: 0, name: '' },
				{ id: 2, name: '' },
				{ id: 3, name: '' },
			];
			expect(mockedFn).toHaveBeenCalledWith(expectedResult);
		});

		it('should move a player down', () => {
			// Arrange
			const mockedFn = vi.fn();
			const { result } = renderHook(() =>
				useSettings(createPlayers(), mockedFn),
			);

			// Act
			result.current.movePlayerDown(1);

			// Assert
			const expectedResult = [
				{ id: 0, name: '' },
				{ id: 2, name: '' },
				{ id: 1, name: '' },
				{ id: 3, name: '' },
			];
			expect(mockedFn).toHaveBeenCalledWith(expectedResult);
		});
	});
});

import { createContext } from 'react';
import { Player } from '../types';

type PlayerContext = {
	players: Player[];
	setPlayers: (players: Player[]) => void;
	resetPlayers: () => void;
};

export const salemPlayerLocalStorageKey = 'salem_players';

export function createPlayers(): Player[] {
	return [
		{
			id: 0,
			name: '',
		},
		{
			id: 1,
			name: '',
		},
		{
			id: 2,
			name: '',
		},
		{
			id: 3,
			name: '',
		},
	];
}

// TODO KEN or KEVIN Unit test
export function getOrCreatePlayers(): Player[] {
	const possibleStoredSalemPlayer = window.localStorage.getItem(
		salemPlayerLocalStorageKey,
	);
	if (possibleStoredSalemPlayer) {
		try {
			const players = JSON.parse(possibleStoredSalemPlayer);

			if (Array.isArray(players) && players.length > 3) {
				const eachIsPlayer = players.every((item) => {
					return 'id' in item && 'name' in item;
				});
				if (eachIsPlayer) {
					return players;
				}
			}
		} catch (e) {
			// Clean up whatever existed here that was bad...
			window.localStorage.removeItem(salemPlayerLocalStorageKey);
		}
	}

	return createPlayers();
}

export const PlayersContext = createContext<PlayerContext>({
	players: [],
	setPlayers: () => {},
	resetPlayers: () => {},
});

import { createContext } from 'react';
import { Player } from './types';

type PlayerContext = {
	players: Player[];
	setPlayers: (players: Player[]) => void;
	resetPlayers: () => void;
}

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

export const PlayersContext = createContext<PlayerContext>({
	players: [],
	setPlayers: () => {},
	resetPlayers: () => {},
});

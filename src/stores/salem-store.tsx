import { create } from 'zustand';
import { Player } from '../types';

type SalemState = {
    instructionSpeech: boolean;
    setInstructionSpeech: (enabled: boolean) => void;
	players: Player[];
    setPlayerName: (playerId: number, name: string) => void;
    resetPlayers: () => void;
	addPlayer: () => void;
	removePlayer: (playerId: number) => void;
	movePlayerDown: (playerId: number) => void;
	movePlayerUp: (playerId: number) => void;
}

export const maxPlayers = 12;
export const minPlayers = 4;

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

export function getOrCreatePlayers(): Player[] {
	const possibleStoredSalemPlayer = window.localStorage.getItem(salemPlayerLocalStorageKey);
	if (possibleStoredSalemPlayer) {
		try {
			const players = JSON.parse(possibleStoredSalemPlayer);

			if (Array.isArray(players) && players.length > 3) {
				const eachIsPlayer = players.every((item) => 'id' in item && 'name' in item);
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

export const useSalemStore = create<SalemState>((set) => ({
	instructionSpeech: true,
	setInstructionSpeech: (enabled) => set(() => ({ instructionSpeech: enabled })),
	players: [
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
	],
	setPlayerName: (playerId, name) => 
		set((state) => {
			const players = [...state.players];
			const playerIndex = players.findIndex((player) => player.id === playerId);
			if (playerIndex >= 0) {
				players[playerIndex].name = name;
			}
			return { players };
		}),
	resetPlayers: () => set(() => ({ players: createPlayers() })),
	addPlayer: () => set((state) => {
		if (state.players.length >= maxPlayers) {
			return state;
		}
		const copyPlayers = [...state.players];
		const id = Math.max(...copyPlayers.map(p => p.id)) + 1;
		//player.name needs to be 1 value higher than player.id because the index starts at 0 and the name starts at "Player 1"
		copyPlayers.push({ id, name: '' });
		return { players: copyPlayers };
	}),
	removePlayer: (playerId) => set((state) => {
		if (state.players.length <= minPlayers) {
			return state;
		}
		const copyPlayers = state.players.filter(p => p.id !== playerId);
		return { players: copyPlayers };
	}),
	movePlayerDown: (playerId) => set((state) => {
		const copyPlayers = [...state.players];
		const playerIndex = copyPlayers.findIndex(p => p.id === playerId);
		const elementMoving = copyPlayers.splice(playerIndex, 1);
		copyPlayers.splice(playerIndex + 1, 0, elementMoving[0]);
		return { players: copyPlayers };
	}),
	movePlayerUp: (playerId) => set((state) => {
		const copyPlayers = [...state.players];
		const playerIndex = copyPlayers.findIndex(p => p.id === playerId);
		const elementMoving = copyPlayers.splice(playerIndex, 1);
		copyPlayers.splice(playerIndex - 1, 0, elementMoving[0]);
		return { players: copyPlayers };
	}),
}));

export const useCanAddPlayer = () => useSalemStore((state) => state.players.length < maxPlayers);
export const useCanRemovePlayer = () => useSalemStore((state) => state.players.length > minPlayers);

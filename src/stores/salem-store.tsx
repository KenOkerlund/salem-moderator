import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Player } from '../types';

type SalemState = {
	instructionSpeech: boolean;
	setInstructionSpeech: (enabled: boolean) => void;
	players: Player[];
	setPlayerName: (playerId: number, name: string) => void;
	resetSettings: () => void;
	addPlayer: () => void;
	removePlayer: (playerId: number) => void;
	movePlayerDown: (playerId: number) => void;
	movePlayerUp: (playerId: number) => void;
	isConstableChecked: boolean;
	setIsConstableChecked: (constableChecked: boolean) => void;
	phase: 'dawn' | 'night' | undefined;
	setPhase: (phase: 'dawn' | 'night' | undefined) => void;
};

export const maxPlayers = 12;
export const minPlayers = 4;

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

export const createStore = () => {
	return create<SalemState>()(
		persist(
			(set) => ({
				instructionSpeech: true,
				setInstructionSpeech: (enabled) =>
					set(() => ({ instructionSpeech: enabled })),
				players: createPlayers(),
				setPlayerName: (playerId, name) =>
					set((state) => {
						const players = [...state.players];
						const playerIndex = players.findIndex(
							(player) => player.id === playerId,
						);
						if (playerIndex >= 0) {
							players[playerIndex] = { ...players[playerIndex], name };
						}
						return { players };
					}),
				resetSettings: () => {
					set(() => ({
						players: createPlayers(),
						instructionSpeech: true,
						isConstableChecked: true,
					}));
				},
				addPlayer: () =>
					set((state) => {
						if (state.players.length >= maxPlayers) {
							return state;
						}
						const copyPlayers = [...state.players];
						const id = Math.max(...copyPlayers.map((p) => p.id)) + 1;
						//player.name needs to be 1 value higher than player.id because the index starts at 0 and the name starts at "Player 1"
						copyPlayers.push({ id, name: '' });
						return { players: copyPlayers };
					}),
				removePlayer: (playerId) =>
					set((state) => {
						if (state.players.length <= minPlayers) {
							return state;
						}
						const copyPlayers = state.players.filter((p) => p.id !== playerId);
						return { players: copyPlayers };
					}),
				movePlayerDown: (playerId) =>
					set((state) => {
						const copyPlayers = [...state.players];
						const playerIndex = copyPlayers.findIndex((p) => p.id === playerId);
						const elementMoving = copyPlayers.splice(playerIndex, 1);
						copyPlayers.splice(playerIndex + 1, 0, elementMoving[0]);
						return { players: copyPlayers };
					}),
				movePlayerUp: (playerId) =>
					set((state) => {
						const copyPlayers = [...state.players];
						const playerIndex = copyPlayers.findIndex((p) => p.id === playerId);
						const elementMoving = copyPlayers.splice(playerIndex, 1);
						copyPlayers.splice(playerIndex - 1, 0, elementMoving[0]);
						return { players: copyPlayers };
					}),
				isConstableChecked: true,
				setIsConstableChecked: (constableChecked) =>
					set(() => ({ isConstableChecked: constableChecked })),
				phase: undefined,
				setPhase: (phase) => set(() => ({ phase: phase })),
			}),
			{
				name: 'salem_storage',
			},
		),
	);
};

export const useSalemStore = createStore();

export const useCanAddPlayer = () =>
	useSalemStore((state) => state.players.length < maxPlayers);
export const useCanRemovePlayer = () =>
	useSalemStore((state) => state.players.length > minPlayers);

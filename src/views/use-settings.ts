import { useState } from 'react';
const maxPlayers = 12;
const minPlayers = 4;

function createPlayers() {
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

export default function useSettings() {
	const [players, setPlayers] = useState(createPlayers());

	const changePlayerName = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const copyPlayers = [...players];
		const player = copyPlayers.find(p => p.id === id);
		player.name = e.target.value;
		setPlayers(copyPlayers);
	};

	const addPlayer = () => {
		if (players.length >= maxPlayers) {
			return;
		}
		const copyPlayers = [...players];
		const id = Math.max(...players.map(p => p.id)) + 1;
		//player.name needs to be 1 value higher than player.id because the index starts at 0 and the name starts at "Player 1"
		copyPlayers.push({ id, name: '' });
		setPlayers(copyPlayers);
	};

	const removePlayer = (id: number) => {
		if (players.length <= minPlayers) {
			return;
		}
		const copyPlayers = players.filter(p => p.id !== id);
		setPlayers(copyPlayers);
	};

	const movePlayerDown = (id: number) => {
		const copyPlayers = [...players];
		const playerIndex = copyPlayers.findIndex(p => p.id === id);
		const elementMoving = copyPlayers.splice(playerIndex, 1);
		copyPlayers.splice(playerIndex + 1, 0, elementMoving[0]);
		setPlayers(copyPlayers);
	};

	const movePlayerUp = (id: number) => {
		const copyPlayers = [...players];
		const playerIndex = copyPlayers.findIndex(p => p.id === id);
		const elementMoving = copyPlayers.splice(playerIndex, 1);
		copyPlayers.splice(playerIndex - 1, 0, elementMoving[0]);
		setPlayers(copyPlayers);
	};

	const resetPlayers = () => {
		setPlayers(createPlayers());
	};

	return {
		players,
		changePlayerName,
		addPlayer,
		canAddPlayer: players.length < maxPlayers,
		removePlayer,
		canRemovePlayer: players.length > minPlayers,
		movePlayerDown,
		movePlayerUp,
		resetPlayers,
	};
}


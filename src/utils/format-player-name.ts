import { Player } from '../types';

export function formatPlayerName(player: Player){
	if(player.name.trim() === ''){
		return `Player ${player.id + 1}`; 
	}
	return player.name;
}

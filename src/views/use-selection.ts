import { useState } from 'react';
import { Player } from '../types';

type Stage = 'player-selection' | 'confession' | 'reveal';

export function useSelection(){
	const [phase, setPhase] = useState<'dawn' | 'night'>();
	const [stage, setStage] = useState<Stage>('player-selection');
	const [witchesSelection, setWitchesSelection] = useState<Player>();
	const [constableSelection, setConstableSelection] = useState<Player>();
	const [witchesSelectionRevealed, setWitchesSelectionRevealed] = useState(false);
	const [constableSelectionRevealed, setConstableSelectionRevealed] = useState(false);
	const [playersHaveConfessed, setPlayersHaveConfessed] = useState(false);

	let instructionalText = '';
	let audience = 'Witches';
	if (phase === 'dawn'){
		if(!witchesSelection){
			instructionalText = 'Select a player to receive the Black Cat. You may select yourself.';
		}
		else {
			instructionalText = 'Reveal the player who was given the Black Cat.';
			audience = 'Players';
		}
	}

	if (phase === 'night'){
		if(!witchesSelection){
			instructionalText = 'Select a player to kill. You may select yourself.';
		}
		else if(!constableSelection){
			instructionalText = 'Select a player to protect. You may NOT select yourself.';
		}
		else if(!constableSelectionRevealed){
			instructionalText = 'Reveal the player who was protected by the Constable.';
		}
		else if(constableSelectionRevealed){
			instructionalText = 'Decide if you want to confess.';
		}
		else if(!witchesSelectionRevealed){
			instructionalText = 'Reveal the player who was attacked by the Witches.';
		}
	}

	// let actingPlayer = 
	const setWitchSelection = (player: Player) => {
		setWitchesSelection(player);
		setStage('reveal');		
	};
	
	return {
		phase,
		setPhase,
		stage,
		instructionalText,
		witchesSelection,
		setWitchSelection,
		audience,
	};
}

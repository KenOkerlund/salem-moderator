import { useState } from 'react';
import { Player } from '../types';

type Stage = 'player-selection' | 'confession' | 'reveal';

export function useSelection(){
	const [phase, setPhase] = useState<'dawn' | 'night'>();
	const [stage, setStage] = useState<Stage>('player-selection');
	const [witchesSelection, setWitchesSelection] = useState<Player>();
	const [constableSelection, setConstableSelection] = useState<Player>();
	const [isConstableChecked, setIsConstableChecked] = useState(true);
	const [witchesSelectionRevealed, setWitchesSelectionRevealed] = useState(false);
	const [constableSelectionRevealed, setConstableSelectionRevealed] = useState(false);
	const [playersHaveConfessed, setPlayersHaveConfessed] = useState(false);

	let instructionalText = '';
	let audience = 'Witches';
	if (phase === 'dawn'){
		if(!witchesSelection){
			instructionalText = 'Select a player to receive the Black Cat. You may select yourself.';
			audience = 'Witches';
		}
		else {
			instructionalText = 'Reveal the player who was given the Black Cat.';
			audience = 'Players';
		}
	}

	if (phase === 'night'){
		if(!witchesSelection){
			instructionalText = 'Select a player to kill. You may select yourself.';
			audience = 'Witches';
		}
		else if(!constableSelection && isConstableChecked){
			instructionalText = 'Select a player to protect. You may NOT select yourself.';
			audience = 'Constable';
		}
		else if(!constableSelectionRevealed && isConstableChecked){
			instructionalText = 'Reveal the player who was protected by the Constable.';
			audience = 'Players';
		}
		else if(constableSelectionRevealed){
			instructionalText = 'Decide if you want to confess.';
			audience = 'Players';
		}
		else if(!witchesSelectionRevealed){
			instructionalText = 'Reveal the player who was attacked by the Witches.';
			audience = 'Players';
		}
	}

	// let actingPlayer = 
	const setWitchSelection = (player: Player) => {
		setWitchesSelection(player);
		if(phase === 'dawn' || !isConstableChecked){
			setStage('reveal');		
		}
		else {
			setStage('player-selection');
		}
	};
	const setTheConstableSelection = (player: Player) => {
		setConstableSelection(player);
		setStage('reveal');
	};

	const handleChangeConstableChecked = () => {
		setIsConstableChecked(!isConstableChecked);
	};

	// const handleConstableSelectionRevealClick = () => {
	// 	setConstableSelectionRevealed(true);
	// };
	
	return {
		phase,
		setPhase,
		stage,
		instructionalText,
		witchesSelection,
		setWitchSelection,
		audience,
		constableSelection,
		setTheConstableSelection,
		isConstableChecked,
		handleChangeConstableChecked,
		// constableSelectionRevealed,
		// handleConstableSelectionRevealClick,
	};
}

import { useState } from 'react';
import { Player } from '../../types';

type Stage = 'player-selection' | 'confession' | 'reveal';

type Step = {
	instructionalText: string;
	audience: 'Witches' | 'Players' | 'Constable';
	setPlayer: (player: Player) => void;
	stage: Stage;
	playerToReveal: null | undefined | Player;
	next: null | (() => void);
}

export function useSelection() {
	const [phase, setPhase] = useState<'dawn' | 'night'>();
	const [step, setStep] = useState<number>(0);

	const [witchesSelection, setWitchesSelection] = useState<Player>();
	const [constableSelection, setConstableSelection] = useState<Player>();
	const [isConstableChecked, setIsConstableChecked] = useState(true);
	const [isRevealing, setIsRevealing] = useState(false);

	const reset = () => {
		setPhase(undefined);
		setStep(0);
		setWitchesSelection(undefined);
		setConstableSelection(undefined);
		setIsRevealing(false);
	};

	const nextStep = () => setStep(step + 1);
	const skipSteps = (count: number) => setStep(step + count + 1);

	const dawnSteps: Step[] = [
		{
			instructionalText: 'Select a player to receive the Black Cat. You may select yourself.',
			audience: 'Witches',
			setPlayer: (player: Player) => {
				setWitchesSelection(player);
				nextStep();
			},
			stage: 'player-selection',
			playerToReveal: null,
			next: null,
		},
		{
			instructionalText: 'Reveal the player who was given the Black Cat.',
			audience: 'Players',
			setPlayer: () => {},
			stage: 'reveal',
			playerToReveal: isRevealing ? witchesSelection : null,
			next: isRevealing ? () => reset() : null,
		},
	];

	const nightSteps: Step[] = [
		{
			instructionalText: 'Select a player to kill. You may select yourself.',
			audience: 'Witches',
			setPlayer: (player: Player) => {
				setWitchesSelection(player);
				if (isConstableChecked) {
					nextStep();
				}
				else {
					skipSteps(2);
				}
			},
			stage: 'player-selection',
			playerToReveal: null,
			next: null,
		},
		{
			instructionalText: 'Select a player to protect. You may NOT select yourself.',
			audience: 'Constable',
			setPlayer: (player: Player) => {
				setConstableSelection(player);
				nextStep();
			},
			stage: 'player-selection',
			playerToReveal: null,
			next: null,
		},
		{
			instructionalText: 'Reveal the player who was protected by the Constable.',
			audience: 'Players',
			setPlayer: () => {},
			stage: 'reveal',
			playerToReveal: isRevealing ? constableSelection : null,
			next: isRevealing ? () => {
				setIsRevealing(false);
				nextStep(); 
			} : null,
		},
		{
			instructionalText: 'Decide if you want to confess.',
			audience: 'Players',
			setPlayer: () => {},
			stage: 'confession',
			playerToReveal: null,
			next: () => {
				nextStep();
			},
		},
		{
			instructionalText: 'Reveal the player who was attacked by the Witches.',
			audience: 'Players',
			setPlayer: () => {},
			stage: 'reveal',
			playerToReveal: isRevealing ? witchesSelection : null,
			next: isRevealing ? () => reset() : null,
		},
	];

	const handleChangeConstableChecked = () => {
		setIsConstableChecked(prevState => !prevState);
	};

	const allowReveal = () => setIsRevealing(true);

	return {
		phase,
		setPhase,
		isConstableChecked,
		handleChangeConstableChecked,
		allowReveal,
		reset,
		...(phase === 'dawn' ? dawnSteps[step] : nightSteps[step]),
	};
}

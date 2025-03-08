import { useEffect, useState } from 'react';

import { useSalemStore } from '../../stores/salem-store';

import { Player } from '../../types';

type Stage = 'player-selection' | 'confession' | 'reveal';

type Step = {
	instructionalText: string;
	moderatorSpeech?: string[];
	audience: 'Witches' | 'Players' | 'Constable';
	setPlayer: (player: Player) => void;
	stage: Stage;
	playerToReveal: null | undefined | Player;
	next: null | (() => void);
};

const voice = window.speechSynthesis.getVoices()[1];

let speechDelayTimer: number | undefined = undefined;

export function useSelection() {
	const [phase, setPhase] = useState<'dawn' | 'night'>();
	const [step, setStep] = useState<number>(0);

	const [witchesSelection, setWitchesSelection] = useState<Player>();
	const [constableSelection, setConstableSelection] = useState<Player>();
	const [isRevealing, setIsRevealing] = useState(false);

	const instructionSpeech = useSalemStore((state) => state.instructionSpeech);
	const isConstableChecked = useSalemStore((state) => state.isConstableChecked);

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
			instructionalText:
				'Select a player to receive the Black Cat. You may select yourself.',
			moderatorSpeech: [
				'All players close your eyes.',
				"Everyone's eyes should be closed.",
				'If you have, or have ever had a witch card, open your eyes, and choose any player to give the black cat. You may even choose a witch.',
			],
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
			moderatorSpeech: !isRevealing
				? [
						'The witches have made their choice.',
						'Witches, close your eyes.',
						'Everyone, open your eyes.',
					]
				: undefined,
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
			moderatorSpeech: [
				'All players close your eyes.',
				"Everyone's eyes should be closed.",
				'If you have, or have ever had a witch card, open your eyes, and choose any player to kill. You may even choose a witch.',
			],
			audience: 'Witches',
			setPlayer: (player: Player) => {
				setWitchesSelection(player);
				if (isConstableChecked) {
					nextStep();
				} else {
					skipSteps(2);
				}
			},
			stage: 'player-selection',
			playerToReveal: null,
			next: null,
		},
		{
			instructionalText:
				'Select a player to protect. You may NOT select yourself.',
			moderatorSpeech: [
				'The witches have made their choice.',
				'Witches, close your eyes.',
				'Constable, open your eyes and choose a player to protect this night. You cannot choose yourself!',
			],
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
			instructionalText:
				'Reveal the player who was protected by the Constable.',
			moderatorSpeech: !isRevealing
				? [
						'The constable has made their choice.',
						'Constable, close your eyes.',
						'Everyone, open your eyes.',
					]
				: undefined,
			audience: 'Players',
			setPlayer: () => {},
			stage: 'reveal',
			playerToReveal: isRevealing ? constableSelection : null,
			next: isRevealing
				? () => {
						setIsRevealing(false);
						nextStep();
					}
				: null,
		},
		{
			instructionalText: 'Decide if you want to confess.',
			moderatorSpeech: !constableSelection
				? [
						'The witches have made a choice.',
						'Witches, close your eyes.',
						'Everyone, open your eyes.',
					]
				: undefined,
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

	const allowReveal = () => setIsRevealing(true);

	const currentStep = phase === 'dawn' ? dawnSteps[step] : nightSteps[step];

	useEffect(() => {
		window.speechSynthesis.cancel();
		window.clearTimeout(speechDelayTimer);
		if (phase && currentStep.moderatorSpeech && instructionSpeech) {
			const queue = [...currentStep.moderatorSpeech];
			const speakNext = () => {
				if (!queue.length) {
					return;
				}
				const currentSpeech = queue.shift();
				const utterance = new SpeechSynthesisUtterance(currentSpeech);
				utterance.voice = voice;
				utterance.rate = 0.75;
				utterance.pitch = 0.75;
				utterance.onend = () => {
					if (queue.length) {
						speechDelayTimer = window.setTimeout(speakNext, 1000);
					}
				};
				window.speechSynthesis.speak(utterance);
			};
			speakNext();
		}
	}, [phase, currentStep, instructionSpeech]);

	return {
		phase,
		setPhase,
		isConstableChecked,
		allowReveal,
		reset,
		...currentStep,
	};
}

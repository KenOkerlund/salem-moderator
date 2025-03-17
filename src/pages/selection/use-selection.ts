import { useEffect } from 'react';

import { useSalemStore } from '../../stores/salem-store';

import { Player } from '../../types';

type Step = {
	stage: 'player-selection' | 'confession' | 'reveal' | 'vocal-instruction';
	filterIfNoConstable?: true;
	audience: 'Witches' | 'Players' | 'Constable';
	instructionalText: string;
	moderatorSpeech?: string[];
	setPlayer: (player: Player) => void;
	playerToReveal: null | undefined | Player;
	next: null | (() => void);
	autoNext?: boolean;
	noVoiceAutoNextTiming?: number;
};

const voice = window.speechSynthesis.getVoices()[1];

let speechDelayTimer: number | undefined = undefined;

export function useSelection() {
	const phase = useSalemStore((state) => state.phase);
	const setPhase = useSalemStore((state) => state.setPhase);
	const step = useSalemStore((state) => state.step);
	const setStep = useSalemStore((state)=> state.setStep);
	const isRevealing = useSalemStore((state) => state.isRevealing);
	const setIsRevealing = useSalemStore((state) => state.setIsRevealing);

	const witchesSelection = useSalemStore((state) => state.witchesSelection);
	const setWitchesSelection = useSalemStore((state) => state.setWitchesSelection);
	const constableSelection = useSalemStore((state) => state.constableSelection);
	const setConstableSelection = useSalemStore((state) => state.setConstableSelection);

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

	const dawnSteps: Step[] = [
		{
			stage: 'vocal-instruction',
			audience: 'Players',
			instructionalText: 'Close your eyes.',
			moderatorSpeech: [
				'All players close your eyes.',
				"Everyone's eyes should be closed.",
			],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 5,
			next: nextStep,
		},
		{
			stage: 'player-selection',
			audience: 'Witches',
			instructionalText:
				'Select a player to receive the Black Cat. You may select yourself.',
			moderatorSpeech: [
				'If you have, or have ever had a witch card, open your eyes, and choose any player to give the black cat. You may even choose a witch.',
			],
			setPlayer: (player: Player) => {
				setWitchesSelection(player);
				nextStep();
			},
			playerToReveal: null,
			next: null,
		},
		{
			stage: 'vocal-instruction',
			audience: 'Witches',
			instructionalText: 'Close your eyes.',
			moderatorSpeech: [
				'The witches have made their choice.',
				'Witches, close your eyes.',
			],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 5,
			next: nextStep,
		},
		{
			stage: 'vocal-instruction',
			audience: 'Players',
			instructionalText: 'Open your eyes.',
			moderatorSpeech: ['Everyone, open your eyes.'],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 0,
			next: nextStep,
		},
		{
			stage: 'reveal',
			audience: 'Players',
			instructionalText: 'Reveal the player who was given the Black Cat.',
			setPlayer: () => {},
			playerToReveal: isRevealing ? witchesSelection : null,
			next: isRevealing ? () => reset() : null,
		},
	];

	const unfilteredNightSteps: Step[] = [
		{
			stage: 'vocal-instruction',
			audience: 'Players',
			instructionalText: 'Close your eyes.',
			moderatorSpeech: [
				'All players close your eyes.',
				"Everyone's eyes should be closed.",
			],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 5,
			next: nextStep,
		},
		{
			stage: 'player-selection',
			audience: 'Witches',
			instructionalText: 'Select a player to kill. You may select yourself.',
			moderatorSpeech: [
				'If you have, or have ever had a witch card, open your eyes, and choose any player to kill. You may even choose a witch.',
			],
			setPlayer: (player: Player) => {
				setWitchesSelection(player);
				nextStep();
			},
			playerToReveal: null,
			next: null,
		},
		{
			stage: 'vocal-instruction',
			audience: 'Witches',
			instructionalText: 'Close your eyes.',
			moderatorSpeech: [
				'The witches have made their choice.',
				'Witches, close your eyes.',
			],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 5,
			next: nextStep,
		},
		{
			filterIfNoConstable: true,
			stage: 'player-selection',
			audience: 'Constable',
			instructionalText:
				'Select a player to protect. You may NOT select yourself.',
			moderatorSpeech: [
				'Constable, open your eyes and choose a player to protect this night. You cannot choose yourself!',
			],
			setPlayer: (player: Player) => {
				setConstableSelection(player);
				nextStep();
			},
			playerToReveal: null,
			next: null,
		},
		{
			filterIfNoConstable: true,
			stage: 'vocal-instruction',
			audience: 'Constable',
			instructionalText: 'Close your eyes.',
			moderatorSpeech: [
				'The constable has made their choice.',
				'Constable, close your eyes.',
			],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 5,
			next: nextStep,
		},
		{
			stage: 'vocal-instruction',
			audience: 'Players',
			instructionalText: 'Open your eyes.',
			moderatorSpeech: ['Everyone, open your eyes.'],
			setPlayer: () => {},
			playerToReveal: null,
			autoNext: true,
			noVoiceAutoNextTiming: 0,
			next: nextStep,
		},
		{
			filterIfNoConstable: true,
			stage: 'reveal',
			audience: 'Players',
			instructionalText:
				'Reveal the player who was protected by the Constable.',
			setPlayer: () => {},
			playerToReveal: isRevealing ? constableSelection : null,
			next: isRevealing
				? () => {
						setIsRevealing(false);
						nextStep();
					}
				: null,
		},
		{
			stage: 'confession',
			audience: 'Players',
			instructionalText: 'Decide if you want to confess.',
			setPlayer: () => {},
			playerToReveal: null,
			next: nextStep,
		},
		{
			stage: 'reveal',
			audience: 'Players',
			instructionalText: 'Reveal the player who was attacked by the Witches.',
			setPlayer: () => {},
			playerToReveal: isRevealing ? witchesSelection : null,
			next: isRevealing ? () => reset() : null,
		},
	];

	const nightSteps = unfilteredNightSteps.filter((step) => {
		if (!isConstableChecked && step.filterIfNoConstable) {
			return false;
		}
		return true;
	});

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
					} else if (currentStep.autoNext) {
						speechDelayTimer = window.setTimeout(() => {
							currentStep.next?.();
						}, 2000);
					}
				};
				window.speechSynthesis.speak(utterance);
			};
			speakNext();
		}
		if (
			phase &&
			!instructionSpeech &&
			currentStep.noVoiceAutoNextTiming !== undefined
		) {
			speechDelayTimer = window.setTimeout(() => {
				currentStep.next?.();
			}, currentStep.noVoiceAutoNextTiming * 1000);
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

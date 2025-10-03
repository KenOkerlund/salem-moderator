import { useEffect, useRef } from 'react';

import { useSalemStore } from '../../stores/salem-store';

import { Player } from '../../types';

type Step = {
	stage: 'player-selection' | 'confession' | 'reveal' | 'vocal-instruction';
	filterIfNoConstable?: true;
	audience: 'Witches' | 'Players' | 'Constable';
	instructionalText: string;
	audioFile?: string;
	setPlayer: (player: Player) => void;
	playerToReveal: null | undefined | Player;
	next: null | (() => void);
	autoNext?: boolean;
	noVoiceAutoNextTiming?: number;
};

import allCloseEyesAudio from '../../assets/audio/all-close-eyes.mp3';
import witchesBlackCatSelectionAudio from '../../assets/audio/witches-initial-black-cat-selection.mp3';
import witchesCompletedSeletionAudio from '../../assets/audio/witches-completed-selection.mp3';
import allOpenEyesAudio from '../../assets/audio/all-open-eyes.mp3';
import witchesInitialKillSelectionAudio from '../../assets/audio/witches-initial-kill-selection.mp3';
import constableInitialProtectionSelectionAudio from '../../assets/audio/constable-initial-protection-selection.mp3';
import constableCompletedSelectionAudio from '../../assets/audio/constable-completed-selection.mp3';

let speechDelayTimer: number | undefined = undefined;

export function useSelection() {
	const phase = useSalemStore((state) => state.phase);
	const step = useSalemStore((state) => state.step);
	const setStep = useSalemStore((state) => state.setStep);
	const isRevealing = useSalemStore((state) => state.isRevealing);
	const setIsRevealing = useSalemStore((state) => state.setIsRevealing);

	const witchesSelection = useSalemStore((state) => state.witchesSelection);
	const setWitchesSelection = useSalemStore(
		(state) => state.setWitchesSelection,
	);
	const constableSelection = useSalemStore((state) => state.constableSelection);
	const setConstableSelection = useSalemStore(
		(state) => state.setConstableSelection,
	);

	const instructionSpeech = useSalemStore((state) => state.instructionSpeech);
	const isConstableChecked = useSalemStore((state) => state.isConstableChecked);
	const resetSelectionProcess = useSalemStore(
		(state) => state.resetSelectionProcess,
	);

	const nextStep = () => setStep(step + 1);

	// Audio references to persist across renders
	const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

	// Preload audio files on component mount
	useEffect(() => {
		const audioFiles = [
			allCloseEyesAudio,
			witchesBlackCatSelectionAudio,
			witchesCompletedSeletionAudio,
			allOpenEyesAudio,
			witchesInitialKillSelectionAudio,
			constableInitialProtectionSelectionAudio,
			constableCompletedSelectionAudio,
		];

		audioFiles.forEach((src) => {
			if (!audioRefs.current.has(src)) {
				const audio = new Audio(src);
				audio.preload = 'auto';
				audio.load();
				audioRefs.current.set(src, audio);
			}
		});

		const currentRefAudios = audioRefs.current;

		// Cleanup audio elements on unmount
		return () => {
			currentRefAudios.forEach((audio) => {
				audio.pause();
				audio.currentTime = 0;
			});
			currentRefAudios.clear();
			window.clearTimeout(speechDelayTimer);
		};
	}, []);

	// Handle audio playback when step changes
	useEffect(() => {
		// Clear any existing timer
		window.clearTimeout(speechDelayTimer);

		// Stop any currently playing audio
		audioRefs.current.forEach((audio) => {
			audio.pause();
			audio.currentTime = 0;
		});

		// Play audio if available and instructionSpeech is enabled
		if (phase && currentStep.audioFile && instructionSpeech) {
			const audio = audioRefs.current.get(currentStep.audioFile);
			if (audio) {
				audio.currentTime = 0;
				audio.play().catch((error) => {
					console.error('Audio playback failed:', error);
				});
				audio.onended = () => {
					if (currentStep.autoNext) {
						speechDelayTimer = window.setTimeout(() => {
							currentStep.next?.();
						}, 2000);
					}
				};
			}
		} else if (
			phase &&
			!instructionSpeech &&
			currentStep.noVoiceAutoNextTiming !== undefined
		) {
			speechDelayTimer = window.setTimeout(() => {
				currentStep.next?.();
			}, currentStep.noVoiceAutoNextTiming * 1000);
		}

		const currentRefAudios = audioRefs.current;

		// Cleanup on step change or unmount
		return () => {
			window.clearTimeout(speechDelayTimer);
			currentRefAudios.forEach((audio) => {
				audio.pause();
				audio.currentTime = 0;
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [phase, step, instructionSpeech]);

	const dawnSteps: Step[] = [
		{
			stage: 'vocal-instruction',
			audience: 'Players',
			instructionalText: 'Close your eyes.',
			audioFile: allCloseEyesAudio,
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
			audioFile: witchesBlackCatSelectionAudio,
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
			audioFile: witchesCompletedSeletionAudio,
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
			audioFile: allOpenEyesAudio,
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
			next: isRevealing ? () => resetSelectionProcess() : null,
		},
	];

	const unfilteredNightSteps: Step[] = [
		{
			stage: 'vocal-instruction',
			audience: 'Players',
			instructionalText: 'Close your eyes.',
			audioFile: allCloseEyesAudio,
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
			audioFile: witchesInitialKillSelectionAudio,
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
			audioFile: witchesCompletedSeletionAudio,
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
			audioFile: constableInitialProtectionSelectionAudio,
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
			audioFile: constableCompletedSelectionAudio,
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
			audioFile: allOpenEyesAudio,
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
			next: isRevealing ? () => resetSelectionProcess() : null,
		},
	];

	const nightSteps = unfilteredNightSteps.filter((step) => {
		if (!isConstableChecked && step.filterIfNoConstable) {
			return false;
		}
		return true;
	});

	const currentStep = phase === 'dawn' ? dawnSteps[step] : nightSteps[step];

	return {
		...currentStep,
	};
}

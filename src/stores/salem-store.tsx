import { create } from 'zustand';

type SalemState = {
	instructionSpeech: boolean;
	setInstructionSpeech: (enabled: boolean) => void;
}

export const useSalemStore = create<SalemState>((set) => ({
	instructionSpeech: true,
	setInstructionSpeech: (enabled) => set(() => ({ instructionSpeech: enabled })),
}));

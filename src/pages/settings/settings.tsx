import { useNavigate } from 'react-router-dom';
import { useSalemStore } from '../../stores/salem-store';
import { Footer } from '../shared-components/footer/footer';
import PlayersList from '../settings/player-settings';
import ResetSettings from '../settings/reset-settings';
import LineBreak from '../../components/line-break/line-break';
import styles from './settings.module.css';

function Settings() {
	const navigate = useNavigate();

	const instructionSpeech = useSalemStore((state) => state.instructionSpeech);
	const setInstructionSpeech = useSalemStore(
		(state) => state.setInstructionSpeech,
	);

	return (
		<>
			<div className={styles.settings}>
				<PlayersList />

				<LineBreak />

				<div className={styles.resetSettings}>
					<h2>Audio Settings</h2>
					<p>Turns the audio on or off.</p>
					<input
						type="checkbox"
						value="audio"
						checked={instructionSpeech}
						onChange={() => setInstructionSpeech(!instructionSpeech)}
					/>
				</div>

				<LineBreak />

				<ResetSettings />
			</div>
			<Footer
				autoLeft
				onPrimaryClick={() => navigate('/selection')}
				primaryButtonText="Play"
				onSecondaryClick={() => navigate('/')}
				secondaryButtonText="Quit"
			/>
		</>
	);
}

export default Settings;

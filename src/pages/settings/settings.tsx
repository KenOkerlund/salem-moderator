import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PlayersContext } from '../../contexts/players-context';
import { useSalemStore } from '../../stores/salem-store';
import { Footer } from '../shared-components/footer/footer';
import PlayersList from '../settings/player-settings';
import ResetSettings from '../settings/reset-settings';
import LineBreak from '../../components/line-break/line-break';
import useSettings from './use-settings';
import styles from './settings.module.css';

function Settings() {
	const navigate = useNavigate();
	const { players, setPlayers, resetPlayers } = useContext(PlayersContext);
	const {
		changePlayerName,
		addPlayer,
		canAddPlayer,
		removePlayer,
		canRemovePlayer,
		movePlayerDown,
		movePlayerUp,
	} = useSettings(players, setPlayers);

	const instructionSpeech = useSalemStore((state) => state.instructionSpeech);
	const setInstructionSpeech = useSalemStore((state) => state.setInstructionSpeech);
	

	// console.log(players);
	return (
		<>
			<div className={styles.settings}>
				<PlayersList
					players={players}
					changePlayerName={changePlayerName}
					addPlayer={addPlayer}
					canAddPlayer={canAddPlayer}
					removePlayer={removePlayer}
					canRemovePlayer={canRemovePlayer}
					movePlayerDown={movePlayerDown}
					movePlayerUp={movePlayerUp}
				/>

				<LineBreak />

				<div className={styles.resetSettings}>
					<h2>Audio Settings</h2>
					<p>Turns the audio on or off.</p>
					<input type="checkbox" value='audio' checked={instructionSpeech} onChange={() => (setInstructionSpeech(!instructionSpeech))}/>
				</div>

				<LineBreak />

				<ResetSettings onReset={resetPlayers} />
			</div>
			<Footer
				autoLeft
				onPrimaryClick={() => navigate('/selection')}
				primaryButtonText='Play'
				onSecondaryClick={() => navigate('/')}
				secondaryButtonText='Quit'
			/>
		</>
	);
}

export default Settings;

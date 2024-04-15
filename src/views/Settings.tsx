import { useNavigate } from 'react-router-dom';
import { Footer } from './Components/footer/footer';
import PlayersList from './Components/PlayerSettings';
import ResetSettings from './Components/ResetSettings';
import LineBreak from '../elements/LineBreak';
import useSettings from './use-settings';
import styles from './settings.module.css';

function Settings() {
	const navigate = useNavigate();
	const {
		players,
		changePlayerName,
		addPlayer,
		canAddPlayer,
		removePlayer,
		canRemovePlayer,
		movePlayerDown,
		movePlayerUp,
		resetPlayers,
	} = useSettings();

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

				<ResetSettings onReset={resetPlayers} />
			</div>
			<Footer
				autoLeft
				onPrimaryClick={() => navigate('/select-phase')}
				primaryButtonText='Play'
				onSecondaryClick={() => navigate('/')}
				secondaryButtonText='Quit'
			/>
		</>
	);
}

export default Settings;

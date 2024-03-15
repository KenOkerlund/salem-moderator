import LineBreak from '../elements/LineBreak';
import MultiSync from './Components/MultiSync';
import PlayersList from './Components/PlayerSettings';
import ResetSettings from './Components/ResetSettings';
import useSettings from './use-settings';

function Settings() {

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
		<div className="settings-page">
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
			<LineBreak />
			<MultiSync />
		</div>
	);
}

export default Settings;

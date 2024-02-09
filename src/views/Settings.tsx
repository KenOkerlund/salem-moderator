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
		resetPlayers
	} = useSettings();

	console.log(players);
	return (
		<div className="flex-column">
			<PlayersList
				players={players}
				renamePlayer={changePlayerName}
				addPlayer={addPlayer}
				canAddPlayer={canAddPlayer}
				removePlayer={removePlayer}
				canRemovePlayer={canRemovePlayer}
				movePlayerDown={movePlayerDown}
				movePlayerUp={movePlayerUp}
			/>
			<ResetSettings onReset={resetPlayers} />
		</div>
	);
}

export default Settings;
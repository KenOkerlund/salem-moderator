import { useState } from 'react';
import Button from '../../elements/Button';
import arrowButton from '../../assets/svg-icons/arrow.svg';

function createPlayers() {
	return [
		{
			id: 0,
			name: 'Player 1',
		},
		{
			id: 1,
			name: 'Player 2',
		},
		{
			id: 2,
			name: 'Player 3',
		},
		{
			id: 3,
			name: 'Player 4',
		},
	];
}

function Settings() {

	const [players, setPlayers] = useState(createPlayers());

	const isThereLessThanTwelvePlayers = players.length < 12;
	const isThereMoreThanFourPlayers = players.length > 4;
	const isThisTheFirstPlayer = (i: number) => i === players[0].id ? true : false;
	const isThisTheLastPlayer = (i: number) => i === players[players.length - 1].id;

	function handlePlayerNameChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
		const copyPlayers = [...players];
		copyPlayers[i].name = e.target.value;
		setPlayers(copyPlayers);

	}

	function addPlayerNameClick() {
		const copyPlayers = [...players];
		const id = Math.max(...players.map(p => p.id)) + 1;
		//player.name needs to be 1 value higher than player.id because the index starts at 0 and the name starts at "Player 1"
		copyPlayers.push({ id, name: `Player ${id + 1} ` });
		setPlayers(copyPlayers);
	}

	function removePlayerNameClick(i: number) {
		const copyPlayers = [...players];
		copyPlayers.splice(i, 1);
		setPlayers(copyPlayers);
	}

	function movePlayerDownClick(i: number) {
		const copyPlayers = [...players];
		const elementMoving = copyPlayers.splice(i, 1);
		copyPlayers.splice(i + 1, 0, elementMoving[0]);
		setPlayers(copyPlayers);
	}

	function movePlayerUpClick(i: number) {
		const copyPlayers = [...players];
		const elementMoving = copyPlayers.splice(i, 1);
		copyPlayers.splice(i - 1, 0, elementMoving[0]);
		setPlayers(copyPlayers);
	}


	return (
		<div className='settings-players'>
			<h6>PLAYERS</h6>
			<div className='settings-players-names'>
				{
					players.map((playerName, i) => {
						return (
							<div key={playerName.id} className='settings-player-list'>
								<Button size='mini' disabled={!isThereMoreThanFourPlayers} onClick={() => removePlayerNameClick(i)}>
									<div className='icon--minus'></div>
								</Button>
								<input type="text" placeholder={playerName.name} onChange={(e) => handlePlayerNameChange(e, playerName.id)} />
								<div className='settings-players-order-buttons'>
									<div className='settings-players-order'>
										{!isThisTheLastPlayer(playerName.id) && <Button size='mini' onClick={() => movePlayerDownClick(i)}>{<img src={arrowButton} className='down-arrow' />}</Button>}
										{!isThisTheFirstPlayer(playerName.id) && <Button size='mini' onClick={() => movePlayerUpClick(i)}>{<img src={arrowButton} className='up-arrow' />}</Button>}
									</div>
								</div>
							</div>
						);
					})
				}
				{isThereLessThanTwelvePlayers && <div className='settings-player-add'>
					<Button size="mini" disabled={!isThereLessThanTwelvePlayers} onClick={() => addPlayerNameClick()}>
						<div className='icon--plus'></div>
					</Button>
				</div>}
			</div>
		</div>
	);
}

export default Settings;
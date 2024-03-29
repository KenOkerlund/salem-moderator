import Button from '../../elements/Button';
import arrowButton from '../../assets/svg-icons/arrow.svg';
import useSettings from '../use-settings';

function Settings(props: Omit<ReturnType<typeof useSettings>, 'resetPlayers'>) {
	const {
		players,
		changePlayerName,
		addPlayer,
		canAddPlayer,
		removePlayer,
		canRemovePlayer,
		movePlayerDown,
		movePlayerUp,
	} = props;

	const isThisTheFirstPlayer = (i: number) => i === players[0].id;
	const isThisTheLastPlayer = (i: number) => i === players[players.length - 1].id;

	return (
		<div className='settings-players'>
			<h6>PLAYERS</h6>
			<div className='settings-players-names'>
				{
					players.map((player) => {
						return (
							<div key={player.id} className='settings-player-list'>
								<Button
									size='mini'
									disabled={!canRemovePlayer}
									onClick={() => removePlayer(player.id)}
								>
									<div className='icon--minus'></div>
								</Button>
								<input type="text" placeholder={`Player ${player.id + 1}`} onChange={(e) => changePlayerName(e, player.id)} value={player.name} />
								<div className='settings-players-order-buttons'>
									<div className='settings-players-order'>
										{!isThisTheLastPlayer(player.id) && <Button size='mini' onClick={() => movePlayerDown(player.id)}>{<img src={arrowButton} className='down-arrow' />}</Button>}
										{!isThisTheFirstPlayer(player.id) && <Button size='mini' onClick={() => movePlayerUp(player.id)}>{<img src={arrowButton} className='up-arrow' />}</Button>}
									</div>
								</div>
							</div>
						);
					})
				}
				{canAddPlayer && <div className='settings-player-add'>
					<Button size="mini" onClick={addPlayer}>
						<div className='icon--plus'></div>
					</Button>
				</div>}
			</div>
		</div>
	);
}

export default Settings;

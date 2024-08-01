import Button from '../../components/button/button';
import arrowButton from '../../assets/svg-icons/arrow.svg';
import useSettings from './use-settings';
import styles from './player-settings.module.css';
import { TextInput } from '../../components/input/input';
import { IconMinus } from '../../assets/html-css-icons/icon-minus';
import { IconPlus } from '../../assets/html-css-icons/icon-plus';
import { formatPlayerName } from '../../utils/format-player-name';

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
		<div className={styles.players}>
			<h2>PLAYERS</h2>
			<div className={styles.playerNames}>
				{
					players.map((player) => {
						return (
							<div key={player.id} className={styles.playerName}>
								<Button
									iconOnly
									size='small'
									disabled={!canRemovePlayer}
									onClick={() => removePlayer(player.id)}
								>
									<IconMinus />
								</Button>
								<TextInput
									placeholder={formatPlayerName(player)}
									onChange={(e) => changePlayerName(e, player.id)} value={player.name}
								/>
								<Button
									iconOnly
									size="small"
									onClick={() => movePlayerDown(player.id)}
									disabled={isThisTheLastPlayer(player.id)}
								>
									<img src={arrowButton} />
								</Button>

								<Button
									iconOnly
									rotateContent
									size="small"
									onClick={() => movePlayerUp(player.id)}
									disabled={isThisTheFirstPlayer(player.id)}
								>
									<img src={arrowButton} />
								</Button>
							</div>
						);
					})
				}
				{canAddPlayer && <div>
					<Button size="small" onClick={addPlayer}>
						<IconPlus /> Add Player
					</Button>
				</div>}
			</div>
		</div>
	);
}

export default Settings;

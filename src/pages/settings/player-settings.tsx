import {
	useCanAddPlayer,
	useCanRemovePlayer,
	useSalemStore,
} from '../../stores/salem-store';
import Button from '../../components/button/button';
import arrowButton from '../../assets/svg-icons/arrow.svg';
import styles from './player-settings.module.css';
import { TextInput } from '../../components/input/input';
import { IconMinus } from '../../assets/html-css-icons/icon-minus';
import { IconPlus } from '../../assets/html-css-icons/icon-plus';
import { formatPlayerName } from '../../utils/format-player-name';

function PlayersList() {
	const players = useSalemStore((state) => state.players);
	const setPlayerName = useSalemStore((state) => state.setPlayerName);
	const addPlayer = useSalemStore((state) => state.addPlayer);
	const removePlayer = useSalemStore((state) => state.removePlayer);
	const movePlayerDown = useSalemStore((state) => state.movePlayerDown);
	const movePlayerUp = useSalemStore((state) => state.movePlayerUp);
	// const resetPlayers = useSalemStore((state) => state.resetPlayers);

	const isAddPlayerButtonEnabled = useCanAddPlayer();
	const isRemovePlayerButtonEnabled = useCanRemovePlayer();
	const isThisTheFirstPlayer = (i: number) => i === players[0].id;
	const isThisTheLastPlayer = (i: number) =>
		i === players[players.length - 1].id;

	return (
		<div className={styles.players}>
			<h2>PLAYERS</h2>
			<div className={styles.playerNames}>
				{players.map((player) => {
					return (
						<div key={player.id} className={styles.playerName}>
							<Button
								iconOnly
								size="small"
								disabled={!isRemovePlayerButtonEnabled}
								onClick={() => removePlayer(player.id)}
							>
								<IconMinus />
							</Button>
							<TextInput
								placeholder={formatPlayerName(player)}
								onChange={(e) => setPlayerName(player.id, e.target.value)}
								value={player.name}
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
				})}
				{isAddPlayerButtonEnabled && (
					<div>
						<Button size="small" onClick={addPlayer}>
							<IconPlus /> Add Player
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default PlayersList;

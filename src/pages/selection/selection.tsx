import { useContext } from 'react';
import { useSelection } from './use-selection';
import Button from '../../components/button/button';
import arrowButton from '../../assets/svg-icons/arrow.svg';
import SettingsButton from '../shared-components/settings-button/settings-button';
import styles from './selection.module.css';
import { PlayersContext } from '../../contexts/players-context';
import { Footer } from '../shared-components/footer/footer';
import { formatPlayerName } from '../../utils/format-player-name';


export default function Selection() {
	const { players } = useContext(PlayersContext);
	const {
		phase, 
		setPhase, 
		isConstableChecked,
		handleChangeConstableChecked,
		instructionalText,
		audience,
		setPlayer,
		stage,
		playerToReveal,
		allowReveal,
		next,
		reset,
	} = useSelection();
	

	return (
		<>
			{!phase && <div className={styles.phasePage}>
				<SettingsButton />
				<h1>{phase}</h1>
				<div className={styles.phaseType + ' ' + styles.dawnPhase}>
					<h1 className={styles.header}>Dawn</h1>
					<p>The witches select a player to receive the black cat.</p>
					<div>
						<Button 
							size='small' 
							onClick={() => setPhase('dawn')} 
						>
							Begin
							<img src={arrowButton} className={styles.arrowIcon} />
						</Button>
					</div>
				</div>

				<div className={styles.line} />

				<div className={styles.phaseType + ' ' + styles.nightPhase}>
					<h1 className={styles.header}>Night</h1>
					<p>The witches select a player they wish to kill.</p>
					<p>The constable selects a player to attempt to save.</p>
					<div>
						<Button 
							size='small' 
							onClick={() => setPhase('night')}
						>
							Begin
							<img src={arrowButton} className={styles.arrowIcon} />
						</Button>
					</div>
					<div className={styles.constable}>
						<input type="checkbox" id='constable' value="constable" name='constable' checked={isConstableChecked} onChange={handleChangeConstableChecked} />
						<label htmlFor="constable">Constable</label>
					</div>
				</div>
			</div>} 
			{phase && (
				<>
					<div className={`${phase === 'dawn' ? styles.dawnBackground : styles.nightBackground} ${styles.selectionPage}`}>
						<h2 className={styles.phaseTitle}>{phase === 'dawn' ? 'Dawn' : 'Night'}</h2>
						<div className={styles.audienceAndInstructions}>
							<h4 className={styles.audience}>{audience}</h4>
							<p className={styles.instructions}>{instructionalText}</p>
						</div>
						{stage === 'player-selection' && (
							<div className={styles.phaseBody}>
								{players.map((player) => {
									return (
										<Button 
											key={player.id} 
											onClick={() => setPlayer(player)}
											size='largest'
											holdDuration={1.5}
										>
											{formatPlayerName(player)}
										</Button>
									);
								})}
							</div> 
						)}
						{stage === 'reveal' && (
							<div>
								<Button 
									onClick={allowReveal}
									size='largest'
									disabled={!!playerToReveal}
									holdDuration={1.5}
								>{playerToReveal ? formatPlayerName(playerToReveal) : 'Reveal'}
								</Button>
							</div>
						)}
					</div>
					<Footer 
						primaryButtonText='Abort'
						onPrimaryClick={reset}
						secondaryButtonText={next ? 'Next' : undefined}
						onSecondaryClick={next ? next : undefined}
					/>
				</>
			)}
		</>
	);
}

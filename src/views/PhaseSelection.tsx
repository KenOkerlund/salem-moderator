import { useState, useContext } from 'react';
import { useSelection } from './use-selection';
import Button from '../elements/Button';
import arrowButton from '../assets/svg-icons/arrow.svg';
// import SettingsButton from '../elements/SettingsButton';
import styles from './phase-selection.module.css';
import { PlayersContext } from '../players-context';
import { Footer } from './Components/footer/footer';
import { formatPlayerName } from '../utils/format-player-name';
// import { Phase } from './Components/Phase';


function PhaseSelection() {
	const { players } = useContext(PlayersContext);
	const {
		phase, 
		setPhase, 
		stage, 
		instructionalText, 
		witchesSelection, 
		setWitchSelection, 
		audience,
		constableSelection,
		setTheConstableSelection,
		isConstableChecked,
		handleChangeConstableChecked,
		// constableSelectionRevealed,
		// handleConstableSelectionRevealClick,
	} = useSelection();
	// const [isConstableChecked, setIsConstableChecked] = useState(true);
	const [shouldRevealWitchSelection, setShouldRevealWitchSelection] = useState(false);
	const [shouldRevealConstableSelection, setShouldRevealConstableSelection] = useState(false);

	return (
		<>
			{!phase && <div className={styles.phasePage}>
				{/* <SettingsButton /> */}
				<h1>{phase}</h1>
				<div className={styles.phaseType + ' ' + styles.dawnPhase}>
					<h1 className={styles.header}>Dawn</h1>
					<p>The witches select a player to receive the black cat.</p>
					<div>
						<Button size='small' onClick={() => setPhase('dawn')} >
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
						<Button size='small' onClick={() => setPhase('night')}>
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
					<div className={styles.selectionPage}>
						<h1>Phase: {phase === 'dawn' ? 'Dawn' : 'Night'}</h1>
						<h4>Audience: {audience}</h4>
						<div>{instructionalText}</div>
						{stage === 'player-selection' && (
							<div>
								{players.map((player) => {
									return (
										<button 
											key={player.id} 
											onClick={() => !witchesSelection ? setWitchSelection(player) : setTheConstableSelection(player)}
										>
											{formatPlayerName(player)}
										</button>
									);
								})}
							</div> 
						)}
						{stage === 'reveal' && witchesSelection && !constableSelection && (
							<div>
								<button onClick={() => setShouldRevealWitchSelection(true)}>{!shouldRevealWitchSelection ? 'Reveal' : formatPlayerName(witchesSelection)}</button>
							</div>
						)}

						{phase === 'night' && stage === 'reveal' && witchesSelection && isConstableChecked && constableSelection && (
							<div>
								<button onClick={() => setShouldRevealConstableSelection(true)}>{!shouldRevealConstableSelection ? 'Reveal' : formatPlayerName(constableSelection)}</button>
							</div>
						)}
					</div>
					<Footer 
						primaryButtonText='Abort'
						onPrimaryClick={() => console.log('abort button')}
						secondaryButtonText='Next'
						onSecondaryClick={() => console.log('next button')}
					/>
				</>
			)}
		</>
	);
}

export default PhaseSelection;

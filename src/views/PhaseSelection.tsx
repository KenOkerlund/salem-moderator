import { useState } from 'react';
import Button from '../elements/Button';
import arrowButton from '../assets/svg-icons/arrow.svg';
import SettingsButton from '../elements/SettingsButton';
import styles from './phase-selection.module.css';
import { Phase } from './Components/Phase';

function PhaseSelection(){
	const [phase, setPhase] = useState({
		phaseSelection: true,
		dawn: {
			blackCatInstructions: false,
			blackCatAssignment: false,
			blackCatReveal: false,
		},
		night: {
			nightInstructions: false,
			deathAssignment: false,
			constableSave: false,
			constableReveal: false,
			confession: false,
			deathReveal: false,
		},
	});

	return (
		<>
			{phase.phaseSelection && <div className={styles.phasePage}>
				<SettingsButton />

				<div className={styles.phaseType + ' ' + styles.dawnPhase}>
					<h1 className={styles.header}>Dawn</h1>
					<p>The witches select a player to receive the black cat.</p>
					<div>
						<Button size='small'>
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
						<Button size='small'>
						Begin 
							<img src={arrowButton} className={styles.arrowIcon} /> 
						</Button>
					</div>
					<div className={styles.constable}>
						<input type="checkbox" id='constable' value="constable" name='constable' />
						<label htmlFor="constable">Constable</label>
					</div>
				</div>
			</div> }

			{phase.dawn.blackCatInstructions && <Phase phaseType='Dawn'>Instructions with sound</Phase>}
			{phase.dawn.blackCatAssignment && <Phase phaseType='Dawn'>Text instructions and cards to confirm selection</Phase>}
			{phase.dawn.blackCatReveal && <Phase phaseType='Dawn'>Text prompt and card to reveal</Phase>}

			{phase.night.nightInstructions && <Phase phaseType='Night'>Instructions with sound</Phase>}
			{phase.night.deathAssignment && <Phase phaseType='Night'>Text instructions and cards to select player</Phase>}
			{phase.night.constableSave && <Phase phaseType='Night'>Text instructions and cards for constable to attempt save</Phase>}
			{phase.night.constableReveal && <Phase phaseType='Night'>Text guide and card for revealing who the constable tried to save</Phase>}
			{phase.night.confession && <Phase phaseType='Night'>Text guide for people to decide to confess</Phase>}
			{phase.night.deathReveal && <Phase phaseType='Night'>Text guide with card to reveal the potentially dead player</Phase>}
		</>
	);
}

export default PhaseSelection;

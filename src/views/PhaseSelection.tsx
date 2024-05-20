import { useState } from 'react';
import { set } from 'lodash';
import Button from '../elements/Button';
import arrowButton from '../assets/svg-icons/arrow.svg';
import SettingsButton from '../elements/SettingsButton';
import styles from './phase-selection.module.css';
import { Phase } from './Components/Phase';

function PhaseSelection() {
	function createState() {
		return {
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
		}
	};
	const [phase, setPhase] = useState(createState());
	const [isConstableChecked, setIsConstableChecked] = useState(true);

	function updatePhase(stage: string) {
		let tempState = createState();
		tempState.phaseSelection = false;
		set(tempState, stage, true);
		setPhase(tempState);
	};

	return (
		<>
			{phase.phaseSelection && <div className={styles.phasePage}>
				<SettingsButton />

				<div className={styles.phaseType + ' ' + styles.dawnPhase}>
					<h1 className={styles.header}>Dawn</h1>
					<p>The witches select a player to receive the black cat.</p>
					<div>
						<Button size='small' onClick={() => updatePhase('dawn.blackCatInstructions')}>
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
						<Button size='small' onClick={() => updatePhase('night.nightInstructions')}>
							Begin
							<img src={arrowButton} className={styles.arrowIcon} />
						</Button>
					</div>
					<div className={styles.constable}>
						<input type="checkbox" id='constable' value="constable" name='constable' checked={isConstableChecked} onChange={() => setIsConstableChecked(!isConstableChecked)} />
						<label htmlFor="constable">Constable</label>
					</div>
				</div>
			</div>}

			{phase.dawn.blackCatInstructions && <Phase phaseType='Dawn' secondaryButton secondaryButtonClick={() => updatePhase('dawn.blackCatAssignment')}>Audio instructions</Phase>}
			{phase.dawn.blackCatAssignment && <Phase phaseType='Dawn' secondaryButton secondaryButtonClick={() => updatePhase('dawn.blackCatReveal')}>Text instructions and cards to confirm selection</Phase>}
			{phase.dawn.blackCatReveal && <Phase phaseType='Dawn' secondaryButton secondaryButtonClick={() => updatePhase('phaseSelection')}>Text prompt and card to reveal</Phase>}

			{phase.night.nightInstructions && <Phase phaseType='Night' secondaryButton secondaryButtonClick={() => updatePhase('night.deathAssignment')}>Instructions with sound</Phase>}
			{phase.night.deathAssignment && <Phase phaseType='Night' secondaryButton secondaryButtonClick={isConstableChecked ? () => updatePhase('night.constableSave') : () => updatePhase('night.confession')}>Text instructions and cards to select player</Phase>}
			{phase.night.constableSave && <Phase phaseType='Night' secondaryButton secondaryButtonClick={() => updatePhase('night.constableReveal')}>Text instructions and cards for constable to attempt save</Phase>}
			{phase.night.constableReveal && <Phase phaseType='Night' secondaryButton secondaryButtonClick={() => updatePhase('night.confession')}>Text guide and card for revealing who the constable tried to save</Phase>}
			{phase.night.confession && <Phase phaseType='Night' secondaryButton secondaryButtonClick={() => updatePhase('night.deathReveal')}>Text guide for people to decide to confess</Phase>}
			{phase.night.deathReveal && <Phase phaseType='Night' secondaryButton secondaryButtonClick={() => updatePhase('phaseSelection')}>Text guide with card to reveal the potentially dead player</Phase>}
		</>
	);
}

export default PhaseSelection;

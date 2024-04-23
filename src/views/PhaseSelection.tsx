import Button from '../elements/Button';
import arrowButton from '../assets/svg-icons/arrow.svg';
import SettingsButton from '../elements/SettingsButton';
import styles from './phase-selection.module.css';

function PhaseSelection(){
	return (
		<div className={styles.phasePage}>
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
		</div>
	);
}

export default PhaseSelection;

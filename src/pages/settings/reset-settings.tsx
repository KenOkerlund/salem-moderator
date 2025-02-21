import { useSalemStore } from '../../stores/salem-store';
import Button from '../../components/button/button';
import styles from './reset-settings.module.css';

function ResetSettings() {
	const resetPlayers = useSalemStore((state) => state.resetPlayers);
	return (
		<div className={styles.resetSettings}>
			<h2>RESET SETTINGS</h2>
			<p>Clears and resets all setttings.</p>
			<div className={styles.button}>
				<Button size='small' onClick={resetPlayers}>
					Reset Settings
				</Button>
			</div>
		</div>
	);
}

export default ResetSettings;

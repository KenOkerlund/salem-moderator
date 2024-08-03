import classes from './settings-button.module.css';
import settingsIcon from '../../../assets/svg-icons/settings.svg';
function SettingsButton(){
	return (
		<img className={classes.icon} src={settingsIcon} alt="gear icon" />
	);
}

export default SettingsButton;

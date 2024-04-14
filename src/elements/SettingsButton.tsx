import './SettingsButton.css';
import settingsIcon from '../assets/svg-icons/settings.svg';
function SettingsButton(){
	return (
		<img className='settings-icon' src={settingsIcon} alt="gear icon" />
	);
}

export default SettingsButton;

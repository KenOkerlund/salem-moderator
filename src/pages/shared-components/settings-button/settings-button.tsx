import { useNavigate } from 'react-router-dom';

import Button from '../../../components/button/button';
import settingsIcon from '../../../assets/svg-icons/settings.svg';

import classes from './settings-button.module.css';

function SettingsButton() {
	const navigate = useNavigate();

	return (
		<div className={classes.icon}>
			<Button
				iconOnly
				onClick={() => navigate('/settings/')}
				variation="secondary"
			>
				<img src={settingsIcon} alt="gear icon" />
			</Button>
		</div>
	);
}

export default SettingsButton;

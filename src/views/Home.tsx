import { useNavigate } from 'react-router-dom';
import highlightedPerson from '../assets/images/highlighted-person.png';
import ModeratorLogo from '../assets/images/moderator-logo.svg';
import Button from '../elements/Button';

function Home() {
	const navigate = useNavigate();

	function handleBeginClick() {
		navigate('/settings/');
	}

	return (
		<div className='home'>
			<img src={ModeratorLogo} alt="Salem Moderator logo" className='logo' />
			<img src={highlightedPerson} alt="Lady" className='salem-lady' />
			<Button size="large" onClick={handleBeginClick}>BEGIN</Button>
			<Button variation="secondary" size="small">SYNC DEVICE</Button>
		</div>
	);
}

export default Home;

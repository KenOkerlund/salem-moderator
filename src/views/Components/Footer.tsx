import { useNavigate } from 'react-router-dom';
import Button from '../../elements/Button';

function Footer() {
	const navigate = useNavigate();

	function handlePlayClick(){
		console.log('Clicked Play!');
	}
	function handleQuitClick(){
		navigate('/');
	}
	
	return <div className="footer">
		<Button size='large' onClick={handlePlayClick}>PLAY</Button>
		<Button variation='secondary' size='small' onClick={handleQuitClick}>QUIT</Button>
	</div>;
}

export default Footer;

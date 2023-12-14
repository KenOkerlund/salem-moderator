import './App.css'
import highlightedPerson from "./assets/images/highlighted-person.png";
import ModeratorLogo from './assets/images/moderator-logo.svg';

function App() {
	return (
		<main>
			<div className='home'>
				<img src={ModeratorLogo} alt="Salem Moderator logo" className='logo' />
				<img src={highlightedPerson} alt="Lady" className='salem-lady' />
				<h3>BEGIN</h3>
				<h4>SYNC DEVICE</h4>
			</div>
		</main>
	)
}

export default App

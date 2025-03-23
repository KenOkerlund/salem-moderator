import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/button';
import PageBackgroundImage from '../../components/page-background-image/page-background-image';

import highlightedPerson from '../../assets/images/highlighted-person.png';
import ModeratorLogo from '../../assets/images/moderator-logo.svg';
import catEyes from '../../assets/images/cat-eyesl.png';

import styles from './Home.module.css';
import { useSalemStore } from '../../stores/salem-store';

function Home() {
	const navigate = useNavigate();

	const resetSelectionProcess = useSalemStore(
		(state) => state.resetSelectionProcess,
	);

	const resetAndNavigate = () => {
		resetSelectionProcess();
		navigate('/settings/');
	};

	return (
		<div className={styles.home}>
			<PageBackgroundImage image={catEyes} shrink />
			<div className={styles.container}>
				<img
					src={ModeratorLogo}
					alt="Salem Moderator logo"
					className={styles.logo}
				/>

				<img src={highlightedPerson} alt="Lady" className={styles.person} />

				<Button width={100} size="large" onClick={() => resetAndNavigate()}>
					BEGIN
				</Button>
				{/* <Button variation='secondary'>SYNC DEVICE</Button> */}
			</div>
		</div>
	);
}

export default Home;

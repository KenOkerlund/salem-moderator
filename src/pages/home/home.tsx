import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/button';

import highlightedPerson from '../../assets/images/highlighted-person.png';
import ModeratorLogo from '../../assets/images/moderator-logo.svg';

import styles from './Home.module.css';

function Home() {
	const navigate = useNavigate();

	return (
		<div className={styles.home}>
			<div className={styles.container}>
				<img
					src={ModeratorLogo}
					alt="Salem Moderator logo"
					className={styles.logo}
				/>

				<img
					src={highlightedPerson}
					alt="Lady"
					className={styles.person}
				/>
				
				<Button width={100} size="large" onClick={() => navigate('/settings/')}>
					BEGIN
				</Button>
				{/* <Button variation='secondary'>SYNC DEVICE</Button> */}
			</div>
		</div>
	);
}

export default Home;

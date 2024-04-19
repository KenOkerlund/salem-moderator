import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import PhaseSelection from './views/PhaseSelection';
import styles from './app.module.css';

function App() {
	return (
		<main className={styles.main}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/settings" element={<Settings />} />
					<Route path='/select-phase' element={<PhaseSelection />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;

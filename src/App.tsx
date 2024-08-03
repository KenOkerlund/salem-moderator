import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import { PhaseSelection } from './views/phase-selection';
import styles from './app.module.css';
import { PlayersContext, createPlayers } from './players-context';
import { useState } from 'react';


function App() {
	
	const [players, setPlayers] = useState(createPlayers());

	return (
		<main className={styles.main}>
			<PlayersContext.Provider
				value={{
					players,
					setPlayers,
					resetPlayers: () => setPlayers(createPlayers()),
				}}
			>
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						<Route path="/settings" element={<Settings />} />
						<Route path='/selection' element={<PhaseSelection />} />
					</Routes>
				</BrowserRouter>
			</PlayersContext.Provider>
		</main>
	);
}

export default App;

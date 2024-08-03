import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Selection from './pages/selection';
import styles from './app.module.css';
import { PlayersContext, createPlayers } from './contexts/players-context';
import { useState } from 'react';


export default function App() {
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
						<Route path='/selection' element={<Selection />} />
					</Routes>
				</BrowserRouter>
			</PlayersContext.Provider>
		</main>
	);
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Selection from './pages/selection';
import styles from './app.module.css';
import {
	PlayersContext,
	createPlayers,
	getOrCreatePlayers,
	salemPlayerLocalStorageKey,
} from './contexts/players-context';
import { useState } from 'react';
import { Player } from './types';


export default function App() {
	const [players, setPlayers] = useState(getOrCreatePlayers());

	// TODO KEN or KEVIN Testing needs to happen for this when it gets moved
	const storageSetPlayers = (players: Player[]) => {
		setPlayers(players);
		window.localStorage.setItem(salemPlayerLocalStorageKey, JSON.stringify(players));
	};

	const storageResetPlayers = () => {
		setPlayers(createPlayers());
		window.localStorage.removeItem(salemPlayerLocalStorageKey);
	};

	return (
		<main className={styles.main}>
			<PlayersContext.Provider
				value={{
					players,
					setPlayers: storageSetPlayers,
					resetPlayers: storageResetPlayers,
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

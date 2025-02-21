import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Settings from './pages/settings';
import Selection from './pages/selection';
import styles from './app.module.css';


export default function App() {
	return (
		<main className={styles.main}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/settings" element={<Settings />} />
					<Route path='/selection' element={<Selection />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

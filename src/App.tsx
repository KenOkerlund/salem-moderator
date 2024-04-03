import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import PhaseSelection from './views/PhaseSelection';

function App() {
	return (
		<main>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/settings" element={<Settings />} />
					<Route path='/phase-selection' element={<PhaseSelection />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;

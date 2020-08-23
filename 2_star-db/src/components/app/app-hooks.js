import React, { useState } from 'react';

import Header from '../header';
import PeoplePage from '../people-page';
import RandomPlanet from '../random-planet';

import './app.css';

const App = () => {
	const [showRandomPlanet, setShowRandomPlanet] = useState(true);

	const toggleRandomPlanet = () => {
		setShowRandomPlanet((prevState) => !prevState);
	};

	const planet = showRandomPlanet ? <RandomPlanet /> : null;

	return (
		<div>
			<Header />
			{planet}

			<button
				className="toggle-planet btn btn-warning btn-lg"
				onClick={toggleRandomPlanet}
			>
				Toggle Random Planet
			</button>
      <PeoplePage />
		</div>
	);
};

export default App;

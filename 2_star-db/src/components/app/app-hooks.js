import React, { useState } from 'react';

import Header from '../header';
import PeoplePage from '../people-page';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

const App = () => {
	const [showRandomPlanet, setShowRandomPlanet] = useState(true);
	const [swapiService, setSwapiService] = useState(new DummySwapiService());

	const onServiceChange = () => {
		setSwapiService((prevState) => {
			const Service =
				prevState instanceof SwapiService ? DummySwapiService : SwapiService;

			return new Service();
		});
	};

	const toggleRandomPlanet = () => {
		setShowRandomPlanet((prevState) => !prevState);
	};

	const planet = showRandomPlanet ? <RandomPlanet /> : null;

	return (
		<div>
			<SwapiServiceProvider value={swapiService}>
				<Header onServiceChange={onServiceChange} />
				{planet}

				<button
					className="toggle-planet btn btn-warning btn-lg"
					onClick={toggleRandomPlanet}
				>
					Toggle Random Planet
				</button>
				<PeoplePage />
			</SwapiServiceProvider>
		</div>
	);
};

export default App;

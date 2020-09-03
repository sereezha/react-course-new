import React, { useState } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

const App = () => {
	const [swapiService, setSwapiService] = useState(new DummySwapiService());

	const onServiceChange = () => {
		setSwapiService((prevState) => {
			const Service =
				prevState instanceof SwapiService ? DummySwapiService : SwapiService;

			return new Service();
		});
	};

	return (
		<div>
			<SwapiServiceProvider value={swapiService}>
				<div className="stardb-app">
					<Header onServiceChange={onServiceChange} />
					<RandomPlanet />
					<PeoplePage />
					<PlanetsPage />
					<StarshipsPage />
				</div>
			</SwapiServiceProvider>
		</div>
	);
};

export default App;

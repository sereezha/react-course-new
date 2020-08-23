import React, { useState } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

const App = () => {
	const [showRandomPlanet, setShowRandomPlanet] = useState(true);
	const [selectedPerson, setSelectedPerson] = useState(null);

	const onPersonSelected = (id) => {
		setSelectedPerson(id);
	};

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

			<div className="row mb2">
				<div className="col-md-6">
					<ItemList onItemSelected={onPersonSelected} />
				</div>
				<div className="col-md-6">
					<PersonDetails personId={selectedPerson} />
				</div>
			</div>
		</div>
	);
};

export default App;

import React, { useState } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

const App = () => {
	const [selectedPerson, setSelectedPerson] = useState(null);

	const onPersonSelected = (id) => {
		setSelectedPerson(id);
	};
	return (
		<div>
			<Header />
			<RandomPlanet />
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

import React, { useState } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page.css';

const PeoplePage = () => {
	const [selectedPerson, setSelectedPerson] = useState(null);
	const swapiService = new SwapiService();

	const onPersonSelected = (id) => {
		setSelectedPerson(id);
	};

	return (
		<div className="row mb2">
			<div className="col-md-6">
				<ItemList
          onItemSelected={onPersonSelected}
          getData={swapiService.getAllPeople}
				/>
			</div>
			<div className="col-md-6">
				<PersonDetails personId={selectedPerson} />
			</div>
		</div>
	);
};

export default PeoplePage;

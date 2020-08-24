import React, { useState } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import Row from '../row';

import './people-page.css';

const PeoplePage = () => {
	const [selectedPerson, setSelectedPerson] = useState(null);
	const swapiService = new SwapiService();

	const onPersonSelected = (id) => {
		setSelectedPerson(id);
	};

	const itemList = (
		<ItemList
			onItemSelected={onPersonSelected}
			getData={swapiService.getAllPeople}
		>
			{(i) => `${i.name} (${i.birthYear})`}
		</ItemList>
	);

	const personDetails = <PersonDetails personId={selectedPerson} />;

	return <Row eft={itemList} right={personDetails} />;
};

export default PeoplePage;

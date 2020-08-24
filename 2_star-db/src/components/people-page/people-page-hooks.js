import React, { useState } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
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

	const personDetails = <ItemDetails itemId={selectedPerson} />;

	return <Row eft={itemList} right={personDetails} />;
};

export default PeoplePage;

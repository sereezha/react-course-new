import React, { useState } from 'react';
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage = () => {
	const [selectedItem, setSelectedItem] = useState(null);

	const onItemSelected = (selectedItem) => {
		setSelectedItem(selectedItem);
	};

	return (
		<Row
			left={<PersonList onItemSelected={onItemSelected} />}
			right={<PersonDetails itemId={selectedItem} />}
		/>
	);
};

export default PeoplePage;

import React, { useState } from 'react';
import { StarshipDetails, StarshipList } from '../sw-components';
import Row from '../row';

const StarshipsPage = () => {
	const [selectedItem, setSelectedItem] = useState(null);

	const onItemSelected = (selectedItem) => {
		setSelectedItem(selectedItem);
	};

	return (
		<Row
			left={<StarshipList onItemSelected={onItemSelected} />}
			right={<StarshipDetails itemId={selectedItem} />}
		/>
	);
};

export default StarshipsPage;

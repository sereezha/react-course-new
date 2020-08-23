import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';

import './item-list.css';

const ItemList = (props) => {
	const [itemsList, setItemsList] = useState(null);

	useEffect(() => {
		props.getData.then((itemsList) => {
			setItemsList(itemsList);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!itemsList) {
		return <Spinner />;
	}

	return (
		<ul className="item-list list-group">
			<Items itemsList={itemsList} onItemSelected={props.onItemSelected} />
		</ul>
	);
};

const Items = (props) => {
  const { itemsList, onItemSelected } = props;
	return (
		<>
			{itemsList.map((item) => {
				const { id, name } = item;
				return (
					<li
						key={id}
						className="list-group-item"
						onClick={() => onItemSelected(id)}
					>
						{name}
					</li>
				);
			})}
		</>
	);
};

export default ItemList;

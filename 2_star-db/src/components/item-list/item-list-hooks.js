import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';

import './item-list.css';

const ItemList = (props) => {
	const { onItemSelected, getData, children } = props;
	const [itemsList, setItemsList] = useState(null);

	useEffect(() => {
		getData().then((itemsList) => {
			setItemsList(itemsList);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!itemsList) {
		return <Spinner />;
	}

	return (
		<ul className="item-list list-group">
			<Items
				itemsList={itemsList}
				onItemSelected={onItemSelected}
				renderItem={children}
			/>
		</ul>
	);
};

const Items = (props) => {
	const { itemsList, onItemSelected, renderItem } = props;
	return (
		<>
			{itemsList.map((item) => {
				const { id } = item;
				const value = renderItem(item);
				return (
					<li
						key={id}
						className="list-group-item"
						onClick={() => onItemSelected(id)}
					>
						{value}
					</li>
				);
			})}
		</>
	);
};

export default ItemList;

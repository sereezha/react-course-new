import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './item-list.css';

const ItemList = (props) => {
	const [peopleList, setPeopleList] = useState(null);
	const swapiService = new SwapiService();

	useEffect(() => {
		swapiService.getAllPeople().then((peopleList) => {
			setPeopleList(peopleList);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!peopleList) {
		return <Spinner />;
	}

	return (
		<ul className="item-list list-group">
			<Items peopleList={peopleList} onItemSelected={props.onItemSelected} />
		</ul>
	);
};

const Items = (props) => {
	const { peopleList } = props;
	return (
		<>
			{peopleList.map((person) => {
				const { id, name } = person;
				return (
					<li
						key={id}
						className="list-group-item"
						onClick={() => props.onItemSelected(id)}
					>
						{name}
					</li>
				);
			})}
		</>
	);
};

export default ItemList;

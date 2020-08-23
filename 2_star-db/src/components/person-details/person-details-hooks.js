import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './person-details.css';

const PersonDetails = (props) => {
	const [person, setPerson] = useState(null);
	const [loading, setLoading] = useState(false);
	const { personId } = props;
	const swapiService = new SwapiService();

	const updatePerson = () => {
		setLoading(true);
		if (!personId) return;
		swapiService.getPerson(personId).then((person) => {
			setPerson(person);
			setLoading(false);
		});
	};

	useEffect(() => {
		updatePerson();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [personId]);

	if (!person) {
		return <span>Select a person from a list</span>;
	}

	return (
		<div className="person-details card">
			{loading ? <Spinner /> : <PersonView person={person} />}
		</div>
	);
};

const PersonView = (props) => {
	const { person } = props;
	return (
		<>
			<img
				className="person-image"
				src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
				alt="some person"
			/>

			<div className="card-body">
				<h4>{person.name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Gender</span>
						<span>{person.gender}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Birth Year</span>
						<span>{person.birthYear}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Eye Color</span>
						<span>{person.eyeColor}</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default PersonDetails;

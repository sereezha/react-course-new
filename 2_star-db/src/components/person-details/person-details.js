import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';

import './person-details.css';

export default class PersonDetails extends Component {
	swapiService = new SwapiService();

	state = {
		person: null,
		loading: false,
	};

	componentDidMount() {
		this.updatePerson();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.personId === this.props.personId) return;
		this.updatePerson();
	}

	updatePerson() {
		this.setState({ loading: true });
		const { personId } = this.props;
		if (!personId) return;
		this.swapiService.getPerson(personId).then((person) => {
			this.setState({ person, loading: false });
		});
	}

	render() {
		const { person, loading } = this.state;
		if (!person) {
			return <span>Select a person from a list</span>;
		}
		return (
			<div className="person-details card">
				{loading ? <Spinner /> : <PersonView person={person} />}
			</div>
		);
	}
}

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
        <ErrorButton />
			</div>
		</>
	);
};

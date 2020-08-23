import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

const RandomPlanet = () => {
	const [planet, setPlanet] = useState({});
	const [loading, setLoading] = useState(true);

	const swapiService = new SwapiService();

	const onPlanetLoaded = (planet) => {
		setPlanet(planet);
		setLoading(false);
	};

	const updatePlanet = () => {
		swapiService.getPlanet(7).then(onPlanetLoaded);
	};

	useEffect(() => {
		updatePlanet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="random-planet jumbotron rounded">
			{loading ? <Spinner /> : <PlanetView planet={planet} />}
		</div>
	);
};

const PlanetView = (props) => {
	const { planet } = props;
	const { id, name, population, rotationPeriod, diameter } = planet;
	return (
		<>
			{!!id && (
				<img
					className="planet-image"
					src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
					alt=""
				/>
			)}

			<div>
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<span className="term">Population</span>
						<span>{population}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className="list-group-item">
						<span className="term">Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</>
	);
};

export default RandomPlanet;

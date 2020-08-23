import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

const RandomPlanet = () => {
	const [planet, setPlanet] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const swapiService = new SwapiService();

	const onPlanetLoaded = (planet) => {
		setPlanet(planet);
		setLoading(false);
	};

	const onError = (err) => {
		setError(true);
		setLoading(false);
	};

	const updatePlanet = () => {
		const id = Math.floor(Math.random() * 17) + 2;
		swapiService.getPlanet(id).then(onPlanetLoaded).catch(onError);
	};

	useEffect(() => {
		updatePlanet();
		const interval = setInterval(updatePlanet, 10000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const hasData = !(loading || error);

	const errorMessage = error && <ErrorIndicator />;
	const spinner = loading && <Spinner />;
	const content = hasData && <PlanetView planet={planet} />;

	return (
		<div className="random-planet jumbotron rounded">
			{errorMessage}
			{spinner}
			{content}
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

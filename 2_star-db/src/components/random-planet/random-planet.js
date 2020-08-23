import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

const RandomPlanet = () => {
	const [planet, setPlanet] = useState({});
	const [loading, setLoading] = useState(false);

	const swapiService = new SwapiService();

	const onPlanetLoaded = (planet) => {
		setPlanet(planet);
	};

	const updatePlanet = () => {
		swapiService.getPlanet(7).then(onPlanetLoaded);
	};

	useEffect(() => {
		updatePlanet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { id, name, population, rotationPeriod, diameter } = planet;

	return (
		<div className="random-planet jumbotron rounded">
			{loading ? (
				<Spinner />
			) : (
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
			)}
		</div>
	);
};

export default RandomPlanet;

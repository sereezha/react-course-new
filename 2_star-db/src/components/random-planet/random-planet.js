import React, { useState, useEffect } from 'react';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

const RandomPlanet = () => {
	const [planet, setPlanet] = useState({
		id: null,
		name: null,
		population: null,
		rotationPeriod: null,
		diameter: null,
	});

	const swapiService = new SwapiService();

	const updatePlanet = () => {
		const someID = Math.floor(Math.random() * 25) + 2;
		swapiService.getPlanet(7).then((planet) => {
			setPlanet({
				id: someID,
				name: planet.name,
				population: planet.population,
				rotationPeriod: planet.rotation_period,
				diameter: planet.diameter,
			});
		});
	};

	useEffect(() => {
		updatePlanet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { id, name, population, rotationPeriod, diameter } = planet;
	return (
		<div className="random-planet jumbotron rounded">
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
		</div>
	);
};

export default RandomPlanet;

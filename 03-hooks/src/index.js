import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const HookSwitcher = () => {
	const [value, setValue] = useState(1);
	const [visible, setVisible] = useState(true);

	if (visible) {
		return (
			<div>
				<button onClick={() => setValue((v) => v + 1)}>+</button>
				<button onClick={() => setVisible(false)}>hide</button>
				<PlanetInfo id={value} />
			</div>
		);
	} else {
		return <button onClick={() => setVisible(true)}>show</button>;
	}
};

const usePlanetInfo = (id) => {
	const [planetName, setPlanetName] = useState(null);
	useEffect(() => {
		let cancelled = false;
		fetch(`https://swapi.dev/api/planets/${id}`)
			.then((res) => res.json())
			.then((data) => !cancelled && setPlanetName(data.name));
		return () => (cancelled = true);
	}, [id]);
	return [planetName];
};

const PlanetInfo = (props) => {
	const [planetName] = usePlanetInfo(props.id);

	return (
		<div>
			{props.id} - {planetName}
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<HookSwitcher />
	</React.StrictMode>,
	document.getElementById('root')
);

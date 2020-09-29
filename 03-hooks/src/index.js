import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const getPlanet = async (id) => {
	return fetch(`https://swapi.dev/api/planets/${id}`)
		.then((res) => res.json())
		.then((data) => data);
};

const useRequest = (request) => {
	const initialState = useMemo(() => {
		return {
			data: null,
			loading: true,
			error: null,
		};
	}, []);

	const [dataState, setDataState] = useState(initialState);
	useEffect(() => {
		setDataState(initialState);
		let cancelled = false;
		request()
			.then(
				(data) =>
					!cancelled &&
					setDataState({
						data,
						loading: false,
						error: null,
					})
			)
			.catch(
				(error) =>
					!cancelled &&
					setDataState({
						data: null,
						loading: false,
						error,
					})
			);

		return () => (cancelled = true);
	}, [request]);

	return dataState;
};

const usePlanetInfo = (id) => {
	const request = useCallback(() => getPlanet(id), [id]);
	return useRequest(request);
};

const PlanetInfo = (props) => {
	const { data, loading, error } = usePlanetInfo(props.id);

	if (error) {
		return <div>Something is wrong</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{props.id} - {data && data.name}
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<HookSwitcher />
	</React.StrictMode>,
	document.getElementById('root')
);

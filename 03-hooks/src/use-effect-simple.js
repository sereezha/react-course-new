import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const HookSwitcher = () => {
	const [value, setValue] = useState(0);
	const [visible, setVisible] = useState(true);

	if (visible) {
		return (
			<div>
				<button onClick={() => setValue((v) => v + 1)}>+</button>
				<button onClick={() => setVisible(false)}>hide</button>
				{/* <ClassCounter value={value} />
				<HookCounter value={value} /> */}
				<Notification />
			</div>
		);
	} else {
		return <button onClick={() => setVisible(true)}>show</button>;
	}
};

class ClassCounter extends React.Component {
	componentDidMount() {
		console.log('class: mount');
	}

	componentDidUpdate() {
		console.log('class: update');
	}

	componentWillUnmount() {
		console.log('class: unmount');
	}

	render() {
		return <div>{this.props.value}</div>;
	}
}

const HookCounter = (props) => {
	useEffect(() => {
		console.log('mount');
		return () => {
			console.log('clear');
		};
	}, []);

	useEffect(() => {
		console.log('update');
	}, [props.value]);

	return <div>{props.value}</div>;
};

const Notification = () => {
	const [notificationVisible, setNotificationVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setNotificationVisible(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		notificationVisible && (
			<div>
				<p>Hello</p>
			</div>
		)
	);
};

ReactDOM.render(
	<React.StrictMode>
		<HookSwitcher />
	</React.StrictMode>,
	document.getElementById('root')
);

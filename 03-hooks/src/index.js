import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const HookSwitcher = () => {
	const [color, setColor] = useState('gray');
	const [fontSize, setFontSize] = useState(14);

	return (
		<div
			style={{
				padding: '10px',
				backgroundColor: color,
				fontSize: `${fontSize}px`,
			}}
		>
			Hello World
			<button onClick={() => setColor('gray')}>Dark</button>
			<button onClick={() => setColor('white')}>Light</button>
			<button onClick={() => setFontSize((s) => s + 2)}>+</button>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<HookSwitcher />
	</React.StrictMode>,
	document.getElementById('root')
);

import React, { memo } from 'react';

import './app-header.scss';

const AppHeader = memo(({ toDo, done }) => {
	return (
		<div className="app-header d-flex">
			<h1>Todo List</h1>
			<h2>
				{toDo || 0} more to do, {done || 0} done
			</h2>
		</div>
	);
});

export default AppHeader;

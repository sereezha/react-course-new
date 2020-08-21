import React, { useState, memo } from 'react';

import './search-panel.scss';

const SearchPanel = memo((props) => {
	const [value, setValue] = useState('');
  const { onSearch } = props;

	const onChangeHandler = (e) => {
		const { value } = e.target;
		setValue(value);
		onSearch(value);
	};

	return (
		<input
			type="text"
			value={value}
			className="form-control search-input"
			placeholder="type to search"
			onChange={onChangeHandler}
		/>
	);
});

export default SearchPanel;

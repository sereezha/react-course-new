import React, { useState, memo } from 'react';

import './item-add-form.scss';

const ItemAddForm = memo(({ onItemAdded }) => {
	const [label, setLabel] = useState('');

	const onLabelChange = (e) => {
		setLabel(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (label.length === 0) {
			alert('Todo cannot be empty :)');
			return;
		}
		onItemAdded(label);
		setLabel('');
	};

	return (
		<form className="item-add-form d-flex" onSubmit={onSubmit}>
			<input
				type="text"
				value={label}
				className="form-control"
				placeholder="What needs to be done"
				onChange={onLabelChange}
			/>
			<button className="btn btn-outline-secondary">Add Item</button>
		</form>
	);
});

export default ItemAddForm;

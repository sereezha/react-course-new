import React, { Component } from 'react';

import './item-add-form.scss';

export default class ItemAddForm extends Component {
	state = {
		label: '',
	};

	onLabelChange = (e) => {
		this.setState({ label: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { label } = this.state;
		if (label.length === 0) {
			alert('Todo cannot be empty :)');
			return;
		}
		this.props.onItemAdded(label);
		this.setState({ label: '' });
	};

	render() {
		return (
			<form className="item-add-form d-flex" onSubmit={this.onSubmit}>
				<input
					type="text"
					value={this.state.label}
					className="form-control"
					placeholder="What needs to be done"
					onChange={this.onLabelChange}
				/>
				<button className="btn btn-outline-secondary">Add Item</button>
			</form>
		);
	}
}

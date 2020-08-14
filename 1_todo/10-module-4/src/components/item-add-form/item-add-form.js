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
    this.props.onItemAdded(this.state.label);
	};

	render() {
		return (
			<form className="item-add-form d-flex" onSubmit={this.onSubmit}>
				<input
					type="text"
					className="form-control"
          placeholder="What needs to be done"
					onChange={this.onLabelChange}
				/>
				<button className="btn btn-outline-secondary">Add Item</button>
			</form>
		);
	}
}

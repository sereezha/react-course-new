import React, { Component } from 'react';

import './item-add-form.scss';

export default class ItemAddForm extends Component {
	render() {
		const { onItemAdded } = this.props;
		return (
			<div className="item-add-form">
				<button onClick={() => onItemAdded('Hello World')} className="btn btn-outline-secondary">
					Add Item
				</button>
			</div>
		);
	}
}

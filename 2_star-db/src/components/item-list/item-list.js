import React, { Component } from 'react';

import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
	state = {
		itemsList: null,
	};

	componentDidMount() {
		const { getData } = this.props;
		getData().then((itemsList) => {
			this.setState({ itemsList });
		});
	}

	renderItems(itemsList) {
		const { onItemSelected, renderItem } = this.props;
		return itemsList.map((item) => {
			const { id } = item;
			const value = renderItem(item);
			return (
				<li
					key={id}
					className="list-group-item"
					onClick={() => onItemSelected(id)}
				>
					{value}
				</li>
			);
		});
	}

	render() {
		const { itemsList } = this.state;

		if (!itemsList) {
			return <Spinner />;
		}

		const items = this.renderItems(itemsList);

		return <ul className="item-list list-group">{items}</ul>;
	}
}

import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

export default class ItemDetails extends Component {
	state = {
		item: null,
		loading: false,
		image: null,
	};

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.itemId === this.props.itemId) return;
		this.updateItem();
	}

	updateItem() {
		this.setState({ loading: true });
		const { itemId, getData, getImageUrl } = this.props;
		if (!itemId) return;
		getData(itemId).then((item) => {
			this.setState({ item, loading: false, image: getImageUrl(item) });
		});
	}

	render() {
		const { item, loading, image } = this.state;
		if (!item) {
			return <span>Select a item from a list</span>;
		}
		return (
			<div className="item-details card">
				{loading ? (
					<Spinner />
				) : (
					<ItemView item={item} image={image}>
						{this.props.children}
					</ItemView>
				)}
			</div>
		);
	}
}

const ItemView = (props) => {
	const { item, image, children } = props;
	return (
		<>
			<img className="item-image" src={image} alt="some item" />

			<div className="card-body">
				<h4>{item.name}</h4>
				<ul className="list-group list-group-flush">
					{React.Children.map(children, (child) => {
						return React.cloneElement(child, { item });
					})}
				</ul>
				<ErrorButton />
			</div>
		</>
	);
};

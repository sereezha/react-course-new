import React, { useState, useEffect } from 'react';

import Spinner from '../spinner';

import './item-details.css';

const ItemDetails = (props) => {
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const { itemId, getData, getImageUrl, children } = props;

	const updateItem = () => {
		setLoading(true);
		if (!itemId) return;
		getData(itemId).then((item) => {
			setItem(item);
			setImage(getImageUrl(item));
			setLoading(false);
		});
	};

	useEffect(() => {
		updateItem();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemId, getData, getImageUrl]);

	if (!item) {
		return <span>Select a item from a list</span>;
	}

	return (
		<div className="item-details card">
			{loading ? (
				<Spinner />
			) : (
				<ItemView item={item} image={image}>
					{children}
				</ItemView>
			)}
		</div>
	);
};

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
			</div>
		</>
	);
};

export const Record = (props) => {
	const { item, field, label } = props;
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export default ItemDetails;

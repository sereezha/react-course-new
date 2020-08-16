import React from 'react';

import './item-status-filter.scss';

const ItemStatusFilter = (props) => {
	const { onFilterChange, status } = props;
	const buttons = [
		{
			type: 'button',
			value: 'all',
			label: 'All',
		},
		{
			type: 'button',
			value: 'active',
			label: 'Active',
		},
		{
			type: 'button',
			value: 'done',
			label: 'Done',
		},
	];
	return (
		<div className="btn-group">
			{buttons.map(({ type, value, label }) => {
				const isActive = status === value;
				const btnAdditionalClass = isActive
					? 'btn-info'
					: 'btn-outline-secondary';
				const btnClasses = `btn ${btnAdditionalClass}`;
				return (
					<button
						key={value}
						type={type}
						className={btnClasses}
						onClick={() => onFilterChange(value)}
					>
						{label}
					</button>
				);
			})}
		</div>
	);
};

export default ItemStatusFilter;

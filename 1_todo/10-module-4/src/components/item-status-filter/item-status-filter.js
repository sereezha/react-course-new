import React from 'react';
import classNames from 'classnames';

import { TODOS_FILTER_STATUSES } from 'helpers/consts';

import './item-status-filter.scss';

const ItemStatusFilter = (props) => {
	const { onFilterChange, status } = props;
	const buttons = [
		{
			type: 'button',
			value: TODOS_FILTER_STATUSES.all,
			label: 'All',
		},
		{
			type: 'button',
			value: TODOS_FILTER_STATUSES.active,
			label: 'Active',
		},
		{
			type: 'button',
			value: TODOS_FILTER_STATUSES.done,
			label: 'Done',
		},
	];
	return (
		<div className="btn-group">
			{buttons.map(({ type, value, label }) => {
				const isActive = status === value;
				const btnClasses = classNames('btn', {
					'btn-info': isActive,
					'btn-outline-secondary': !isActive,
				});
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

import React from 'react';
import classNames from 'classnames';

import './todo-list-item.scss';

const TodoListItem = (props) => {
	const {
		done,
		label,
		important,
		onDeleted,
		onToggleDone,
		onToggleImportant,
	} = props;

	const listItemClasses = classNames('todo-list-item', {
		done: done,
		important: important,
	});

	return (
		<span className={listItemClasses}>
			<span className="todo-list-item-label" onClick={onToggleDone}>
				{label}
			</span>

			<button
				type="button"
				className="btn btn-outline-success btn-sm float-right"
				onClick={onToggleImportant}
			>
				<i className="fa fa-exclamation" />
			</button>

			<button
				type="button"
				className="btn btn-outline-danger btn-sm float-right"
				onClick={onDeleted}
			>
				<i className="fa fa-trash-o" />
			</button>
		</span>
	);
};

export default TodoListItem;

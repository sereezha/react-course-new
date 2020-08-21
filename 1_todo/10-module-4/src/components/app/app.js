import React, { useState, useEffect } from 'react';

import AppHeader from 'components/app-header';
import SearchPanel from 'components/search-panel';
import TodoList from 'components/todo-list';
import ItemStatusFilter from 'components/item-status-filter';
import ItemAddForm from 'components/item-add-form';
import { TODOS_FILTER_STATUSES } from 'helpers/consts';

import './app.scss';
let maxId = 100;

const App = () => {
	const [todoData, setTodoData] = useState([]);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState(TODOS_FILTER_STATUSES.all);

	const getItemsFromLocalStorage = () => {
		const todoData = JSON.parse(localStorage.getItem('todoData')) || [];
		setTodoData(todoData);
	};

	const setItemsInLocalStorage = (item, value) => {
		localStorage.setItem(item, JSON.stringify(value));
	};

	useEffect(getItemsFromLocalStorage, []);

	const createTodoItem = (label) => {
		return { label, important: false, done: false, id: maxId++ };
	};

	const deleteItem = (id) => {
		setTodoData((todoData) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newTodoData = [
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1),
			];
			setItemsInLocalStorage('todoData', newTodoData);
			return newTodoData;
		});
	};

	const addItem = (text) => {
		const newItem = createTodoItem(text);
		setTodoData((todoData) => {
			const newTodoData = [...todoData, newItem];
			setItemsInLocalStorage('todoData', newTodoData);
			return newTodoData;
		});
		setStatus(TODOS_FILTER_STATUSES.all);
	};

	const toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
		return newArray;
	};

	const onToggleImportant = (id) => {
		setTodoData((todoData) => {
			const newTodoData = toggleProperty(todoData, id, 'important');
			setItemsInLocalStorage('todoData', newTodoData);
			return toggleProperty(todoData, id, 'important');
		});
	};

	const onToggleDone = (id) => {
		setTodoData((todoData) => {
			const newTodoData = toggleProperty(todoData, id, 'done');
			setItemsInLocalStorage('todoData', newTodoData);
			return newTodoData;
		});
	};

	const filterTodosByQuery = (todos, query) => {
		if (todos.length === 0) return todos;
		return todos.filter(({ label }) => {
			const queryLowerCase = query.toLowerCase();
			const labelLowerCase = label.toLowerCase();
			return labelLowerCase.includes(queryLowerCase);
		});
	};

	const filterTodosByStatus = (todos, status) => {
		switch (status) {
			case TODOS_FILTER_STATUSES.all:
				return todos;

			case TODOS_FILTER_STATUSES.active:
				return todos.filter(({ done }) => !done);

			case TODOS_FILTER_STATUSES.done:
				return todos.filter(({ done }) => done);

			default:
				return todos;
		}
	};

	const onQueryChange = (query) => {
		setQuery(query);
	};

	const onFilterChange = (status) => {
		setStatus(status);
	};

	const todoDataLength = !!todoData.length;
	const isTodoDataExist = !!todoData && !!todoDataLength;
	const visibleTodos = isTodoDataExist && filterTodosByQuery(todoData, query);
	const filteredTodos =
		isTodoDataExist && filterTodosByStatus(visibleTodos, status);
	const doneCount = isTodoDataExist && todoData.filter((el) => el.done).length;
	const todoCount = isTodoDataExist && todoData.length - doneCount;

	return (
		<div className="todo-app">
			<AppHeader toDo={todoCount} done={doneCount} />
			<div className="top-panel d-flex">
				<SearchPanel onSearch={onQueryChange} />
				<ItemStatusFilter onFilterChange={onFilterChange} status={status} />
			</div>
			{!!isTodoDataExist && (
				<TodoList
					todos={filteredTodos}
					onDeleted={(id) => {
						deleteItem(id);
					}}
					onToggleImportant={(id) => onToggleImportant(id)}
					onToggleDone={(id) => onToggleDone(id)}
				/>
			)}
			<ItemAddForm onItemAdded={addItem} />
		</div>
	);
};

export default App;

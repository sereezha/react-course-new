import React, { Component } from 'react';

import AppHeader from 'components/app-header';
import SearchPanel from 'components/search-panel';
import TodoList from 'components/todo-list';
import ItemStatusFilter from 'components/item-status-filter';
import ItemAddForm from 'components/item-add-form';

import './app.scss';

export default class App extends Component {
	maxId = 100;

	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch'),
		],
		query: '',
		status: 'all',
	};

	createTodoItem(label) {
		return { label, important: false, done: false, id: this.maxId++ };
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return { todoData: newArray };
		});
	};

	addItem = (text) => {
		const newItem = this.createTodoItem(text);
		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem];
			return {
				todoData: newArr,
				status: 'all',
			};
		});
	};

	toggleProperty = (arr, id, propName) => {
		const idx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[idx];
		const newItem = { ...oldItem, [propName]: !oldItem[propName] };
		const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
		return newArray;
	};

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return { todoData: this.toggleProperty(todoData, id, 'important') };
		});
	};

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return { todoData: this.toggleProperty(todoData, id, 'done') };
		});
	};

	filterTodosByQuery = (todos, query) => {
		if (todos.length === 0) return todos;
		return todos.filter(({ label }) => {
			const queryLowerCase = query.toLowerCase();
			const labelLowerCase = label.toLowerCase();
			return labelLowerCase.includes(queryLowerCase);
		});
	};

	filterTodoByStatus = (todos, status) => {
		switch (status) {
			case 'all':
				return todos;

			case 'active':
				return todos.filter(({ done }) => !done);

			case 'done':
				return todos.filter(({ done }) => done);

			default:
				return todos;
		}
	};

	onQueryChange = (query) => {
		this.setState({ query });
	};

	onFilterChange = (status) => {
		this.setState({ status });
	};

	render() {
		const { todoData, query, status } = this.state;
		const visibleTodos = this.filterTodosByQuery(todoData, query);
		const filteredTodos = this.filterTodoByStatus(visibleTodos, status);
		const doneCount = todoData.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;
		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SearchPanel onSearch={this.onQueryChange} />
					<ItemStatusFilter
						onFilterChange={this.onFilterChange}
						status={status}
					/>
				</div>
				<TodoList
					todos={filteredTodos}
					onDeleted={(id) => {
						this.deleteItem(id);
					}}
					onToggleImportant={(id) => this.onToggleImportant(id)}
					onToggleDone={(id) => this.onToggleDone(id)}
				/>
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	}
}

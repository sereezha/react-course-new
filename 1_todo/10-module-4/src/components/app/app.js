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
			{ label: 'Drink Coffee', important: false, id: 1 },
			{ label: 'Make Awesome App', important: true, id: 2 },
			{ label: 'Have a lunch', important: false, id: 3 },
		],
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return { todoData: newArray };
		});
	};

	addItem = (text) => {
		const newItem = {
			label: text,
			important: false,
			id: this.maxId++,
		};

		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem];
			return {
				todoData: newArr,
			};
		});
	};

	render() {
		const { todoData } = this.state;
		return (
			<div className="todo-app">
				<AppHeader toDo={1} done={3} />
				<div className="top-panel d-flex">
					<SearchPanel />
					<ItemStatusFilter />
				</div>
				<TodoList
					todos={todoData}
					onDeleted={(id) => {
						this.deleteItem(id);
					}}
				/>
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	}
}

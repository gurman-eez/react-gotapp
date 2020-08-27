import React, { Component } from 'react';

import './itemDetails.css';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const Field = ({item, field, label}) => {			// функциональный компонент элемента из списка
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	)
}

export {
	Field
}

export default class ItemDetails extends Component {			// классовый компонент списка

	state = {
		item: null,
		loading: true,		// загрузка
		error: false
	}

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {	// проверка на совпадение пропсов
			this.updateItem();
		}
	}

	updateItem() {											//обновление элемента
		const { itemId, getData } = this.props;
		if (!itemId) {
			return;
		}

		this.setState({
			loading: true
		})

		getData(itemId)		// обновляем элемент по id
			.then(item => {
				this.setState({
					item,
					loading: false
				})
			})
			.catch(() => this.onError())
	}

	onError() {				// ошибка
		this.setState({
			item: null,
			error: true
		})
	}

	render() {
		const { item, error, loading } = this.state;
		

		if (!item && error) {
			return <ErrorMessage />						// возвращаем компонент с ошибкой
		} else if (!item) {
			return <span>Please choose...</span>
		}

		if (loading) {										// возвразаем компонент со спиннером
			return (
				<div className="item-details rounded">
					<Spinner />
				</div>
			)
		}

		const { name } = item;

		return (																		// меняем детей itemDetails(компонент Field)
			<div className="item-details rounded">
				<h4>{name}</h4>
				{
					React.Children.map(this.props.children, child => {
						return React.cloneElement(child, {item})
					})
				}
			</div>
		);
	}
}
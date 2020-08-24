import React, { Component } from 'react';
import GotService from '../../services/gotService';

import './itemDetails.css';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const Field = ({item, field, label}) => {
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

export default class ItemDetails extends Component {

	gotService = new GotService();

	state = {
		item: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId, getData } = this.props;
		if (!itemId) {
			return;
		}

		this.setState({
			loading: true
		})

		getData(itemId)
			.then(item => {
				this.setState({
					item,
					loading: false
				})
			})
			.catch(() => this.onError())
		// this.foo.bar = 0;
	}

	onError() {
		this.setState({
			item: null,
			error: true
		})
	}

	render() {
		const { item, error, loading } = this.state;
		

		if (!item && error) {
			return <ErrorMessage />
		} else if (!item) {
			return <span>Please choose...</span>
		}

		if (loading) {
			return (
				<div className="item-details rounded">
					<Spinner />
				</div>
			)
		}

		const { name } = item;

		return (
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
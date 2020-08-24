import React, { Component } from 'react';
import GotService from '../../services/gotService';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {

	gotService = new GotService();

	state = {
		itemList: null,
		error: false
	}

	componentDidMount() {
		const {getData} = this.props;
		
		getData()
			.then(itemList => {
				this.setState({
					itemList,
					error: false
				});
			})
			.catch(() => { this.onError() });
		// this.foo.bar = 0;
	}

	componentDidCatch() {
		this.setState({
			itemList: null,
			error: true
		})
	}

	onError(status) {
		this.setState({
			itemList: null,
			error: true
		})
	}

	renderItem(arr) {
		return arr.map(item => {
			const { name, id } = item;
			return (
				<li
					key={id}
					className="list-group-item"
					onClick={() => this.props.onCharSelected(id)}>
					{name}
				</li>
			)
		})
	}

	render() {

		const { itemList, error } = this.state;

		if (error) {
			return <ErrorMessage />
		}


		if (!itemList) {
			return <Spinner />
		}

		const items = this.renderItem(itemList);

		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}
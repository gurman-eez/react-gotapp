import React, { Component } from 'react';
import GotService from '../../services/gotService';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {

	gotService = new GotService();

	state = {
		charList: null,
		error: false
	}

	componentDidMount() {
		this.gotService.getAllCharacters()
			.then(charList => {
				this.setState({
					charList,
					error: false
				});
			})
			.catch(() => { this.onError() });
		// this.foo.bar = 0;
	}

	componentDidCatch() {
		this.setState({
			charList: null,
			error: true
		})
	}

	onError(status) {
		this.setState({
			charList: null,
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

		const { charList, error } = this.state;

		if (error) {
			return <ErrorMessage />
		}


		if (!charList) {
			return <Spinner />
		}

		const items = this.renderItem(charList);

		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}
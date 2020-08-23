import React, { Component } from 'react';
import GotService from '../../services/gotService';
import './itemList.css';
import Spinner from '../spinner';
export default class ItemList extends Component {

	gotService = new GotService();

	state = {
		char: null
	}

	componentDidMount() {
		this.gotService.getAllCharacters()
			.then(charList => {
				this.setState({ charList })
			})
	}

	renderItem(arr) {
		return arr.map((item, i) => {
			return (
				<li
					key={i}
					className="list-group-item"
					onClick={() => this.props.onCharSelected(41 + i)}>
					{item.name}
				</li>
			)
		})
	}

	render() {

		const { charList } = this.state;

		if (!charList) {
			return <Spinner />
		}

		const items = this.renderItem(charList)
		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}
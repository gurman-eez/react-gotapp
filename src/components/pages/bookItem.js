import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import GotService from '../../services/gotService';

export default class BookItem extends Component {
	gotService = new GotService();

	state = {
		selectedBook: 3
	}

	render() {
		return (
			<ItemDetails
				itemId={this.props.bookId}
				getData={this.gotService.getBook} >
				<Field field='numberOfPages' label='Number of pages' />
				<Field field='publiser' label='Publiser' />
				<Field field='released' label='Released' />
			</ItemDetails>
		)
	}
}
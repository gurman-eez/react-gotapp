import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';


export default class BookPage extends Component {
	gotService = new GotService();


	state = {
		selectedBook: 8,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	onBookSelected = id => {
		this.setState({
			selectedBook: id
		})
	}

	render() {
		const { error, selectedBook } = this.state;

		const itemList = (
			<ItemList
				onItemSelected={this.onBookSelected}
				getData={this.gotService.getAllBooks}
				renderItem={({ name }) => name} />
		)
		const bookDetails = (
			<ItemDetails
				itemId={selectedBook}
				getData={this.props.getData} >
				<Field field='numberOfPages' label='Number of pages' />
				<Field field='publiser' label='Publiser' />
				<Field field='released' label='Released' />
			</ItemDetails>
		)

		if (error) {
			return <ErrorMessage />
		}

		return (
			<RowBlock left={itemList} right={bookDetails} />
		)
	}
}
import React, { Component } from 'react';
import { Col, Row} from 'reactstrap';
import ItemDetails, { Field } from '../itemDetails';
import GotService from '../../services/gotService';

export default class BookItem extends Component {
	gotService = new GotService();

	state = {
		selectedBook: 3
	}

	render() {
		return (
			<Row>
				<Col lg={{ size: 5, offset: 0 }}>
					<ItemDetails
						itemId={this.props.bookId}
						getData={this.gotService.getBook} >
						<Field field='numberOfPages' label='Number of pages' />
						<Field field='publiser' label='Publiser' />
						<Field field='released' label='Released' />
					</ItemDetails>
				</Col>
			</Row>
		)
	}
}
import React, { Component } from 'react';
import { Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';


class BookPage extends Component {		// компонент со списком книг
	gotService = new GotService();		// из api


	state = {
		error: false			// ошибка
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}


	render() {
		const { error} = this.state;


		if (error) {
			return <ErrorMessage />
		}

		return (
			<Row>
				<Col lg={{ size: 10, offset: 0 }}></Col>
					<ItemList
						onItemSelected={(itemId) => {
							this.props.history.push(itemId)
						}}
						getData={this.gotService.getAllBooks}
						renderItem={({ name }) => name} />
				<Col/>
			</Row>
		)
	}
}

export default withRouter(BookPage) //получение пропсов из Route
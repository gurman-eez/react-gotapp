import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { BookPage, BookItem, HousePage, CharacterPage} from '../pages';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';






export default class App extends Component {
	gotService = new GotService();


	state = {
		toggle : false,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}


	onToggle = () => {
		this.setState({
			toggle: !this.state.toggle
		})
	}

	

	render() {

		const {toggle, error} = this.state;

		const randomChar = toggle ? null : <RandomChar />;

		if (error) {
			return <ErrorMessage />
		}
		return (
			<Router>
				<div className='app'>
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								{randomChar}
								<button
									className='btn btn-dark'
									onClick={this.onToggle}>Toggle random character</button>
							</Col>
						</Row>
						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' component={HousePage} />
						<Route path='/books' exact component={BookPage} />
						<Route path='/books/:id' render={() => <BookItem />} />
						
					</Container>
				</div>
			</Router>
		);
	}
};

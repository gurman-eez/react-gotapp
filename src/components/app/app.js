import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

import './app.css';


export default class App extends Component {

	state = {
		toggle : false
	}

	onToggle = () => {
		this.setState({
			toggle: !this.state.toggle
		})
	}

	render() {

		const {toggle} = this.state;

		const randomChar = toggle ? null : <RandomChar />;
		return (
			<>
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
					<Row>
						<Col md='6'>
							<ItemList />
						</Col>
						<Col md='6'>
							<CharDetails />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
};

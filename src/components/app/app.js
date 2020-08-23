import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import './app.css';




export default class App extends Component {

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
					<CharacterPage />
				</Container>
			</>
		);
	}
};

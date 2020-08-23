import React, { Component } from 'react';
import GotService from '../../services/gotService';

import './charDetails.css';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
export default class CharDetails extends Component {

	gotService = new GotService();

	state = {
		char: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	updateChar() {
		const { charId } = this.props;
		if (!charId) {
			return;
		}

		this.setState({
			loading: true
		})

		this.gotService.getCharacter(charId)
			.then(char => {
				this.setState({
					char,
					loading: false
				})
			})
			.catch(() => this.onError())
		// this.foo.bar = 0;
	}

	onError() {
		this.setState({
			char: null,
			error: true
		})
	}

	render() {
		const { char, error, loading } = this.state;
		

		if (!char && error) {
			return <ErrorMessage />
		} else if (!char) {
			return <span>Please choose a character...</span>
		}

		if (loading) {
			return (
				<div className="char-details rounded">
					<Spinner />
				</div>
			)
		}

		const { name, gender, born, died, culture } = char;

		return (
			<div className="char-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Gender</span>
						<span>{gender}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Born</span>
						<span>{born}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Died</span>
						<span>{died}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Culture</span>
						<span>{culture}</span>
					</li>
				</ul>
			</div>
		);
	}
}
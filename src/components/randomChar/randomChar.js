import React, { Component } from 'react';
import './randomChar.css';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {	// компонент рандомного персонажа
	
	gotService = new GotService();		// из api

	state = {
		char: {},		// по умолчанию пустой объект
		loading: true,
		error: false
	}
	static defaultProps = {		// пропсы по умолчанию
		interval: 10000
	}
	static propTypes = {
		interval: PropTypes.number		// обязательно число
	}
	

	componentDidMount() {			// появление компонента
		this.UpdateChar();
		this.timerId = setInterval(this.UpdateChar, this.props.interval);
	}

	componentWillUnmount() {			// исчезновение компонента
		clearInterval(this.timerId)
	}

	onCharLoaded = char => {		// когда данные персонажа загружены
		this.setState({
			char,
			loading: false
		})
	}

	onError = err => {		// отработка ошибки
		this.setState({
			loading: false,
			error: true
		})
	}

	UpdateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25) // 25-140 персонаж
		// const id = 10000;									это на проверку ошибки
		this.gotService.getCharacter(id)					// достаем персонажа по id
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	render() {

		const {char, loading, error } = this.state

		const spinner = loading ? <Spinner /> : null;
		const errorMessage = error ? <ErrorMessage /> : null;
		const content = !(loading || error) ? <View char={char} /> : null;

		return (
			<div className="random-block rounded">
				{spinner}
				{errorMessage}
				{content}
			</div>
		);
	}
}


const View = ({ char }) => {				// компонент с данными персонажа
	const { name, gender, born, died, culture } = char;

	return (
		<>
			<h4> Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</>
	)
}

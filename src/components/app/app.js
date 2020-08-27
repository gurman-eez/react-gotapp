import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { MainPage, BookPage, BookItem, HousePage, CharacterPage} from '../pages';
import GotService from '../../services/gotService';	// api
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';






export default class App extends Component {		// создаем и экспортим новый классовый компонент
	gotService = new GotService();	// создаем переменную из api


	state = {					// задаем стейты
		toggle : false,		// переключение кнопки
		error: false			// ошибка
	}

	componentDidCatch() {	// хук на случай ошибки
		this.setState({
			error: true			// задаем новое значение
		})
	}


	onToggle = () => {		// функция по переключению значения
		this.setState({
			toggle: !this.state.toggle		// меняем значение на противоположное
		})
	}

	render() {					// рендерим страницу

		const {toggle, error} = this.state;		// достаем данные из стейта

		const randomChar = toggle ? null : <RandomChar />;		// переменная на компонент RandomChar

		if (error) {
			return <ErrorMessage />		// возврат ошибки 
		}
		return (							// возврат страницы
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
						<Route path='/' exact component={MainPage} /> 
						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' component={HousePage} />
						<Route path='/books' exact component={BookPage} />
						<Route path='/books/:id' render={({match}) => { 
							const {id} = match.params;
							return <BookItem bookId={id}/>} 
						}/>
					</Container>
				</div>
			</Router>
		);
	}
};

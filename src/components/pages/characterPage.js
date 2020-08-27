import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {
	gotService = new GotService();  // из api


	state = {
		selectedChar: 130,	// выбранный персонаж по умолчанию
		error: false			// ошибка
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	onCharSelected = id => {
		this.setState({
			selectedChar: id		//задаем id выбранному персонажу
		})
	}

	render() {
		const { error, selectedChar } = this.state;

		const itemList = (
			<ItemList
				onItemSelected={this.onCharSelected}
				getData={this.gotService.getAllCharacters}	//персонажи из api
				renderItem={({ name, gender }) => `${name} (${gender})`} /> // показываем имя и пол персонажа
		)
		const charDetails = (
			<ItemDetails
				itemId={selectedChar}
				getData={this.gotService.getCharacter} >
				<Field field='gender' label='Gender'/>			
				<Field field='born' label='Born'/>
				<Field field='died' label='Died'/>
				<Field field='culture' label='Culture'/>
			</ItemDetails>
		)

		if (error) {
			return <ErrorMessage />		// компонент ошибки
		}

		return (
			<RowBlock left={itemList} right={charDetails}/>		// список слева а выбранный из списка - справа
		)
	}
}


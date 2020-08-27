import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class HousePage extends Component {
	gotService = new GotService();		// из api


	state = {
		selectedHouse: 5,		// показанный дом по умолчанию
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	onHouseSelected = id => {
		this.setState({
			selectedHouse: id			// выбраный дом по id
		})
	}

	render() {
		const { error, selectedHouse } = this.state;

		const itemList = (
			<ItemList
				onItemSelected={this.onHouseSelected}
				getData={this.gotService.getAllHouses}		//	все дома из api
				renderItem={({ name }) => name} />			// задаем имя элемента 
		)
		const houseDetails = (
			<ItemDetails
				itemId={selectedHouse}
				getData={this.gotService.getHouse} >
				<Field field='region' label='Region' />
				<Field field='words' label='Words' />
				<Field field='titles' label='Titles' />
				<Field field='overlord' label='Overlord' />
				<Field field='ancestralWeapons' label='Ancestral weapons' />
			</ItemDetails>
		)

		if (error) {
			return <ErrorMessage />			// ошибка
		}

		return (
			<RowBlock left={itemList} right={houseDetails} />		// список слева а выбранный из списка - справа
		)
	}
}
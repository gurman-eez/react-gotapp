import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {
	gotService = new GotService();


	state = {
		selectedChar: 130,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	onCharSelected = id => {
		this.setState({
			selectedChar: id
		})
	}

	render() {
		const { error, selectedChar } = this.state;

		const itemList = (
			<ItemList
				onCharSelected={this.onCharSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		)
		const charDetails = (
			<CharDetails
				charId={selectedChar} >
				<Field field='gender' label='Gender'/>
				<Field field='born' label='Born'/>
				<Field field='died' label='Died'/>
				<Field field='culture' label='Culture'/>
			</CharDetails>
		)

		if (error) {
			return <ErrorMessage />
		}

		return (
			<RowBlock left={itemList} right={charDetails}/>
		)
	}
}


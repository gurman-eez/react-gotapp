export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	async getResources(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}
									received: ${res.status}`)
		}

		return await res.json();
	}

	async getAllCharacters() {
		const res = await this.getResources('/characters?page=5&pageSize=10');
		return res.map(this._transformCharacter)
	}
	async getCharacter(id) {
		const character = await this.getResources(`/characters/${id}`);
		return this._transformCharacter(character)
	}

	async getAllBooks() {
		const res = await this.getResources('/books/');
		return res.map(this._transformBook)
	}
	async getBook(id) {
		const book = await this.getResources(`/books/${id}`);
		return this._transformBook(book)
	}

	async getAllHouses() {
		const res = await this.getResources('/houses/');
		return res.map(this._transformHouse)
	}
	async getHouse(id) {
		const house = await this.getResources(`/houses/${id}`);
		return this._transformHouse(house)
	}

	isSet(data){
		if (data) {
			return data
		} else {
			return 'no data...'
		}
	}

	_getId = item => {
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	}

	_transformCharacter = char => {
		return {
			id: this._getId(char),
			name: this.isSet(char.name),
			gender: this.isSet(char.gender),
			born: this.isSet(char.born),
			died: this.isSet(char.died),
			culture: this.isSet(char.culture)
		}
	}
	_transformBook = book => {
		return {
			id: this._getId(book),
			name: this.isSet(book.name),
			numberOfPages: this.isSet(book.numberOfPages),
			publiser: this.isSet(book.publiser),
			released: this.isSet(book.released)
		}
	}
	_transformHouse = house => {
		return {
			id: this._getId(house),
			name: this.isSet(house.name),
			region: this.isSet(house.region),
			words: this.isSet(house.words),
			titles: this.isSet(house.titles),
			overlord: this.isSet(house.overlord),
			ancestralWeapons: this.isSet(house.ancestralWeapons)
		}
	}
}
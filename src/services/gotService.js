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

	_transformCharacter(char) {
		return {
			name: char.name,
			gender: char.gender,
			born: char.born,
			died: char.died,
			culture: char.culture
		}
	}
	_transformBook(book) {
		return {
			name: book.name,
			numberOfPages: book.numberOfPages,
			publiser: book.publiser,
			released: book.released
		}
	}
	_transformHouse(house) {
		return {
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			overlord: house.overlord,
			ancestralWeapons: house.ancestralWeapons
		}
	}
}
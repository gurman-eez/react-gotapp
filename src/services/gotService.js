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

	getAllCharacters() {
		return this.getResources('/characters?page=5&pageSize=10')
	}
	getCharacter(id) {
		return this.getResources(`/characters/${id}`)
	}

	getAllBooks() {
		return this.getResources('/books/')
	}
	getBook(id) {
		return this.getResources(`/books/${id}`)
	}

	getAllHouses() {
		return this.getResources('/houses/')
	}
	getCharacter(id) {
		return this.getResources(`/houses/${id}`)
	}
}
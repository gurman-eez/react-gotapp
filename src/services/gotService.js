export default class GotService { 											// создаем и экспортируем классовый компонент
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';		// берем данные из данного сайта
	}

	getResources = async url => {
		const res = await fetch(`${this._apiBase}${url}`);				// делаем запрос к серверу

		if (!res.ok) {																// если что-то пошло не так
			throw new Error(`Could not fetch ${url}
									received: ${res.status}`)
		}

		return await res.json();												// возвращает ответ от сервера(объект)
	}

	getAllCharacters = async () => {															//достаем всех персонажей
		const res = await this.getResources('/characters?page=5&pageSize=10');	// взяли данные из 5 страницы потому что на предыдущих страциах мало данных
		return res.map(this._transformCharacter)											// меняем массив с данными
	}
	getCharacter = async id => {																// то же самое для одного персонажа
		const character = await this.getResources(`/characters/${id}`);			
		return this._transformCharacter(character)										
	}

	getAllBooks = async () => {																// книги
		const res = await this.getResources('/books/');									
		return res.map(this._transformBook)													
	}
	getBook = async id => {																		// одна книга
		const book = await this.getResources(`/books/${id}`);							
		return this._transformBook(book)														
	}

	getAllHouses = async () => {																// дома
		const res = await this.getResources('/houses/');								
		return res.map(this._transformHouse)												
	}
	getHouse = async id => {																	// один дом
		const house = await this.getResources(`/houses/${id}`);						
		return this._transformHouse(house)													
	}

	isSet(data){						// проверка на наличие данных
		if (data) {
			return data
		} else {
			return 'no data...'
		}
	}

	_getId = item => {								// достаем id из url 
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	}

	_transformCharacter = char => {				// контроль того что приходит от api
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
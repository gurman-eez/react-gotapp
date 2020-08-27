import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';



function ItemList({ getData, onItemSelected, renderItem }) {
	const [itemList, updateList] = useState([]);						// хук на переменные

	useEffect(() => {						// хук на действие(обновление списка)
		getData()
			.then(data => {
				updateList(data)
			})
	}, [])

	function renderItems(arr) {			//рендерим элементы списка
		return arr.map(item => {
			const { id } = item;
			const label = renderItem(item);
			return (
				<li
					key={id}			// уникальный ключ
					className="list-group-item"
					onClick={() => onItemSelected(id)}>
					{label}
				</li>
			)
		})
	}

	if (!itemList) {
		return <Spinner />			// компонент спиннера
	}

	const items = renderItems(itemList);

	return (
		<ul className="item-list list-group">
			{items}
		</ul>
	);

}

export default ItemList;
import React from 'react';
import styled from 'styled-components';

const MainTitle = styled.h1`
text-align: center;
color: white;
`;

const MainSubtitle = styled(MainTitle)`
font-size: 24px;
`
const MainPage = () => {
	return (
		<>
			<MainTitle>Welcome to the "Game of Thrones Database" site!</MainTitle>
			<MainSubtitle> You have visited the largest library of characters, houses and books from "GOT" world. Don't hesitate and click on the right top links.<br/>
			Right on the top left corner you can see a table that generates random charactor each 1.5 seconds.<br/>
				You can also push the "Toggle random character" button go hide/show this table</MainSubtitle>
		</>
	)
}

export default MainPage;
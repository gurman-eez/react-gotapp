import React from 'react';
import { Col, Row} from 'reactstrap';

const RowBlock = ({left, right}) => {		// верстка по блокам списка и выбранного предмета
	return (
		<Row>
			<Col md='6'>
				{left}
			</Col>
			<Col md='6'>
				{right}
			</Col>
		</Row>
	)
}

export default RowBlock;
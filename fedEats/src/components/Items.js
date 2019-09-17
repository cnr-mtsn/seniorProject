import React from "react";

import { Col, Row, Container } from "reactstrap";
import "../css/App.css";
import Title from "../components/Title";
// import {bread, tortilla, cheese, protein, veggies, extras, pickupTime} from '../deli/ingredients';
function Items() {
	return (
		<Container>
			<Row>
				<Col className='subHeader'>
					<Title name='Base'></Title>
				</Col>
				<Col xl={1} lg={1} md={1} sm={0}></Col>
				<Col className='subHeader'>
					<Title name='Base'></Title>
				</Col>
			</Row>

			<Row>
				<Col className='subHeader'>
					<Title name='Cheese'></Title>
				</Col>
				<Col xl={1} lg={1} md={1} sm={0}></Col>
				<Col className='subHeader'>
					<Title name='Veggies'></Title>
				</Col>
			</Row>

			<Row>
				<Col className='subHeader'>
					<Title name='Condiments'></Title>
				</Col>
				<Col xl={1} lg={1} md={1} sm={0}></Col>
				<Col className='subHeader'>
					<Title name='Extras'></Title>
				</Col>
			</Row>
		</Container>
	);
}

export default Items;

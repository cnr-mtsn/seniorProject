import React from 'react'
import {
	Col,
	Row,
	Container,
} from "reactstrap";
import './App.css';
import Title from './Title';

function Pickup() {

    return (
        <Container>
            <Row>
                <Col className="subHeader">
					<Title name="Select Pick-Up Time"></Title>
                </Col>
            </Row>
        </Container>


    );
}

export default Pickup;
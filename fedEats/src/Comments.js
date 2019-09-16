import React from "react";
import {
	Col,
	Row,
	Container,
	Input
} from "reactstrap";
import './App.css';
import Title from './Title';

function Comments() {

    return (
        <Container>
            <Row>
                <Col className="subHeader">
					<Title name="Comments"></Title>
                </Col>
            </Row>
			<Row style={{marginTop: '1vw'}}>
                <Col>
                    <Input type="textarea" placeholder="Special instructions for the chef..."/>
                </Col>
            </Row>
        </Container>


    );
}

export default Comments;
import React from 'react';
import NavigationBar from './NavigationBar';
import './App.css';
import Header from './Header';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

function OrderForm() {

    return (
        <Container>
            <Row>
                <Col>
                    <Header title="Fed Eats Order Form"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NavigationBar page="Order Form"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron style={{height:'100vh', opacity:'.8', marginTop:'2vh'}}>
                        <h1>Order Form</h1>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderForm;
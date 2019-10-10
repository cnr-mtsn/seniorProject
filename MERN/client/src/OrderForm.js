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
                <Col></Col>
                <Col><NavigationBar/></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron style={{backgroundColor:'rgb(54, 46, 60)', height:'100vh', opacity:'.8', marginTop:'2vh'}}>
                        <h4 className="jumbotronTitle">Order Form</h4>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderForm;
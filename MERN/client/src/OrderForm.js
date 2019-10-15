import React from 'react';
import NavigationBar from './NavigationBar';
import './App.css';
import Header from './Header';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import DailySpecial from './DailySpecial';

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
                    <Jumbotron style={{backgroundColor:'grey', height:'100vh', marginTop:'2vh'}}>
                        <h4 className="jumbotronTitle">Order Form</h4>
                        <DailySpecial/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderForm;
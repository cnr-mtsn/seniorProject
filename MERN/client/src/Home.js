import React from 'react';
import NavigationBar from './NavigationBar';
import Header from './Header';
import Specials from './Specials';

import { Jumbotron, Container, Row, Col } from 'reactstrap';

function Home() {

    return (
        <Container>
            <Row>
                <Col>
                    <Header title="Fed Eats Home"/>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col><NavigationBar page="Home"/></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron style={ { 
                        backgroundColor:'rgb(54, 46, 60)',
                        height:'auto', 
                        opacity:'.9', 
                        marginTop:'2vh'} 
                        }>
                        <h4 className="jumbotronTitle">Specials</h4>
                        <Specials/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
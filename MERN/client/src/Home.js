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
                <Col>
                    <NavigationBar page="Home"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron style={ { 
                        height:'auto', 
                        opacity:'.9', 
                        marginTop:'2vh'} 
                        }>
                        <h2>Specials</h2>
                        <Specials/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
import React from 'react';
import NavigationBar from './NavigationBar';
import Header from './Header';
import SpecialsSlideshow from './SpecialsSlideshow';

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
                <Col><NavigationBar/></Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron style={ { 
                        backgroundColor:'rgb(54, 46, 60)',
                        height:'auto',
                        marginTop:'2vh'} 
                        }>
                        <h4 className="jumbotronTitle">Specials</h4>
                        <SpecialsSlideshow/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
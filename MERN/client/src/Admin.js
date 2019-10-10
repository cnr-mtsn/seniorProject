import React from 'react';
import AdminItems from './AdminItems';
import NavigationBar from './NavigationBar';
import Header from './Header';
import { Jumbotron, Container, Row, Col } from 'reactstrap';


function Admin(props) {


    return (
        <Container>
            <Row>
                <Col>
                    <Header title="Fed Eats Admin"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NavigationBar page="Admin"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron style={{height:'auto', marginTop:'1vh', backgroundColor:'transparent'}}>
                        <AdminItems category=""/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>

    );
}

export default Admin;
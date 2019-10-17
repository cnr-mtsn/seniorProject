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
                    <Header title="Admin"/>
                </Col>
            </Row>
            <Row>
                <Col><NavigationBar/></Col>
            </Row>
            <Row>
                <Col>
                    <Jumbotron className="myJumbotron">
                        <AdminItems category=""/>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>

    );
}

export default Admin;
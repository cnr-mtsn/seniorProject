import React from 'react';
import AdminItems from './AdminItems';
import Header from './Header';
import { Jumbotron, Container, Row, Col } from 'reactstrap';


function Admin(props) {


    return (
        <Container fluid>
            <Row>
                <Col>
                    <Header title="Fed Eats Admin"/>
                </Col>
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
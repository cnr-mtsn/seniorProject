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
                <Col><NavigationBar/></Col>
            </Row>
            <Row>
                <Col>
                <Jumbotron style={{backgroundColor:'rgb(54, 46, 60)', height:'100vh', marginTop:'2vh'}}>
                    <h4 className="jumbotronTitle">Admin</h4>
                    <AdminItems category=""/>
                </Jumbotron>
                </Col>
            </Row>
        </Container>

    );
}

export default Admin;
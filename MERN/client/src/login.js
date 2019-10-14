import React from 'react';
import Header from './Header';
import NavigationBar from './NavigationBar';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import './App.css';

//Login function
function Login(props) {

    return (
        <Container>
            <Row>
                <Col>
                    <Header title="Fed Eats Login"/>
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <NavigationBar/>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                <Jumbotron style={{backgroundColor:'rgb(54, 46, 60)', height:'100vh', opacity:'.8', marginTop:'2vh'}}>
                    <h4 className="jumbotronTitle">Login</h4>
                    <h5 style={{color:'white'}}>Username: <input name='username'></input></h5>
                    <h5 style={{color:'white'}}>Password: <input name='password'></input></h5>
                </Jumbotron>
                </Col>
            </Row>
        </Container>

    );
}

export default Login;
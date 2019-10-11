import React from 'react';
import Header from './Header';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import './App.css';


function Login(props) {
    const buttonLabelStyle = {
        color:'white'
    };

    const homeLink = <Link to="/home"><span style={buttonLabelStyle}>Home</span></Link>;
    const adminLink = <Link to="/admin"><span style={buttonLabelStyle}>Admin</span></Link>;

    return (
        <Container>
            <Row>
                <Col>
                    <Header title="Fed Eats Login"/>
                </Col>
            </Row>
            <Row>
                <Col>
                <Jumbotron style={{backgroundColor:'rgb(54, 46, 60)', height:'100vh', opacity:'.8', marginTop:'2vh'}}>
                    <h4 className="jumbotronTitle">Login</h4>
                    <Button style={{outline:'1px solid white'}} color="secondary">{homeLink}</Button>
                    <Button style={{outline:'1px solid white'}} color="secondary">{adminLink}</Button>
                </Jumbotron>
                </Col>
            </Row>
        </Container>

    );
}

export default Login;
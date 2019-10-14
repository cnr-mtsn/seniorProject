import React from 'react';
import Header from './Header';
import NavigationBar from './NavigationBar';
import { Button, Input, Jumbotron, Container, Row, Col } from 'reactstrap';
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
                <Jumbotron style={{backgroundColor:'rgb(54, 46, 60)', height:'100vh', opacity:'1', marginTop:'2vh'}}>
                    <h4 className="jumbotronTitle">Login</h4>
                    <table>
                        <tr>
                            <td><Input name='username' type="text" placeholder="User ID" style={{width:"auto"}}></Input></td>
                        </tr>
                        <tr>
                            <td><Input name='password' type="text" placeholder="Password" style={{width:"auto"}}></Input></td>
                        </tr>
                        <tr>
                            <td><Button block outline color="secondary" type="submit" style={{width:"auto"}} onClick={Login}>Login</Button></td>
                        </tr>
                    </table>
                </Jumbotron>
                </Col>
            </Row>
        </Container>

    );
};

export default Login;
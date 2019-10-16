import React from 'react';
import Header from './Header';
import NavigationBar from './NavigationBar';
import { Button, Input, Container, Row, Col } from 'reactstrap';
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
                <Col>
                    <NavigationBar/>
                </Col>
            </Row>
            <Row>
                <Col style={{paddingLeft:'33%', paddingRight:'33%', height:'200vh'}}>
                <Container style={{backgroundColor:'rgb(54, 46, 60)', height:'40vh', opacity:'1', marginTop:'4vh'}}>
                <br></br>
                <h4 className="jumbotronTitle" style={{textAlign:'center'}}>Login</h4>
                    <table style={{margin:'auto', paddingRight:'25%', paddingLeft:'25%', paddingBottom:'10%', paddingTop:'10%'}}>
                        <tr>
                            <td><Input name='username' type="text" placeholder="User ID" style={{width:"auto"}}></Input></td>
                        </tr>
                        <br></br>
                        <tr>
                            <td><Input name='password' type="text" placeholder="Password" style={{width:"auto"}}></Input></td>
                        </tr>
                        <br></br>
                        <tr>
                            <td><Button block outline color="secondary" type="submit" style={{width:"auto"}} onClick={Login}>Login</Button></td>
                        </tr>
                    </table>
                </Container>
                </Col>
            </Row>
        </Container>

    );
};

export default Login;
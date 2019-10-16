import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';


function NavigationBar() {

    const homeLink = <Link to="/home"> <Button className="purpleButton">Home</Button></Link>;
    const loginLink = <Link to="/login"><Button className="purpleButton">Login</Button></Link>;
    const orderFormLink = <Link to="/orderForm"><Button className="purpleButton">Order Form</Button></Link>;
    const adminLink = <Link to="/admin"><Button className="purpleButton">Admin</Button></Link>;
   
    return (
        <Row style={{marginTop:'2vh'}}>
            <Col>{homeLink}</Col>
            <Col>{loginLink}</Col>
            <Col>{adminLink}</Col>
            <Col>{orderFormLink}</Col>
        </Row>
    );
}

export default NavigationBar;
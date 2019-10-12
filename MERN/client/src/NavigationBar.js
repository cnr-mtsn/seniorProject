import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';


function NavigationBar() {

    const homeLink = <Link to="/home"> <Button style={{outline:'1px solid white'}} color="secondary">Home</Button></Link>;
    const loginLink = <Link to="/login"><Button style={{outline:'1px solid white'}} color="secondary">Login</Button></Link>;
    const orderFormLink = <Link to="/orderForm"><Button style={{outline:'1px solid white'}} color="secondary">Order Form</Button></Link>;
    const adminLink = <Link to="/admin"><Button style={{outline:'1px solid white'}} color="secondary">Admin</Button></Link>;
   
    return (
        <ButtonGroup className="navigationBar">
            {homeLink}
            {loginLink}
            {adminLink}
            {orderFormLink}
        </ButtonGroup>
    );
}

export default NavigationBar;
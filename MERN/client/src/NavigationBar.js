import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';


function NavigationBar() {
    const buttonLabelStyle = {
        color:'white'
    };

    const homeLink = <Link to="/home"><span style={buttonLabelStyle}>Home</span></Link>;
    const orderFormLink = <Link to="/orderForm"><span style={buttonLabelStyle}>Order Form</span></Link>;
    const adminLink = <Link to="/admin"><span style={buttonLabelStyle}>Admin</span></Link>;
   
    return (
        <ButtonGroup className="navigationBar">
            <Button style={{outline:'1px solid white'}} color="secondary">{homeLink}</Button>
            <Button style={{outline:'1px solid white'}} color="secondary">{orderFormLink}</Button>
            <Button style={{outline:'1px solid white'}} color="secondary">{adminLink}</Button>
        </ButtonGroup>
    );
}

export default NavigationBar;
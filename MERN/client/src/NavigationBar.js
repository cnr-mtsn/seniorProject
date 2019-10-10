import React from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';


function NavigationBar(props) {

    return (
        <div>
            <Navbar color="dark" light expand="md">
                <NavbarBrand style={{color:'white'}}>{props.page}</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <ul className="navLinks">
                        <li>
                            <Link to="/home">
                                <h3>Home</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/orderForm">
                                <h3>Order Form</h3>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin">
                                <h3>Admin</h3>
                            </Link>
                        </li>
                    </ul>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavigationBar;
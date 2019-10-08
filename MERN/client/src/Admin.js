import React from 'react'
import './App.css';
import Items from './Items';
import Header from './Header';
import { Container } from 'reactstrap';



function Admin(props) {

        return (
            <Container className="App">
                <Header title="Fed Eats Admin"></Header>
                <Items category="cheese"/>
            </Container>
        );
}

export default Admin;


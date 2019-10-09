import React from 'react'
import './App.css';
import AdminItems from './AdminItems';
import Header from './Header';
import { Container } from 'reactstrap';



function Admin(props) {

        return (
            <Container className="App">
                <Header title="Fed Eats Admin"></Header>
                <AdminItems category="cheese"/>
            </Container>
        );
}

export default Admin;


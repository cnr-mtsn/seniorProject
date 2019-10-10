import React from 'react';
import AdminItems from './AdminItems';
import Header from './Header';
import NavigationBar from './NavigationBar';
import { Container } from 'reactstrap';



function Admin(props) {


    return (
        <Container>
            <Header title="Fed Eats Admin"/>
            <NavigationBar/>
            <AdminItems category="cheese"/>
        </Container>

    );
}

export default Admin;
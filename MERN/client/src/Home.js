import React from 'react';
import { Container } from 'reactstrap';
import NavigationBar from './NavigationBar';
import Header from './Header';

function Home() {



    return (
        <Container>
            <Header title="Home Page"/>
            <NavigationBar/>
            <h1>Home Page</h1>
        </Container>
    );
}

export default Home;
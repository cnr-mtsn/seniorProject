import React from 'react'
import './App.css';
import Items from './Items';
import Header from './Header';
import { 
    Row,
    Col, 
    Container,
} from 'reactstrap';



export class Admin extends React.Component {
    
    constructor(props) {
        super();
    }

    render() {

     
        return (
            <Container className="App">
                <Header title="Fed Eats Admin"></Header>
                <Items category="cheese"/>
            </Container>
        );
    }
}

export default Admin;


import React from 'react'
import './App.css';
import Admin from './Admin';
import OrderForm from './OrderForm';
import Home from './Home';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';



function App(props) {

        return (
            <Router>
                <Container className="App">
                    <Switch>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/orderForm" component={OrderForm}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </Container>
            </Router>
        );
}

export default App;


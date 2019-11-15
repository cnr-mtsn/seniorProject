import React from "react";
import "./App.css";
import Admin from "./components/Admin";
import OrderForm from "./components/OrderForm";
import Home from "./components/Home";
import Login from "./components/login";
 import Profile from "./components/Profile";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(props) {
	return (
		<Router>
			<Container fluid className='App'>
				<Switch>
					<Route path='/admin' component={Admin} />
					<Route path='/orderForm' component={OrderForm} />
					<Route path='/home' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/profile' component={Profile} />
					<Route path='/' exact component={Home} />
				</Switch>
			</Container>
		</Router>
	);
}

export default App;

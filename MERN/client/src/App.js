import React, { useState } from "react";
import "./App.css";
import Kitchen from './components/Kitchen';
import Admin from "./components/Admin";
import OrderForm from "./components/OrderForm";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Input, Button } from "reactstrap";


function App() {

	const [userID, setUserID] = useState();
	const [user, setUser] = useState();

	const handleIDInput = e => {
		setUserID(e.target.value);
	};
	const getUserData = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${userID}`)
			.then(response => response.json())
			.then(response => setUser(response.data[0]))
			.catch(err => console.log(err));
	};

	var inputPlaceholder = user ? "Logged In" : "User ID";

	const getUser = async () => {
		await getUserData(); 
	};
	const logoutUser = () => {
		setUser();
		setUserID();
	}
	
	return (
		<Router>

			<div className='App'>

				<Switch>

					<Route path='/admin' exact render={() => {
						return (
							<Admin user={user.user_id}/>
						);
					}} />

					<Route path='/orderForm' exact render={() => {
						return (
							<OrderForm user={user.user_id}/>
						);
					}} />

					<Route path='/profile' exact render={() => {
						return (
							<Profile user={user.user_id}/>
						)
					}} />

					<Route path="/kitchen" exact render={() => {
						return (
							<Kitchen user={user.user_id}/>
						)
					}} />

					<Route path='/' exact render={() => {
						return (
							<div className='homeWrapper'>

								<div className='homeHeader'>
									<Header
										user={user ? user.firstName : null}
										view={user ? user.view : 0}
									/>
								</div>

								<div className='homeInput'>
									<Input
										placeholder={inputPlaceholder}
										onChange={handleIDInput}
									/>
									{user ? (
										<Button className='hb' type='submit' onClick={logoutUser}>
											Logout
										</Button>
									) : (
										<Button className='hb' type='submit' onClick={getUser}>
											Login
										</Button>
									)}
								</div>

							</div>
						);
					}} />

				</Switch>

			</div>

		</Router>
	);
}

export default App;

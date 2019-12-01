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

	var inputPlaceholder = user ? user.user_id : "User ID";

	const getUser = () => {
		getUserData();
	};
	const logoutUser = () => {
		setUser();
		setUserID();
	}

	const userView = user ? user.view : 0;
	

	return (
		<Router>

			<div className='App'>

				<Switch>

					<Route path='/admin' exact render={() => {
						return (
							<Admin user={user}/>
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
									<Header user={user ? user.firstName : null} view={userView} />
								</div>
								<div className='homeContainer'>
									<div className='homeInput'>
										<Input
											placeholder={inputPlaceholder}
											onChange={handleIDInput}></Input>
									</div>
									<div className='homeButton'>
										<Button className='hb' type='submit' onClick={getUser}>
											Login
										</Button>
										{user ? (
											<Button className='lo' type='submit' onClick={logoutUser}>
												Logout
											</Button>
										) : null}
									</div>
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

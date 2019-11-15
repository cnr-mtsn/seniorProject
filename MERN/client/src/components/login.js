import React, { useState } from "react";
import Header from "../components/Header";
import { Button, Input, Jumbotron, Form, FormGroup } from "reactstrap";
import "../App.css";

//Login function
function Login(props) {

	const [userId, setUserId] = useState();
	const [password, setPassword] = useState();
	console.log(userId);
	console.log(password);

	const handleUserIdInput = (e) => {
		setUserId(e.target.value);
	}
	const handlePasswordInput = (e) => {
		setPassword(e.target.value);
	}
	return (
		<div className='loginWrapper'>

			<div className='loginHeader'>
				<Header title='Login'/>
			</div>

			<div className='loginJumbo'>
				<Jumbotron className='loginJumbo'>
					<Form>
						<FormGroup>
							<Input
								name='username'
								type='text'
								onChange={handleUserIdInput}
								placeholder='User ID'></Input>
						</FormGroup>
						<FormGroup>
							<Input
								name='password'
								type='text'
								onChange={handlePasswordInput}
								placeholder='Password'></Input>
						</FormGroup>
						<Button block className='purpleButton' type='submit'>
							Login
						</Button>
					</Form>
				</Jumbotron>
			</div>

		</div>
	);
}

export default Login;

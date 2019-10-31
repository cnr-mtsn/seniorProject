import React from "react";
import Header from "./Header";
import {
	Button,
	Input,
	Container,
	Row,
	Col,
	Jumbotron,
	Form,
	FormGroup
} from "reactstrap";
import "./App.css";

//Login function
function Login(props) {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Header title='Login' />
				</Col>
			</Row>
			<Row>
				<Col></Col>
				<Col xs={3}>
					<Jumbotron className='loginJumbo'>
						<Form>
							<FormGroup>
								<Input
									name='username'
									type='text'
									placeholder='User ID'></Input>
							</FormGroup>
							<FormGroup>
								<Input
									name='password'
									type='text'
									placeholder='Password'></Input>
							</FormGroup>
							<Button
								block
								className='purpleButton'
								type='submit'
								onClick={Login}>
								Login
							</Button>
						</Form>
					</Jumbotron>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}

export default Login;

import React from "react";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./App.css";

function NavigationBar() {
	const homeLink = (
		<Link to='/home'>
			{" "}
			<Button className='purpleButton'>Home</Button>
		</Link>
	);
	const loginLink = (
		<Link to='/login'>
			<Button className='purpleButton'>Login</Button>
		</Link>
	);
	const orderFormLink = (
		<Link to='/orderForm'>
			<Button className='purpleButton'>Order Form</Button>
		</Link>
	);
	const adminLink = (
		<Link to='/admin'>
			<Button className='purpleButton'>Admin</Button>
		</Link>
	);
	

	return (
		<Row style={{ marginTop: "2vh" }}>
			<Col sm={3}>{homeLink}</Col>
			<Col sm={3}>{loginLink}</Col>
			<Col sm={3}>{adminLink}</Col>
			<Col sm={3}>{orderFormLink}</Col>
		</Row>
	);
}

export default NavigationBar;

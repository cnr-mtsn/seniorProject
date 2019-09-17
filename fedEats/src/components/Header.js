import React from "react";
import fedEatsLogo from '../media/fedEatsLogo.jpeg';
import ckLogo from "../media/companyKitchenLogo.jpeg";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import '../css/header.css';

function Header(props) {
	
	return (
		<Container>
			<Row className="mainHeader">
				<Col className='align-self-center' xl={4} lg={4} md={4} sm={4} xs={4}>
					<Image className= "fedEatsLogo" src={fedEatsLogo} alt='fedEats' rounded />
				</Col>
				<Col xl={4} lg={4} md={4} sm={4} xs={4} className='align-self-center'>
					<h6 className="formTitle">{props.cuisine}</h6>
				</Col>
				<Col className='align-self-center' xl={4} lg={4} md={4} sm={4} xs={4}>
					<img className="ckLogo" src={ckLogo} alt='CompanyKitchen' />
				</Col>
			</Row>
		</Container>
	);
}
export default Header;
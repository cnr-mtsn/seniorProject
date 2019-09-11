import React from "react";
import fedEatsLogo from "./fedEatsLogo.jpeg";
import ckLogo from "./companyKitchenLogo.jpeg";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";

function Header() {
	const fedEatsLogoStyle = {
		height: '7vw',
		width: '14vw',
		float: "left",
		padding: '1vw'
	};
	const ckLogoStyle = {
        height: "7vw",
        width:  "7vw",
		float: 'right',
		padding: '.3vw'
	};
	const headerStyle = {
        backgroundColor: "#4e267c",
        height: '7vw'
	};
	const titleStyle = {
		color: "white",
        fontSize: "2.5vw",
		textAlign: "center"
	};

	return (
		<Container>
			<Row style={headerStyle}>
				<Col className='align-self-center' xl={4} lg={4} md={4} sm={4} xs={4}>
					<Image src={fedEatsLogo} alt='fedEats' style={fedEatsLogoStyle} rounded />
				</Col>
				<Col xl={4} lg={4} md={4} sm={4} xs={4} className='align-self-center'>
					<h6 style={titleStyle}>Deli Order Form</h6>
				</Col>
				<Col className='align-self-center' xl={4} lg={4} md={4} sm={4} xs={4}>
					<img src={ckLogo} alt='CompanyKitchen' style={ckLogoStyle} />
				</Col>
			</Row>
		</Container>
	);
}
export default Header;

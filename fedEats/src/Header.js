import React from "react";
import fedEatsLogo from "./fedEatsLogo.jpeg";
import ckLogo from "./companyKitchenLogo.jpeg";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";

function Header() {
	const logoStyle = {
		height: '12vw',
		width: '20vw',
        float: "left",
        padding: '1vw'
	};
	const ckLogoStyle = {
        height: "13vw",
        width:  "13vw",
        float: 'right',
        padding: '1vw'
	};
	const headerStyle = {
        backgroundColor: "#4e267c",
        height: '15vw'
	};
	const titleStyle = {
		color: "white",
        fontSize: "6vw",
		textAlign: "center"
	};

	return (
		<Container fluid>
			<Row style={headerStyle}>
				<Col className='align-self-center' xl={2} lg={2} md={2} sm={2} xs={3}>
					<Image src={fedEatsLogo} alt='fedEats' style={logoStyle} rounded />
				</Col>
				<Col xl={8} lg={8} md={8} sm={8} xs={6} className='align-self-center'>
					<h6 style={titleStyle}>Deli Order Form</h6>
				</Col>
				<Col className='align-self-center' xl={2} lg={2} md={2} sm={2} xs={3}>
					<img src={ckLogo} alt='CompanyKitchen' style={ckLogoStyle} />
				</Col>
			</Row>
		</Container>
	);
}
export default Header;

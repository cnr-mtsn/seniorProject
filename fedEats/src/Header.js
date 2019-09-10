import React from "react";
import "./Header.css";
import fedEatsLogo from "./fedEatsLogo.jpeg";
import ckLogo from "./companyKitchenLogo.jpeg";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";

function Header() {
	const logoStyle = {
        minHeight: "60px",
        minWidth:  "100px",
		maxWidth: "15vw",
        float: "left",
        padding: '4px'
	};
	const ckLogoStyle = {
        minHeight: "80px",
        minWidth:  "80px",
		maxHeight: "10vw",
		maxWidth: "6vw",
        float: 'right',
        padding: '4px'
	};
	const headerStyle = {
        backgroundColor: "#4e267c",
        minHeight: '70px'
	};
	const titleStyle = {
		color: "white",
        fontSize: "52px",
		textAlign: "center"
	};

	return (
		<Container>
			<Row style={headerStyle}>
                <Col className='align-self-center'
                    xl={2} lg={2} md={2} sm={3} xs={3}
				>
					<Image src={fedEatsLogo} alt='fedEats' style={logoStyle} rounded/>
				</Col>
				<Col
				    xl={8} lg={8} md={8} sm={6} xs={6}
					className='align-self-center'
				>
					<h1 style={titleStyle}>Deli Order Form</h1>
				</Col>
				<Col className='align-self-center'
					xl={2} lg={2} md={2} sm={3} xs={3}					
				>
					<img src={ckLogo} alt='CompanyKitchen' style={ckLogoStyle} />
				</Col>
			</Row>
		</Container>
	);
}
export default Header;

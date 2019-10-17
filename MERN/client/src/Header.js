import React from "react";
import fedEatsLogo from "./media/fedEatsLogo.jpeg";
import ckLogo from "./media/companyKitchenLogo.jpeg";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";

function Header(props) {
	const logo1 = ( <Image className='fedEatsLogo' src={fedEatsLogo} alt='fedEats' rounded /> );
	const title = <h6 className='mainHeaderText'>{props.title}</h6>;
	const logo2 = <Image className='ckLogo d-none d-sm-block' src={ckLogo} alt='CompanyKitchen' />;

	return (
		<Container>
			<Row className='mainHeader'>
				<Col className="d-none d-sm-block">{logo1}</Col>
				<Col md={5}>{title}</Col>
				<Col className="d-none d-sm-block">{logo2}</Col>
			</Row>
		</Container>
	);
}

export default Header;

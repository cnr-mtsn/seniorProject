import React from "react";
import Header from "./Header";
import SpecialsSlideshow from "./SpecialsSlideshow";

import { Jumbotron, Container, Row, Col } from "reactstrap";

function Home() {
	return (
		<Container fluid>
			<Row>
				<Col>
					<Header title='Fed Eats Home' />
				</Col>
			</Row>
			<Row>
				<Col></Col>
				<Col lg={6}>
					<Jumbotron className='myJumbotron'>
						<SpecialsSlideshow />
					</Jumbotron>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}

export default Home;

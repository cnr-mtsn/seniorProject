import React from "react";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import SpecialsSlideshow from "./SpecialsSlideshow";

import { Jumbotron, Container, Row, Col } from "reactstrap";

function Home() {
	return (
		<Container>
			<Row>
				<Col>
					<Header title='Home' />
				</Col>
			</Row>
			<Row>
				<Col>
					<NavigationBar />
				</Col>
			</Row>
			<Row>
				<Col>
					<Jumbotron className='myJumbotron'>
						<SpecialsSlideshow />
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	);
}

export default Home;

import React from "react";
import {
	Col,
	Row,
	Container,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from "reactstrap";
import pastrami from "../media/pastrami.jpeg";
import '../css/App.css';
import Title from './Title';

function Special() {
	
	return (
		<Container>
			<Row>
				<Col className="subHeader">
					<Title name="Today's Special"></Title>
				</Col>
			</Row>
			<Row>
				<Col xl={6} lg={6} md={6}>
					<Card className="specialCard">
						<CardImg className="specialPic" src={pastrami}/>
						<CardBody>
							<CardTitle className="specialTitle">
								<strong>N.Y. Beef & Pastrami on Rye</strong>
							</CardTitle>
							<CardSubtitle className="specialDescription">
								Corned beef and pastrami sandwich with Swiss and spicy brown
								mustard on marbled rye.
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
				<Col xl={6} lg={6} md={6}>
					<Form className="specialCustomForm">

						<FormText className="specialCustomText" color='muted'>
							Customize the Special Below
						</FormText>

						<FormGroup check>
						 	{/* create an input radio button for each item */}
							<Label check className="specialAddon">
								<Input type='radio'/>
								Spicy Brown Mustard
							</Label>
						</FormGroup>
						
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default Special;
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
import pastrami from "./pastrami.jpeg";

function Special() {
	const headerStyle = {
		height: "4vw",
		backgroundColor: "#78409c",
		color: "white",
		textAlign: "left",
		marginTop: '1vw'
	};
	const titleStyle = {
		fontSize: "1.5vw",
		padding: '1vw',
		fontWeight: '600'
	};
	const specialPicStyle = {
        maxHeight: "300px",
        maxWidth: '500px',
		height: "12vw",
		width: "20vw",
		paddingLeft: "1vw",
		paddingTop: "1vw",
		margin: 'auto',
		borderRadius: '10px',
		
	};
	const ingredientstyle = {
		fontSize: '1vw',
		marginLeft: '10px'
	}
	

	return (
		<Container>
			<Row style={headerStyle}>
				<Col>
					<h3 style={titleStyle}>Today's Special</h3>
				</Col>
			</Row>
			<Row>
				<Col xl={6} lg={6} md={6}>

					<Card style={{ marginTop: "1vw", boxShadow: '0 4px 8px 0 grey, 0 6px 20px 0 grey'}}>
						<CardImg src={pastrami} style={specialPicStyle}/>
						<CardBody>
							<CardTitle style={{ fontStyle: "bold", fontSize: "1.5vw" }}>
								N.Y. Beef & Pastrami on Rye
							</CardTitle>
							<CardSubtitle style={{ fontStyle: "italic", fontSize: "1.1vw" }}>
								Corned beef and pastrami sandwich with Swiss and spicy brown
								mustard on marbled rye.
							</CardSubtitle>
						</CardBody>
					</Card>
				</Col>
				<Col xl={6} lg={6} md={6}>
					<Form style={{ marginTop: "1vw"}}>
						<FormText
							color='muted'
							style={{
								textDecoration: "underline",
								fontWeight: "bold",
								fontSize: "1vw"
							}}
						>
							Customize the Special Below
						</FormText>
						<FormGroup check>
							<Label check style={ingredientstyle}>
								<Input type='radio'/>
								Spicy Brown Mustard
							</Label>
						</FormGroup>

						<FormGroup check>
							<Label check style={ingredientstyle}>
								<Input type='radio'/>
								Swiss Cheese
							</Label>
						</FormGroup>

						<FormGroup check>
							<Label check style={ingredientstyle}>
								<Input type='radio'/>
								Red Onions
							</Label>
						</FormGroup>

						<FormGroup check>
							<Label check style={ingredientstyle}>
								<Input type='radio'/>
								Sprouts
							</Label>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
export default Special;

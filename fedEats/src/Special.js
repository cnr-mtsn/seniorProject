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
	const specialStyle = {
		height: "4vw",
		backgroundColor: "#978EAD",
		color: "white",
		textAlign: "left",
		padding: "1px"
	};
	const headerStyle = {
		fontWeight: "400",
		fontSize: "3vw"
	};
	const specialPicStyle = {
        maxHeight: "300px",
        maxWidth: '500px',
		height: "15vw",
		width: "25vw",
		paddingLeft: "1vw",
		paddingTop: "1vw"
	};
	

	return (
		<Container style={{ marginTop: "1vw" }}>
			<Row style={specialStyle}>
				<Col>
					<h3 style={headerStyle}>Today's Special</h3>
				</Col>
			</Row>
			<Row>
				<Col xl={6} lg={6} md={6} sm={6} xs={6}>

					<Card style={{ marginTop: "1vw", outline: "1px solid red" }}>
						<CardImg src={pastrami} style={specialPicStyle} />
						<CardBody>
							<CardTitle style={{ fontStyle: "bold", fontSize: "3vw" }}>
								N.Y. Beef & Pastrami on Rye
							</CardTitle>
							<CardSubtitle style={{ fontStyle: "italic", fontSize: "2vw" }}>
								Corned beef and pastrami sandwich with Swiss and spicy brown
								mustard on marbled rye.
							</CardSubtitle>
                            <Form style={{marginLeft: '3vw', marginTop: '2vw'}}>
                                <FormGroup>
                                    <Input type="radio" id="specialButton" style={{ height: "2vw" }} ></Input>
                                    <label for="specialButton" style={{fontSize: '2vw'}}>Select "Special Name"</label>
                                 </FormGroup>
                            </Form>

						</CardBody>
					</Card>
				</Col>
				<Col xl={6} lg={6} md={6} sm={6} xs={6}>
					<Form style={{ marginTop: "1vw", outline: "1px solid red" }}>
						<FormText
							color='muted'
							style={{
								textDecoration: "underline",
								fontWeight: "bold",
								fontSize: "2vw"
							}}
						>
							Customize the Special Below
						</FormText>
						<FormGroup check>
							<Label check>
								<Input type='radio' style={{ height: "2vw" }} />
								Spicy Brown Mustard
							</Label>
						</FormGroup>

						<FormGroup check>
							<Label check>
								<Input type='radio' style={{ height: "2vw" }} />
								Swiss Cheese
							</Label>
						</FormGroup>

						<FormGroup check>
							<Label check>
								<Input type='radio' style={{ height: "2vw" }} />
								Red Onions
							</Label>
						</FormGroup>

						<FormGroup check>
							<Label check>
								<Input type='radio' style={{ height: "2vw" }} id='sprouts' />
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

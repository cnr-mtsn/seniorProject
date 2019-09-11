import React from "react";
import {
	Col,
	Row,
	Container
} from "reactstrap";

function Items() {
    
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
	}
    return (
        <Container>
            <Row>
                <Col style={headerStyle}>
					<h3 style={titleStyle}>Base</h3>
				</Col>
				<Col xl={1} lg={1} md={1}></Col>
				<Col style={headerStyle}>
					<h3 style={titleStyle}>Main</h3>
				</Col>
            </Row>

            <Row>
                <Col style={headerStyle}>
					<h3 style={titleStyle}>Cheese</h3>
				</Col>
				<Col xl={1} lg={1} md={1}></Col>
				<Col style={headerStyle}>
					<h3 style={titleStyle}>Veggies</h3>
				</Col>
            </Row>

            <Row>
                <Col style={headerStyle}>
					<h3 style={titleStyle}>Condiments</h3>
				</Col>
				<Col xl={1} lg={1} md={1}></Col>
				<Col style={headerStyle}>
					<h3 style={titleStyle}>Extras</h3>
				</Col>
            </Row>

        </Container>
    );
}

export default Items;
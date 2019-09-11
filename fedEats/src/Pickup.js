import React from 'react'
import {
	Col,
	Row,
	Container,
} from "reactstrap";

function Pickup() {

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
                    <h3 style={titleStyle}>Select Pick-up Time</h3>
                </Col>
            </Row>
        </Container>


    );
}

export default Pickup;
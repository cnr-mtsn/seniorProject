import React from "react";
import {
	Col,
	Row,
	Container,
	Input
} from "reactstrap";

function Comments() {

    const headerStyle = {
		height: "4vw",
		backgroundColor: '#78409c',
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
                    <h3 style={titleStyle}>Comments</h3>
                </Col>
            </Row>
			<Row style={{marginTop: '1vw'}}>
                <Col>
                    <Input type="textarea"/>
                </Col>
            </Row>
        </Container>


    );
}

export default Comments;
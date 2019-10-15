import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import './App.css';

function ItemHeader(props) {

    return (
        <Container>
            <Row>
                <Col>
                    <h6 className="formTitle">{props.title}</h6>
                </Col>
            </Row>
        </Container>
    );
}

export default ItemHeader;
import React from 'react'
import {
    Col, 
    Row, 
    Container, 
    Image, 
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import pastrami from './pastrami.jpeg';

function Special() {
    
    const specialStyle = {
        height: '50px', 
        backgroundColor: '#978EAD',
        color: 'white',
        textAlign: 'left',
        padding: '3px'
    };
    const headerStyle = {
        fontWeight: '400'
    };
    const specialPicStyle = {
        minHeight: '100px',
        minWidth: '150px',
        maxHeight: '200px',
        maxWidth: '400px'
    };

    return (
        <Container style={{marginTop: '10px'}}>
            <Row style={specialStyle}>
                <Col>
                    <h3 style={headerStyle}>Today's Special</h3>
                </Col>
            </Row>
            <Row>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Card>
                        <CardImg src={pastrami} style={specialPicStyle} />
                        <CardBody>
                            <CardTitle style={{fontStyle: 'bold', fontSize: '3vw'}}>N.Y. Beef & Pastrami on Rye</CardTitle>
                            <CardSubtitle style={{fontStyle: 'italic', fontSize: '1.5vw'}}>Corned beef and pastrami sandwich with Swiss and spicy brown mustard on marbled rye.</CardSubtitle>
                            <CardText></CardText>
                            <Button className="button-primary">Order</Button>
                        </CardBody>
                    
                    </Card>        
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                       
                </Col>
            </Row>
        </Container>
    );
}

export default Special;
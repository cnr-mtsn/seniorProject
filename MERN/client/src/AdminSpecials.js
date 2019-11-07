import React, { useState, useEffect } from "react";
import {
	Table,
	Button,
	Input,
	Row,
	Col,
	InputGroup,
	InputGroupAddon
} from "reactstrap";
import "./App.css";


const AdminSpecials = () => {

    const[specials, setSpecials] = useState([]);

    useEffect(() => {
        getSpecials();
    }, []);

    const getSpecials = async () => {
        fetch(`http://localhost:5000/specials`).then(response => response.json()).then(response => setSpecials(response.data)).catch(err => console.error(err))
    };

    const renderSpecials = (special) => {
        const fixedPrice = '$' + special.price.toFixed(2);
        
        return (
            <tr key={special.main_id}>
                <td>
                    <Input
                        placeholder={special.name}
                        className='manageItemPrice'></Input>
                </td>
                <td>
                    <Input
                        placeholder={fixedPrice}
                        className='manageItemPrice'></Input>
                </td>
                <td>
                    <Input
                        placeholder={special.health_points}
                        className="manageItemPrice"></Input>
                </td>
                <td>
                    <Input
                        placeholder={special.description}
                        className="manageItemPrice"></Input>
                </td>
            </tr>
        );
    };
       
    return (
        <div className='items'>
            <Row>
                <Col>
                    <Table className='itemTable itemDetailsTable bg-dark' striped>
                        <thead>
                            <tr className='manageItemHeader'>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Price</td>
                                <td>Health Points</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>{specials.map(renderSpecials)}</tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
}

export default AdminSpecials;
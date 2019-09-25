import React from "react";
import fedEatsLogo from '../media/fedEatsLogo.jpeg';
import ckLogo from "../media/companyKitchenLogo.jpeg";
import { Container, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import '../css/header.css';

class Header extends React.Component {

	state = {
		date: null
	};
	
    componentDidMount() {
        //call fetch function once component mounts
        this.getDate().then(res => this.setState({date: res.express })).catch(err => console.log(err));
	}
	// 	DONT USE COMPONENT_DID_UPDATE WITH THE DATE
	// 			BECAUSE IT CONSTANTLY RE-RENDERS -- lol, noted
	// componentDidUpdate() {
    //     //call fetch function once component updates
    //     this.callBackendAPI().then(res => this.setState({data: res.express })).catch(err => console.log(err));
    // }

    //fetches GET route from Express server
    getDate = async () => {
        const response = await fetch('/getDate');
        const body = await response.json();

        if(response.status !== 200) {
            throw Error(body.message);
        }
        return body;
	};	
	
	
	render() {

		return (
			<Container>
				<Row className="mainHeader">
					
					<Col className='align-self-center' xl={4} lg={4} md={4} sm={4} xs={4}>
						<Image className= "fedEatsLogo" src={fedEatsLogo} alt='fedEats' rounded />
					</Col>

					<Col xl={4} lg={4} md={4} sm={4} xs={4} className='align-self-center'>
						{/* DISPLAY STATE DATA FROM EXPRESS BACKEND */}
						<h6 className="formTitle">{this.state.date}</h6>
					</Col>

					<Col className='align-self-center' xl={4} lg={4} md={4} sm={4} xs={4}>
						<img className="ckLogo" src={ckLogo} alt='CompanyKitchen' />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Header;
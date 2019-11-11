import React, { useState, useEffect } from "react";
import {
	Table,
	Input,
	Row,
    Col,
    Card,
    CardTitle,
    CardSubtitle,
    CardBody,
    CardImg,
    CardText, 
    CardFooter,
    Button
} from "reactstrap";
import ItemsCarousel from 'react-items-carousel';
import pastrami from './media/pastrami.png';
import "./App.css";


const AdminSpecials = () => {

    const[specials, setSpecials] = useState([]);
    const[activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        getSpecials();
    }, []);

    const getSpecials = async () => {
        fetch(`http://localhost:5000/specials`).then(response => response.json()).then(response => setSpecials(response.data)).catch(err => console.error(err))
    };
    const openModal = () => {
        console.log('opened modal');
    }

   const renderCards = (special) => {
       const fixedPrice = `$${special.price.toFixed(2)}`;
        return (
			<div key={special.main_id} style={{height: "200"}}>
				<Card>
					<CardImg top width='100%' src={pastrami} alt={special.name} />
					<CardBody>
						<CardTitle style={{ fontSize: "32px" }}>
							{special.name}
						</CardTitle>
						<CardSubtitle style={{ fontSize: "24px" }}>
							{fixedPrice}
						</CardSubtitle>
						<CardText style={{ fontSize: "20px" }}>
							{special.description}
						</CardText>
						<CardText
							style={{ color: "blue", textDecoration: "underline" }}>
							<span onClick={openModal}>edit</span>
						</CardText>
					</CardBody>
				</Card>
			</div>
		);
   };
       
    return (
			<div style={{backgroundColor:'rgb(222,200,247)', padding:'30px'}}>
				<div style={{ width: "600px", margin:'auto', height:'800', borderRadius:'3px' }}>
					<ItemsCarousel
						infiniteLoop={true}
						activePosition={"center"}
						chevronWidth={40}
						disableSwipe={true}
						alwaysShowChevrons={false}
						numberOfCards={1}
						slidesToScroll={1}
						outsideChevron={true}
						activeItemIndex={activeIndex}
						requestToChangeActive={value => setActiveIndex(value)}
						rightChevron={">"}
						leftChevron={"<"}>
						{specials.map(renderCards)}
					</ItemsCarousel>
				</div>
			</div>
		);
}

export default AdminSpecials;
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Label,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardImg,
  CardText,
  CardFooter,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ItemsCarousel from "react-items-carousel";
import pastrami from "./media/pastrami.png";
import shrimpWrap from './media/shrimpWrap.png';
import chickenBR from './media/chickenBaconRanch.png';
import roastBeef from './media/roastBeef.png';
import southwestCW from './media/southwestChickenWrap.png';
import "./App.css";

const AdminSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [updateSpecialModal, setUpdateSpecialModal] = useState(false);
  const [newName, setNewName] = useState();
  const [newHP, setNewHP] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newDesc, setNewDesc] = useState();

  useEffect(() => {
    getSpecials();
  }, []);

  const getSpecials = async () => {
    fetch(`http://localhost:5000/specials`)
      .then(response => response.json())
      .then(response => setSpecials(response.data))
      .catch(err => console.error(err));
  };

  const toggleSpecialModal = () => setUpdateSpecialModal(!updateSpecialModal);

  const clearNewItem = () => {
	  setNewName();
	  setNewHP();
	  setNewPrice();
	  setNewDesc();
  }

  const renderCards = (special) => {
	const fixedPrice = `$${special.price.toFixed(2)}`;

	const updateSpecial = async () => {
		fetch(`http://localhost:5000/specials/update?name=${special.name}&newName=${newName}&price=${newPrice}&description=${newDesc}&healthPoints=${newHP}`)
		.then(getSpecials)
		.then(console.log(`updated: ${special.name}`))
		.catch(err => console.error(err))
	};

	const handleSpecialUpdate = () => {
		updateSpecial();
		toggleSpecialModal();
		console.log(`edited ${special.name}`);
		clearNewItem();
	};

    return (

      <div key={special.main_id} style={{ height: "200" }}>
        <Card>
          <CardImg top width="100%" src={shrimpWrap} alt={special.name} />
          <CardBody>
            <CardTitle style={{ fontSize: "32px" }}>{special.name}</CardTitle>
            <CardSubtitle style={{ fontSize: "24px" }}>
              {fixedPrice}
            </CardSubtitle>
            <CardText style={{ marginTop: "1vh", fontSize: "20px" }}>
              {special.description}
            </CardText>
            <CardText>Health Points: {special.health_points}</CardText>
          </CardBody>
          <CardFooter>
            <span
              style={{ fontSize: "20px", color: "blue", cursor: "pointer" }}
              onClick={toggleSpecialModal}
            >
              edit
            </span>
          </CardFooter>
        </Card>
        <Modal
          className="orderModal"
          isOpen={updateSpecialModal}
          toggle={toggleSpecialModal}
        >
          <div className="modalDark">
            <ModalHeader toggle={toggleSpecialModal}>Update Item</ModalHeader>
            <ModalBody>
              <div>
                <Row>
                  <Col>
                    <Label for="special.name">Name</Label>
                    <Input
                      name="special.name"
                      placeholder={special.name}
                      onChange={e => {
                        setNewName(e.target.value);
                      }}
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="specialPrice">Price</Label>
                    <Input
                      name="specialPrice"
                      placeholder={fixedPrice}
                      onChange={e => {
                        setNewPrice(e.target.value);
                      }}
                    ></Input>
                  </Col>
                  <Col>
                    <Label for="specialHP">H.P.</Label>
                    <Input
                      name="specialHP"
                      placeholder={special.health_points}
                      onChange={e => {
                        setNewHP(e.target.value);
                      }}
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="specialDesc">Description</Label>
                    <Input
                      type="textarea"
                      overflow="hidden"
                      name="specialDesc"
                      placeholder={special.description}
                      onChange={e => {
                        setNewDesc(e.target.value);
                      }}
                    ></Input>
                  </Col>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                value="Update"
                onClick={handleSpecialUpdate}
              >
                Apply Changes
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "rgb(222,200,247)", padding: "30px" }}>
      <div
        style={{
          width: "600px",
          margin: "auto",
          height: "800",
          borderRadius: "3px"
        }}
      >
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
          leftChevron={"<"}
        >
          {specials.map(renderCards)}
        </ItemsCarousel>
      </div>
    </div>
  );
};

export default AdminSpecials;

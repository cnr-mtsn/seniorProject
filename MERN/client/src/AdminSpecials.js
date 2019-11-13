import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
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
import chickenBaconRanch from "./media/chickenBaconRanch.png";
import shrimpWrap from "./media/shrimpWrap.png";
import southwestWrap from "./media/southwestChickenWrap.png";
import roastBeef from "./media/roastBeef.png";
import "./App.css";

const AdminSpecials = () => {
  const [specials, setSpecials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
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
		console.log(`edited ${special.name}`);
		clearNewItem();
	};

    return (
      <div key={special.main_id} style={{ height: "200" }}>
        <Card>
          <CardImg top width="100%" src={chickenBaconRanch} alt={special.name} />
          <CardBody>
            <Row>
              <Col>
                <InputGroup>
                  <InputGroupAddon
                    className="specialUpdateAddon"
                    type="prepend"
                  >
                    Name
                  </InputGroupAddon>
                  <Input
                    name="special.name"
                    placeholder={special.name}
                    onChange={e => {
                      setNewName(e.target.value);
                    }}
                  ></Input>
                </InputGroup>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <InputGroup>
                  <InputGroupAddon
                    className="specialUpdateAddon"
                    type="prepend"
                  >
                    Price
                  </InputGroupAddon>
                  <Input
                    name="specialPrice"
                    placeholder={fixedPrice}
                    onChange={e => {
                      setNewPrice(e.target.value);
                    }}
                  ></Input>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupAddon
                    className="specialUpdateAddon"
                    type="prepend"
                  >
                    H.P.
                  </InputGroupAddon>
                  <Input
                    name="specialHP"
                    placeholder={special.health_points}
                    onChange={e => {
                      setNewHP(e.target.value);
                    }}
                  ></Input>
                </InputGroup>
              </Col>
            </Row>
			<br></br>
            <Row>
              <Col>
                <Input
                  style={{ marginTop: "-8px" }}
                  type="textarea"
                  overflow="hidden"
                  name="specialDesc"
                  placeholder={special.description}
                  onChange={e => {
                    setNewDesc(e.target.value);
                  }}
                >{special.description}</Input>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              value="Update"
              onClick={handleSpecialUpdate}
            >
              Apply Changes
            </Button>
          </CardFooter>
        </Card>
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

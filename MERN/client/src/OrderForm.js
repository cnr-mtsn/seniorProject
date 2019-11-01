import React, {useState, useEffect} from "react";
import "./App.css";
import Header from "./Header";
import { FaPlus, FaTimes } from "react-icons/fa";
import { 
	Card, 
	CardBody, 
	CardTitle,  
	CardSubtitle,
	Button, 
	Jumbotron, 
	Container, 
	Row, 
	Col, 
	Form, 
	Table,
	Input,
	Modal, 
	ModalBody, 
	ModalHeader, 
	ModalFooter,
	ButtonGroup, 
	ButtonDropdown, 
	DropdownItem,
	DropdownMenu,
	DropdownToggle
} from "reactstrap";

function OrderForm(props) {

	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [category, setCategory] = useState('');
	const [total, setTotal] = useState(0);
	const [times, setTimes] = useState([]);
	const [pickupTime, setPickupTime] = useState(); 
	const [comments, setComments] = useState();
	const [dropdownOpen, setOpen] = useState(false);
	const [userId, setUserId] = useState();
	const [modal, setModal] = useState(false);
	const [thanks, setThanks] = useState(false);

	useEffect(() => {
		getTimes(); 
	}, []);
	const toggleDropdown = () => setOpen(!dropdownOpen);
	const toggleModal = () => setModal(!modal);
	const toggleThanks = () => setThanks(!thanks);

	const handleCategorySelection = (selection) => {
		fetch(`http://localhost:5000/${selection}`)
		.then(response => response.json())
		.then(response => setItems(response.data))
		.then(setCategory(selection))
		.then(console.log("selected " + category))
	};
	const handleCommentsInput = (e) => {
		setComments(e.target.value);
		console.log(comments);
	}

	const handleTimeSelection = (e) => {
		setPickupTime(e.target.value);
		console.log(pickupTime);
	}
	const handleUserIdInput = (e) => {
		setUserId(e.target.value);
	}
	
	const handleClearOrderClick = () => {
		setOrder([]);
		setTotal(0);
	}

	const handleOrderSubmit = () => {
		if(order.length < 2) {
			console.log("Create Order First");
		} else {
			submitOrder();
		}
	}
	const submitOrder = async () => {
		fetch(`http://localhost:5000/newOrder?userId=${userId}&total=${total}`)
		.then(setOrder([]))
		.then(setTotal(0))
		.catch(err => console.log(err))
	};

	const getTimes = async () => {
		fetch(`http://localhost:5000/pickupTimes`)
			.then(response => response.json())
			.then(response => setTimes(response.data))
			.catch(err => console.error(err));
	};
	


	const tableCategorySelect = (
		<div>
			<ButtonGroup>
				<ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
					<DropdownToggle caret>
						Base
					</DropdownToggle>
					<DropdownMenu className="darkGrey">
						<DropdownItem  className="baseDropdown"header>Select One</DropdownItem>
						<DropdownItem 
						 	className="baseDropdown"
							value='bread' 
							onClick={handleCategorySelection.bind(this, 'bread')}
						><span>Bread</span>
						</DropdownItem>
						<DropdownItem
						 	className="baseDropdown"
							value='tortilla' 
							onClick={handleCategorySelection.bind(this, 'tortilla')}
						><span>Tortillas</span>
						</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown> 
				<Button 
				 	className="darkGrey white"
					value='protein' 
					onClick={handleCategorySelection.bind(this, 'protein')}
				>Protein
				</Button>
				<Button 
					className="darkGrey white"
					value='cheese' 
					onClick={handleCategorySelection.bind(this, 'cheese')}
				>Cheese
				</Button>
				<Button 
					className="darkGrey white"
					value='veggie' 
					onClick={handleCategorySelection.bind(this, 'veggie')}
				>Veggies
				</Button>
				<Button 
					className="darkGrey white"
					value='condiment' 
					onClick={handleCategorySelection.bind(this, 'condiment')}
				>Condiments
				</Button>
				<Button 
					className="darkGrey white"
					value='extra' 
					onClick={handleCategorySelection.bind(this, 'extra')}
				>Extras
				</Button>
			</ButtonGroup>
		</div>
	)
	const submitButtonText = (order.length < 1 ? 'Build Order' : 'Submit Order');
	
	const renderItem = (item) => {
		const fixedPrice = '$' + item.price.toFixed(2);
		const buttonId = `add${item.name}`;
		const handleItemClick = (buttonId, disabled) => {
			setOrder(order.concat(item));
			setTotal(total + item.price);
		};
		return (
			<tr key={item.name}>
				<td className="orderItem">
					{item.name}
				</td>
				<td className="orderItem">
					{fixedPrice}
				</td>
				<td className="orderItem">
					{item.health_points}
				</td>
				<td>
					<Button 
						outline 
						id={buttonId}
						color="primary" 
						onClick={handleItemClick} 
						className="orderItemsButton"
					><FaPlus/>
					</Button>
				</td>
			
			</tr>
		)
	}
	const renderOrder = (orderItem) => {
		const fixedPrice = '$' + orderItem.price.toFixed(2);
		const deleteOrderItem = () => { 		
			console.log(`removed ${orderItem.name}`);
		}
		const addOrderItem = () => {
			console.log(`added ${orderItem.name}`);
		}
		return (
			<tr key={orderItem.name}>
				<td>{orderItem.name}</td>
				<td>{fixedPrice}</td>
				<td><Button className="orderItemsButton" outline color="danger" onClick={deleteOrderItem}><FaTimes/></Button></td>
				<td><Button className="orderItemsButton" outline color="primary" onClick={addOrderItem}><FaPlus/></Button></td>
			</tr>
		);
	};
	const renderTimes = time => {
		return (
			<option key={time.time_id}>{time.pickupTime}</option>
		);
	};

	const renderConfirmItems = item => {
		return <li>{item.name}</li>;
	}
	const handlePlaceOrderClick = () => {
		toggleModal();
		setOrder([]);
		setPickupTime();
		setTotal();
		setUserId();
		setComments();
		setInterval(toggleThanks, 1000);
	}
	const handleThanksClick = () => {
		props.history.push('/home');
	}


	return (
		<Container fluid>
			<Row>
				<Col>
					<Header title='Fed Eats Deli Order Form' />
				</Col>
			</Row>
			<Row>
				<Col>
					<Jumbotron className='myJumbotron'>
						<Form>
							<Row>
								<Col>
									{tableCategorySelect}
								</Col>
								<Col>
									<div className="orderItemsDiv">
										<Table className='itemTable bg-dark white' striped>
											<tbody>{items.map(renderItem)}</tbody>
										</Table>
									</div>
								</Col>
							</Row>
						</Form>
					</Jumbotron>
				</Col>
				<Col lg={1}></Col>
				<Col>
				<Jumbotron className="myJumbotron">
					<Card className="orderDetailsCard">
						<CardTitle className="orderDetailsTitle">Order Details</CardTitle>
						<CardBody>
							<div className="orderDetailsBodyDiv">
							<Table className="itemTable orderDetailsTable bg-dark"  striped>
							<tbody className="white">{order.map(renderOrder)}</tbody>
							</Table>
							</div>
						</CardBody>
						<CardSubtitle>
							<Row>
								<Col lg={10}>
									<h5 className="orderTotal">Total: ${total.toFixed(2)}</h5>
								</Col>
							</Row>
						</CardSubtitle>
						<Row>
							<Col lg={1}></Col>
							<Col lg={4}>
								<Input
								placeholder="User ID"
								onChange={handleUserIdInput}
								>
								</Input>
							</Col>
							<Col lg={2}></Col>
							<Col lg={4}>
								<Input type='select' onChange={handleTimeSelection}>
								{times.map(renderTimes)}
								<option disabled defaultValue='Pickup Time'></option>
								</Input>
							</Col>
							<Col lg={1}></Col>
						</Row>
						<br></br>
						<Row>
							<Col></Col>
							<Col lg={10}>
								<Input
									type='textarea'
									placeholder='Special instructions for the kitchen...'
									onChange={handleCommentsInput}
								/>
							</Col>
							<Col></Col>
						</Row>
						<br></br>
						<Button
							type="button"
							outline
							color="danger"
							onClick={handleClearOrderClick}
							style={{width:'40%', margin:'auto'}}
							>Clear Order
						</Button>
						<Button 
							type="button"
							outline
							color="primary"
							onClick={toggleModal}
							style={{width:'40%', margin:'auto'}}
							>{submitButtonText}
						</Button>
						<br></br>
					</Card>
					</Jumbotron>
				</Col>
			</Row>
			<Modal className="orderModal" isOpen={modal} toggle={toggleModal}>
				<ModalHeader toggle={toggleModal}>Order Confirmation</ModalHeader>
				<ModalBody>
					<ul style={{marginLeft:'0'}}>{order.map(renderConfirmItems)}</ul>	
					<h4>User ID: {userId}</h4>
					<h4>Pickup Time: {pickupTime}</h4>
					<h4>Total: ${total.toFixed(2)}</h4>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handlePlaceOrderClick}>Place Order</Button>
				</ModalFooter>
			</Modal>
			<Modal className="orderModal" isOpen={thanks} toggle={toggleThanks}>
				<ModalHeader toggle={toggleThanks}>Thank You!</ModalHeader>
				<ModalBody>Thanks for skipping the line and placing your order online!</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleThanksClick}>Close</Button>
				</ModalFooter>
			</Modal>
		</Container>
	);
}

export default OrderForm;

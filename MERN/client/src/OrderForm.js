import React, {useState, useEffect} from "react";
import NavigationBar from "./NavigationBar";
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
	ButtonGroup, 
	ButtonDropdown, 
	DropdownItem,
	DropdownMenu,
	DropdownToggle
} from "reactstrap";

function OrderForm() {

	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [category, setCategory] = useState('');
	const [total, setTotal] = useState(0);
	const [times, setTimes] = useState([]);
	const [pickupTime, setPickupTime] = useState();
	const [comments, setComments] = useState();
	const [dropdownOpen, setOpen] = useState(false);
	

	useEffect(() => {
		getTimes(); 
	});
	const toggleDropdown = () => setOpen(!dropdownOpen);

	const handleCategorySelection = (selection) => {
		fetch(`http://localhost:5000/${selection}`)
		.then(response => response.json())
		.then(response => setItems(response.data))
		.then(setCategory(selection))
		.then(console.log("selected " + category))
	};
	const handleCommentsInput = (e) => {
		setComments(e.target.value);
	}

	const handleTimeSelection = (e) => {
		setPickupTime(e.target.value);
	}
	
	const deleteOrderItem = (item) => {
		/* if(order contains item.name) {
				delete first instance of item
			}
		*/
		for(var orderItem in order) {
			if(item === orderItem) {
				var index = order.indexOf(orderItem);
				console.log(`order[${index}]: ${order[index]}`);
				setOrder(order.splice(index, 1));
				console.log(order[index]);
				console.log(`deleted ${item.name}`);
			}
		}
	}
	const addOrderItem = (item) => {
		/*
		if(order contains item.name) {
			update/display multiplier badge
			total += item.price
		}
		*/
		for(var orderItem in order) {
			if(item === orderItem) {
				setTotal(total + item.price);
				console.log(`added extra ${item.name}`);
			}
		}
	}
	const handleClearOrderClick = () => {
		setOrder([]);
		setTotal(0);
	}

	const handleOrderSubmit = () => {
		if(order.length < 2) {
			console.log("Create Order First");
		} else {
			console.log("order submitted")
			order.map((item) => console.log(item.name));
			console.log(pickupTime);
			console.log(comments);
			console.log("$" + total.toFixed(2));
		}
	}

	const getTimes = async () => {
		fetch(`http://localhost:5000/pickupTimes`)
			.then(response => response.json())
			.then(response => setTimes(response.data))
			.catch(err => console.error(err));
	};

	const tableCategorySelect = (
		<div>
			<ButtonGroup>
				<ButtonDropdown className="darkGrey white" isOpen={dropdownOpen} toggle={toggleDropdown}>
					<DropdownToggle caret>
						Base
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem header>Select One</DropdownItem>
						<DropdownItem 
							value='bread' 
							onClick={handleCategorySelection.bind(this, 'bread')}
						>Bread
						</DropdownItem>
						<DropdownItem
							value='tortilla' 
							onClick={handleCategorySelection.bind(this, 'tortilla')}
						>Tortillas
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
		return (
			<tr key={orderItem.name}>
				<td>{orderItem.name}</td>
				<td>{fixedPrice}</td>
				<td><Button className="orderItemsButton" outline color="danger" onClick={deleteOrderItem}><FaTimes/></Button></td>
				<td><Button className="orderItemsButton" outline color="info" onClick={addOrderItem}><FaPlus/></Button></td>
			</tr>
		);
	};
	const renderTimes = time => {
		
		return (
			<option key={time.time_id}>{time.pickupTime}</option>
		);
	};
	return (
		<Container>
			<Row>
				<Col>
					<Header title='Order Form' />
				</Col>
			</Row>
			<Row>
				<Col>
					<NavigationBar />
				</Col>
			</Row>
			<Row>
				<Col>
					<Jumbotron className='myJumbotron'>
						<Form>
							<Row>
								<Col>
									{tableCategorySelect}
									<div className="orderItemsDiv">
										<Table className='itemTable bg-dark white' striped>
											<tbody>{items.map(renderItem)}</tbody>
										</Table>
									</div>
								</Col>

								<Col>
									<Card className="orderDetailsCard">
										<CardTitle className="orderDetailsTitle">Order Details</CardTitle>
										<CardBody>
											<div className="orderDetailsBodyDiv">
											<Table className="itemTable orderDetailsTable bg-dark"  striped>
											<tbody>{order.map(renderOrder)}</tbody>
											</Table>
											</div>
										</CardBody>
										<CardSubtitle><h5>Total: ${total.toFixed(2)}</h5></CardSubtitle>
											<br></br>
											<Input type='select' onChange={handleTimeSelection}>
												{times.map(renderTimes)}
												<option disabled defaultValue='Pickup Time'></option>
											</Input>
											<br></br>
											<Input
												type='textarea'
												placeholder='Special instructions for the kitchen...'
												onChange={handleCommentsInput}
											/>
											<br></br>
										<Button
											type="button"
											outline
											color="danger"
											onClick={handleClearOrderClick}
											>Clear Order</Button>
										<Button 
											type="button"
											outline
											color="primary"
											onClick={handleOrderSubmit}
										>{submitButtonText}</Button>
									</Card>
								</Col>
							</Row>
						</Form>
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	);
}

export default OrderForm;

import React, {useState, useEffect} from "react";
import NavigationBar from "./NavigationBar";
import "./App.css";
import Header from "./Header";
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
		.then(console.log("selected " + selection))
	};
	const handleCommentsInput = (e) => {
		setComments(e.target.value);
	}

	const handleTimeSelection = (e) => {
		setPickupTime(e.target.value);
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

	var tableCategorySelect = (
		<div>
			<ButtonGroup>
				<ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
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
					value='protein' 
					onClick={handleCategorySelection.bind(this, 'protein')}
					>Protein
				</Button>
				<Button 
					value='cheese' 
					onClick={handleCategorySelection.bind(this, 'cheese')}
					>Cheese
				</Button>
				<Button 
					value='veggie' 
					onClick={handleCategorySelection.bind(this, 'veggie')}
					>Veggies
				</Button>
				<Button 
					value='condiment' 
					onClick={handleCategorySelection.bind(this, 'condiment')}
					>Condiments
				</Button>
				<Button 
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
		const handleItemClick = () => {
			setOrder(order.concat(item));
			setTotal(total + item.price);
		}
		return (
			<tr key={item.name} style={{backgroundColor:'#EBDFB5'}}>
				<td style={{fontSize:'3vh', textAlign:'left'}}>
					{item.name}
				</td>
				<td>
					{fixedPrice}
				</td>
				<td>
					<Button outline color="primary" onClick={handleItemClick} style={{width:'100%'}}>Add</Button>
				</td>
				<td>
					<Button outline color="danger" onClick={handleItemClick} style={{width:'100%'}}>Remove</Button>
				</td>
			</tr>
		)
	}
	const renderOrder = (orderItem) => {
		const fixedPrice = '$' + orderItem.price.toFixed(2);
		return (
			<li key={orderItem.name}>{orderItem.name} - {fixedPrice}</li>
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
									<Table className='itemTable bg-light' striped>
										<tbody>{items.map(renderItem)}</tbody>
									</Table>
								</Col>

								<Col>
									<Card style={{ minHeight: "500px" }}>
										<CardBody>
											<CardTitle>Order Details</CardTitle>
											<ul>{order.map(renderOrder)}</ul>
											<CardSubtitle>Total: ${total.toFixed(2)}</CardSubtitle>
											<Input type='select' onChange={handleTimeSelection}>
												{times.map(renderTimes)}
												<option disabled defaultValue='Pickup Time'></option>
											</Input>
											<Input
												type='textarea'
												placeholder='Special instructions for the kitchen...'
												onChange={handleCommentsInput}
											/>
										</CardBody>
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

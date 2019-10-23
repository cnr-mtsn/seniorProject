import React, {useState, useEffect} from "react";
import { Input } from 'reactstrap';
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
} from "reactstrap";

function OrderForm() {

	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [category, setCategory] = useState('');
	const [total, setTotal] = useState(0);
	const [times, setTimes] = useState([]);
	const [pickupTime, setPickupTime] = useState();
	const [comments, setComments] = useState();

	useEffect(() => {
		getTimes(); //eslint-disable-next-line
	}, []);

	const handleCategorySelection = (selection) => {
		fetch(`http://localhost:5000/${selection}`)
		.then(response => response.json())
		.then(response => setItems(response.data))
		.then(setCategory(selection))
		.then(console.log("selected"))
	};
	const handleCommentsInput = (e) => {
		setComments(e.target.value);
	}

	const handleTimeSelection = (e) => {
		setPickupTime(e.target.value);
	}

	const handleOrderSubmit = () => {
		console.log("order submitted")
		order.map((item) => console.log(item.name));
		console.log(pickupTime);
		console.log(comments);
		console.log("$" + total.toFixed(2));
	}

	const getTimes = async () => {
		fetch(`http://localhost:5000/pickupTimes`)
			.then(response => response.json())
			.then(response => setTimes(response.data))
			.catch(err => console.error(err));
	};

	const selectCategory = (
		<ul className="adminSelectCategory list-group">
		  <li className="list-group-item list-group-item-action" value='bread' onClick={handleCategorySelection.bind(this, 'bread')}>Bread</li>
		  <li className="list-group-item list-group-item-action" value='tortilla' onClick={handleCategorySelection.bind(this, 'tortilla')}>Tortillas</li>
		  <li className="list-group-item list-group-item-action" value='protein' onClick={handleCategorySelection.bind(this, 'protein')}>Protein</li>
		  <li className="list-group-item list-group-item-action" value='cheese' onClick={handleCategorySelection.bind(this, 'cheese')}>Cheese</li>
		  <li className="list-group-item list-group-item-action" value='veggie' onClick={handleCategorySelection.bind(this, 'veggie')}>Veggies</li>
		  <li className="list-group-item list-group-item-action" value='condiment' onClick={handleCategorySelection.bind(this, 'condiment')}>Condiments</li>
		  <li className="list-group-item list-group-item-action" value='extra' onClick={handleCategorySelection.bind(this, 'extra')}>Extras</li>
		</ul>
	  );
	 
	const categoryCap = category.charAt(0).toUpperCase() + category.substring(1);
	var tableHeader;
	if(categoryCap !== '') {
		if((categoryCap === 'Protein') || (categoryCap === 'Bread') || (categoryCap === 'Tortilla') || (categoryCap === 'Cheese')) {
			tableHeader = 'Select ' + categoryCap;
		}
		else {
			tableHeader = 'Select ' + categoryCap + 's';
		}	
	} else {
		tableHeader = 'Select a category to begin your order...';
	}
	const submitButtonText = (order.length < 1 ? 'Build Order' : 'Submit Order');
	
	const renderItem = (item) => {
		const fixedPrice = '$' + item.price.toFixed(2);
		const handleItemClick = () => {
			setOrder(order.concat(item));
			setTotal(total + item.price);
		}
		return (
			<tr key={item.name}>
				<td>
					{item.name}
				</td>
				<td>
					{fixedPrice}
				</td>
				<td>
					<Button outline color="secondary" onClick={handleItemClick}>Add</Button>
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
								<Col lg={2}>{selectCategory}</Col>
								<Col>
									<Table className='itemTable bg-light' striped>
										<thead>
											<tr className='manageItemHeader'>
												<th>{tableHeader}</th>
											</tr>
										</thead>
										<tbody>{items.map(renderItem)}</tbody>
									</Table>
								</Col>

								<Col>
									<Card style={{ minHeight: "50vh" }}>
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
											className="purpleButton"
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

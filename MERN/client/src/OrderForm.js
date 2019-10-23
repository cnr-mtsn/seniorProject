import React, {useState} from "react";
import NavigationBar from "./NavigationBar";
import "./App.css";
import Header from "./Header";
import PickupTimes from "./PickupTimes";
import Comments from "./Comments";
import { 
	Card, 
	CardBody, 
	CardTitle, 
	CardText, 
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

	const handleCategorySelection = (selection) => {
		fetch(`http://localhost:5000/${selection}`)
		.then(response => response.json())
		.then(response => setItems(response.data))
		.then(setCategory(selection))
		.then(console.log("selected"))
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
	
	const renderItem = (item) => {
		const fixedPrice = '$' + item.price.toFixed(2);
		const handleItemClick = () => {
			setOrder(order.concat(item));
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
			<li>{orderItem.name} - {fixedPrice}</li>
		);
	};
	
	return (
		<Container>
			<Row>
				<Col><Header title='Order Form' /></Col>
			</Row>
			<Row>
				<Col><NavigationBar /></Col>
			</Row>
			<Row>
				<Col>
					<Jumbotron className='myJumbotron'>
						<Form>
							<Row>
								<Col lg={2}>{selectCategory}</Col>
								<Col>
									<Table className="itemTable bg-light" striped>
										<thead>
											<tr className="manageItemHeader">
												<th>{tableHeader}</th>
											</tr>
										</thead>
										<tbody>
											{items.map(renderItem)}
										</tbody>
									</Table>
								</Col>

								<Col>
									<Card style={{minHeight:'50vh'}}>
										<CardBody>
											<CardTitle>Order Details</CardTitle>
											<CardText>
												<ul>
													{order.map(renderOrder)}
												</ul>
											</CardText>
											<CardSubtitle>Total: </CardSubtitle>
											<PickupTimes/>
											<Comments/>
										</CardBody>
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

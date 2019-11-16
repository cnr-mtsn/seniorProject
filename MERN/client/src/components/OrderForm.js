import React, {useState, useEffect} from "react";
import "../App.css";
import Header from "../components/Header";
import { FaPlus, FaTimes } from "react-icons/fa";
import { 
	Card, 
	CardBody, 
	CardTitle,  
	CardSubtitle,
	Button, 
	Jumbotron, 
	Container, 
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
	DropdownToggle,
	Spinner
} from "reactstrap";

function OrderForm(props) {

	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [category, setCategory] = useState('');
	const [total, setTotal] = useState(0);
	const [healthPoints, setHealthPoints] = useState(0);
	const [times, setTimes] = useState([]);
	const [pickupTime, setPickupTime] = useState(); 
	const [comments, setComments] = useState();
	const [dropdownOpen, setOpen] = useState(false);
	const [userId, setUserId] = useState();
	const [modal, setModal] = useState(false);
	const [thanks, setThanks] = useState(false);
	const [routing, setRouting] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		getTimes(); 
	}, []);

	const toggleDropdown = () => setOpen(!dropdownOpen);
	const toggleModal = () => setModal(!modal);
	const toggleThanks = () => setThanks(!thanks);
	const toggleRouting = () => setRouting(!routing);
	const toggleConfirmed = () => setConfirmed(!confirmed);
	

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
		setHealthPoints(0);
		setTotal(0);
	}

	// const submitOrder = async () => {
	// 	fetch(`http://localhost:5000/newOrder?userId=${userId}&total=${total}`)
	// 	.then(setOrder([]))
	// 	.then(setTotal(0))
	// 	.catch(err => console.log(err))
	// };

	const getTimes = async () => {
		fetch(`http://localhost:5000/pickupTimes`)
			.then(response => response.json())
			.then(response => setTimes(response.data))
			.catch(err => console.error(err));
	};

	const submitButtonText = (order.length < 1 ? 'Build Order' : 'Submit Order');
	const getItem = (item) => {
		return <h5>{item.name}</h5>
	}
	const renderItem = (item) => {

		const fixedPrice = '$' + item.price.toFixed(2);
		const buttonId = `add${item.name}`;
		const handleItemClick = (buttonId, disabled) => {
			let found = false;
			for (let i = 0; i < order.length; i++) {
				if (order[i] === item) {
					found = true;
				}
			}
			if (found === true) {
				setTotal(total + item.price);
			} 
			else if (found === false) {
				setOrder(order.concat(item));
				setTotal(total + item.price);
			}
			setHealthPoints(healthPoints + item.health_points);
		};
		const addButton = (
			<Button outline id={buttonId} color='primary' onClick={handleItemClick}>
				<FaPlus />
			</Button>
		);
		
		return (
			<div key={item.name}>
				<h4>{item.name}</h4>
				<p>{item.price}</p>
			</div>
		);
	};
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
				<td><span>{orderItem.name}</span></td>
				<td><span>{fixedPrice}</span></td>
				<td><Button outline color="danger" onClick={deleteOrderItem}><FaTimes/></Button></td>
				<td><Button outline color="primary" onClick={addOrderItem}><FaPlus/></Button></td>
			</tr>
		);
	};
	const renderTimes = time => {
		return (
			<option key={time.time_id}>{time.pickupTime}</option>
		);
	};

	const renderConfirmItems = item => {
		return <li key={item.name}>{item.name}</li>;
	}
	const handlePlaceOrderClick = () => {
		toggleConfirmed();
		setTimeout(toggleModal, 300);
		setOrder([]);
		setUserId(null);
		setTotal(0);
		setComments(null);
		setTimeout(toggleThanks, 300);
	}
	const handleThanksClick = () => {
		toggleRouting();
		setTimeout(routeHome, 800);
	}
	const routeHome = () => {
		props.history.push('/home');
	}
	const thanksBody = ( routing ? <Spinner color="dark"/> : <p>Thanks for skipping the line and placing your order online!</p> );
	const tableBody = ( category === '' ? null : (<tr><td>Name</td><td>Price</td><td>HP</td><td></td></tr>));
	const confirmBody = ( confirmed ? <Spinner color="dark"/> : (<div>
																	<ul style={{marginLeft:'0'}}>{order.map(renderConfirmItems)}</ul>	
																	<h6>User ID: {userId}</h6>
																	<h6>Pickup Time: {pickupTime}</h6>
																	<h6>Total: ${total.toFixed(2)}</h6>
																</div>));
	const avgHP = (healthPoints / order.length) || 0;
	const orderDetailsHeader = (order.length < 1 ? 'Select a category to begin' : 'Order Details');

	return (
		<div className='orderFormWrapper'>
			<div className='orderFormHeader'>
				<Header title='Fed Eats Deli Order Form' />
			</div>

			<div className='orderForm'>
				{/* <Form>
					{tableCategorySelect}
					<div>
						<Table className='itemTable' striped>
							<tbody>
								{tableBody}
								{items.map(renderItem)}
							</tbody>
						</Table>
					</div>
				</Form> */}
				<div className='formWrapper'>
					<div className='selectCategory'>
						<Button
							value='bread'
							onClick={handleCategorySelection.bind(this, "bread")}>
							Bread
						</Button>
						<Button
							value='tortilla'
							onClick={handleCategorySelection.bind(this, "tortilla")}>
							Tortilla
						</Button>
						<Button
							value='protein'
							onClick={handleCategorySelection.bind(this, "protein")}>
							Protein
						</Button>
						<Button
							value='cheese'
							onClick={handleCategorySelection.bind(this, "cheese")}>
							Cheese
						</Button>
						<Button
							value='veggie'
							onClick={handleCategorySelection.bind(this, "veggie")}>
							Veggies
						</Button>
						<Button
							value='condiment'
							onClick={handleCategorySelection.bind(this, "condiment")}>
							Condiments
						</Button>
						<Button
							value='extra'
							onClick={handleCategorySelection.bind(this, "extra")}>
							Extras
						</Button>
					</div>

					<div className='actualForm'>
						{items.map(renderItem)}
					</div>
				</div>
			</div>

			<div className='orderFormDetails'>
				items
				{/* <Card>
					<CardTitle>
						{orderDetailsHeader}
					</CardTitle>
					<CardBody>
						<div>
							<Table className='itemTable' striped>
								<tbody>{order.map(renderOrder)}</tbody>
							</Table>
						</div>
					</CardBody>
					<CardSubtitle>
						<h5>Total: ${total.toFixed(2)}</h5>
						<h5>Avg HP: {avgHP.toFixed(1)}</h5>
					</CardSubtitle>
					<Input
						required
						placeholder='User ID'
						onChange={handleUserIdInput}></Input>
					<Input type='select' onChange={handleTimeSelection}>
						{times.map(renderTimes)}
						<option disabled defaultValue='Pickup Time'></option>
					</Input>
					<Input
						type='textarea'
						placeholder='Special instructions for the kitchen...'
						onChange={handleCommentsInput}
					/>
					<Button
						type='button'
						outline
						color='danger'
						onClick={handleClearOrderClick}
						style={{ width: "40%", margin: "auto" }}>
						Clear Order
					</Button>
					<Button
						type='button'
						outline
						color='primary'
						onClick={toggleModal}
						style={{ width: "40%", margin: "auto" }}>
						{submitButtonText}
					</Button>
				</Card> */}
			</div>

			{/* <div>
				<Modal className='orderModal' isOpen={modal} toggle={toggleModal}>
					<div>
						<ModalHeader toggle={toggleModal}>Order Confirmation</ModalHeader>
						<ModalBody>{confirmBody}</ModalBody>
						<ModalFooter>
							<Button color='primary' onClick={handlePlaceOrderClick}>
								Place Order
							</Button>
						</ModalFooter>
					</div>
				</Modal>
			</div>

			<div>
				<Modal className='orderModal' isOpen={thanks} toggle={toggleThanks}>
					<div>
						<ModalHeader toggle={toggleThanks}>Thank You!</ModalHeader>
						<ModalBody>{thanksBody}</ModalBody>
						<ModalFooter>
							<Button color='primary' value='Close' onClick={handleThanksClick}>
								Close
							</Button>
						</ModalFooter>
					</div>
				</Modal>
			</div> */}
		</div>
	);
}

export default OrderForm;

import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Spinner
} from "reactstrap";

function OrderForm(props) {

	/****** STATE  ******/
	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [category, setCategory] = useState("");
	const [total, setTotal] = useState(0);
	const [duplicates, setDuplicates] = useState(0);
	const [healthPoints, setHealthPoints] = useState(0);
	const [times, setTimes] = useState([]);
	const [pickupTime, setPickupTime] = useState();
	const [comments, setComments] = useState();
	const [userId, setUserId] = useState();
	const [modal, setModal] = useState(false);
	const [thanks, setThanks] = useState(false);
	const [routing, setRouting] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	/****** STATE  ******/

	useEffect(() => {
		getTimes();
	}, []);

	/****** TOGGLES  ******/
	const toggleModal = () => setModal(!modal);
	const toggleThanks = () => setThanks(!thanks);
	const toggleRouting = () => setRouting(!routing);
	const toggleConfirmed = () => setConfirmed(!confirmed);
	/****** TOGGLES  ******/

	/****** FUNCTIONS ******/
	//get all pickup times from database
	const getTimes = async () => {
		fetch(`http://localhost:5000/pickupTimes`)
			.then(response => response.json())
			.then(response => setTimes(response.data))
			.catch(err => console.error(err));
	};
	//set the category of items === selection 
	const handleCategorySelection = selection => {
		fetch(`http://localhost:5000/${selection}`)
			.then(response => response.json())
			.then(response => setItems(response.data))
			.then(setCategory(selection))
			.then(console.log("selected " + category));
	};
	//set comments for kitchen
	const handleCommentsInput = e => {
		setComments(e.target.value);
		console.log(comments);
	};
	//set desired pickupTime
	const handleTimeSelection = e => {
		setPickupTime(e.target.value);
		console.log(pickupTime);
	};
	//set user ID
	const handleUserIdInput = e => {
		setUserId(e.target.value);
	};
	//clear order items, health points, total
	const handleClearOrderClick = () => {
		setOrder([]);
		setHealthPoints(0);
		setTotal(0);
	};
	//render each item in desired category with button for adding to order.
	const renderItem = item => {

		const fixedPrice = "$" + item.price.toFixed(2);
		//add button text
		const divId = `add${item.name}`;
		//add item to order || increment price/health points if already in order
		const handleItemClick = (divId, disabled) => {
			let found = false;
			for (let i = 0; i < order.length; i++) {
				if (order[i] === item) {
					found = true;
				}
			}
			if (found === true) {
				setTotal(total + item.price);
				setDuplicates(duplicates + 1);
			} else if (found === false) {
				setOrder(order.concat(item));
				setTotal(total + item.price);
			}
			setHealthPoints(healthPoints + item.health_points);
		};
		const addButton = (
			<Button outline id={divId} color='primary' onClick={handleItemClick}>
				<FaPlus />
			</Button>
		);
		
		return (
			<div key={item.name} className='renderItemWrapper'>
				<div className='renderItemName'>{item.name}</div>
				<div className='renderItemPrice'>{fixedPrice}</div>
				<div className='renderItemHP'>{item.health_points}</div>
				<div className='renderItemAdddiv'>{addButton}</div>
			</div>
		);
	};
	//render each item in order
	const renderOrderItems = item => {
		return (
			<div key={item.name} className='orderDetailsWrapper'>
				<div className='detailsName'>{item.name}</div>
				<div className='detailsPrice'>{item.price}</div>
				<div className='detailsHP'>{item.health_points}</div>
			</div>
		);
	};
	//render each item in order on confirmation modal
	const renderConfirmItems = item => {
		return <li key={item.name}>{item.name}</li>;
	};
	//render each pickup time as <option/>
	const renderTimes = time => {
		return <option key={time.time_id}>{time.pickupTime}</option>;
	};
	//when order is placed from confirmation modal => 	
	const handlePlaceOrderClick = () => {
		toggleConfirmed();
		setTimeout(toggleModal, 300);
		setOrder([]);
		setUserId(null);
		setTotal(0);
		setComments(null);
		setTimeout(toggleThanks, 300);
	};
	const handleThanksClick = () => {
		toggleRouting();
		setTimeout(routeHome, 800);
	};
	const routeHome = () => {
		props.history.push("/home");
	};
	/****** FUNCTIONS ******/
	

	/****** CONDITIONAL INNER HTML ******/
	const submitdivText = order.length < 1 ? "Build" : "Submit";

	const thanksBody = routing ? (
		<Spinner color='dark' />
	) : (
		<p>Thanks for skipping the line and placing your order online!</p>
	);
	const confirmBody = confirmed ? (
		<Spinner color='dark' />
	) : (
		<div>
			<ul style={{ marginLeft: "0" }}>{order.map(renderConfirmItems)}</ul>
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
			<h6>Total: ${total.toFixed(2)}</h6>
		</div>
	);
	const avgHP = healthPoints / (order.length + duplicates) || 0;
	
	const orderDetailsHeader =
		order.length < 1 ? "Select a category to begin..." : "Order Details";
	console.log(userId);
	/****** CONDITIONAL INNER HTML ******/

	/****** RENDER THIS ******/
	return (
		<div className='orderFormWrapper'>
			<div className='orderFormHeader'>
				<Header title='Fed Eats Deli Order Form' />
			</div>

			<div className='orderForm'>
				<div className='formWrapper'>
					<div className='selectCategory'>
						<div className='selectCategoryWrapper'>
							<div
								className='selectBreadButton'
								value='bread'
								onClick={handleCategorySelection.bind(this, "bread")}>
								Bread
							</div>
							<div
								className='selectTortillaButton'
								value='tortilla'
								onClick={handleCategorySelection.bind(this, "tortilla")}>
								Tortilla
							</div>
							<div
								className='selectProteinButton'
								value='protein'
								onClick={handleCategorySelection.bind(this, "protein")}>
								Protein
							</div>
							<div
								className='selectCheeseButton'
								value='cheese'
								onClick={handleCategorySelection.bind(this, "cheese")}>
								Cheese
							</div>
							<div
								className='selectVeggieButton'
								value='veggie'
								onClick={handleCategorySelection.bind(this, "veggie")}>
								Veggies
							</div>
							<div
								className='selectCondimentButton'
								value='condiment'
								onClick={handleCategorySelection.bind(this, "condiment")}>
								Condiments
							</div>
							<div
								className='selectExtraButton'
								value='extra'
								onClick={handleCategorySelection.bind(this, "extra")}>
								Extras
							</div>
						</div>
					</div>
					<div className='actualForm'>{items.map(renderItem)}</div>
				</div>
			</div>

			<div className='orderFormDetails'>
				<div className='orderFormDetailsInner'>
					<div className='orderDetailsTitle'>{orderDetailsHeader}</div>
					<div className='renderOrderItemsDiv'>
						{order.map(renderOrderItems)}
					</div>

					<div className='orderDetailsFooter'>
						<div className='detailsFooterWrapper'>
							<div className='detailsTotal'>
								<h6>Total: ${total.toFixed(2)}</h6>
								<h6>Avg HP: {avgHP.toFixed(1)}</h6>
							</div>
							<div className='detailsClearButton'>
								<Button
									className='detailsdiv'
									type='div'
									color='danger'
									onClick={handleClearOrderClick}>
									Clear
								</Button>
							</div>

							<div className='detailsConfirmButton'>
								<Button
									className='detailsdiv'
									type='div'
									color='primary'
									onClick={toggleModal}>
									{submitdivText}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
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
			</div>
		</div>
	);
	/****** RENDER THIS ******/
	
}

export default OrderForm;
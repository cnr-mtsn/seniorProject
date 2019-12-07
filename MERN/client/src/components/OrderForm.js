import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { MdSend } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import { Input, Modal, Spinner } from "reactstrap";

function OrderForm(props) {

	//get info about the user for sending order
	const getUserStats = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${props.user}`)
			.then(response => response.json())
			.then(response => setUserData(response.data[0]))
			.catch(err => console.log(err));
	};

	/****** STATE  ******/
	const [total, setTotal] = useState(0);
	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [orderId, setOrderId] = useState();
	const [times, setTimes] = useState([]);
	const [comments, setComments] = useState();
	const [category, setCategory] = useState("");
	const [pickupTime, setPickupTime] = useState();
	const [healthPoints, setHealthPoints] = useState(0);
	const [calories, setCalories] = useState(0);
	const [userData, setUserData] = useState(getUserStats);
	const [modal, setModal] = useState(false);
	const [thanks, setThanks] = useState(false);
	const [routing, setRouting] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	const avgHP = (healthPoints / (order.length)).toFixed(1) || 0;

	/****** STATE  ******/

	useEffect(() => {
		getTimes();
		getMaxId();// eslint-disable-next-line
	}, []);

	/****** TOGGLES  ******/
	const toggleModal = () =>  { 
		setModal(!modal);
	}
	const toggleThanks = () => setThanks(!thanks);
	const toggleRouting = () => setRouting(!routing);
	const toggleConfirmed = () => setConfirmed(!confirmed);
	/****** TOGGLES  ******/

	/****** FUNCTIONS ******/
	//get max order_id from db
	const getMaxId = async () => {
		await fetch(`http://localhost:5000/maxOrderById`)
			.then(response => response.json())
			.then(response => setOrderId(response.data[0].id ? response.data[0].id + 1 : 1))
			.catch(err => console.log(err));
	};
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
	

	//clear order items, health points, total
	const handleClearOrderClick = () => {
		setOrder([]);
		setHealthPoints(0);
		setCalories(0);
		setTotal(0);
	};
	const renderOrderItems = item => {
		return (
			<div key={`${item.name}${item.price}`} className='orderDetailsItem'>
				<h5>{item.name}</h5>
				<h6>{item.calories}cal.</h6>
			</div>
		);

	}
	//render each item in desired category with button for adding to order.
	const renderItem = item => {
		let orderItemColor; 
		switch(item.health_points) {
			case 1: orderItemColor = "#F1938D";
					break;
			case 2: orderItemColor = "#FFBD81";
					break;
			case 3: orderItemColor = "#FFFDA4";
					break;
			case 4: orderItemColor = "#E0EF94";
					break;
			case 5: orderItemColor = "#99E896";
					break;
			default: orderItemColor = "white"
		}
		const fixedPrice = "$" + item.price.toFixed(2);
		
		//add item to order || increment price/health points if already in order
		const handleItemClick = () => {
			let found = false;
			for (let i = 0; i < order.length; i++) {
				if (order[i] === item) {
					found = true;
				}
			}
			if (found === true) {
				setTotal(total + item.price);
				setCalories(calories + item.calories);
			} else if (found === false) {
				setOrder(order.concat(item));
				setTotal(total + item.price);
				setCalories(calories + item.calories);
				setHealthPoints(healthPoints + item.health_points);
			}
		};
		
	
		return (
			<div
				style={{ background: `${orderItemColor}` }}
				key={item.name + item.price}
				className='orderItem'>
				<div className='orderItemName'>{item.name}</div>
				<div className='orderItemInfo'>
					<div>{fixedPrice}</div>
					<div>{item.calories}cal.</div>
				</div>

				<div className='orderItemAddButton'>
					<button onClick={handleItemClick}>
						<FaPlus />
					</button>
				</div>
			</div>
		);
	};

	//render each item in order on confirmation modal
	const renderConfirmItems = item => {

		let orderConfItemColor;
		switch (item.health_points) {
			case 1:
				orderConfItemColor = "#F1938D";
				break;
			case 2:
				orderConfItemColor = "#FFBD81";
				break;
			case 3:
				orderConfItemColor = "#FFFDA4";
				break;
			case 4:
				orderConfItemColor = "#E0EF94";
				break;
			case 5:
				orderConfItemColor = "#99E896";
				break;
			default:
				orderConfItemColor = 'white';
		}
		return <div style={{background: `${orderConfItemColor}`}} className="confirmItems" key={`${item.name}${item.price}`}>{item.name}</div>;
	};
	//render each pickup time as <option/>
	const renderTimes = time => {
		return <option key={time.time_id}>{time.pickupTime}</option>;
	};
	//when order is placed from confirmation modal => 	
	const handlePlaceOrderClick = async () => {
		//submit order with user_id, total, order_id
		await submitOrder();
		//submit items in order
		order.map(submitItems);
		toggleConfirmed();
		//trigger spinner in confirmation modal
		//close confirmation modal after 1/3 second
		setTimeout(toggleModal, 500);
		//clear state values
		setOrder([]);
		setTotal(0);
		setCalories(0);
		setComments(null);
		//toggle thanks modal
		setTimeout(toggleThanks, 300);
	};
	console.log(avgHP);
	//submit order total, user_id, generate order number
	const submitOrder = () => {
		fetch(`http://localhost:5000/newOrder?orderId=${orderId}&userId=${userData.user_id}&total=${total}&hp=${avgHP}&comments=${comments}&pickupTime=${pickupTime}`)
		.catch(err => console.log(err));
	}
	
	const submitItems = (item) => {
		if(item.sandwich_id) {
			insertOrderItem(item.sandwich_id, 'sandwich_id', 'orders_sandwich');
		} else if (item.tortilla_id) {
			insertOrderItem(item.tortilla_id, "tortilla_id", 'orders_tortilla');
		} else if (item.protein_id) {
			insertOrderItem(item.protein_id, "protein_id", 'orders_protein');
		} else if (item.cheese_id) {
			insertOrderItem(item.cheese_id, "cheese_id", 'orders_cheese');
		} else if (item.veggie_id) {
			insertOrderItem(item.veggie_id, "veggies_id", 'orders_veggies');
		} else if (item.condiments_id) {
			insertOrderItem(item.condiments_id, "condiments_id", 'orders_condiments');
		} else if (item.extras_id) {
			insertOrderItem(item.extras_id, "extras_id", 'orders_extras');
		} else {
			console.log('completed inserting items');
		}
	};
	const insertOrderItem = async (itemId, attr, table) => {
		await fetch(`http://localhost:5000/insertOrderItem?itemId=${itemId}&attr=${attr}&table=${table}&orderId=${orderId}`)
		.then(console.log(`inserted ${itemId} into ${table}`))
		.catch(err => console.log(err));
	};
	const handleThanksClick = () => {
		toggleRouting();
		setTimeout(routeHome, 800);
	};
	const routeHome = () => {
		setRedirect(true);
	};

	/****** FUNCTIONS ******/
	

	/****** CONDITIONAL INNER HTML ******/

	const thanksBody = routing ? (
		<Spinner color='dark' />
	) : (
		`Your order will be ready at ${pickupTime}`
	);

	let conf_hp_color;
	let conf_hp_message;
	
	if(avgHP < 2) {
		conf_hp_color = "#F1938D";
		conf_hp_message = `The average health point value of the items in your order is ${avgHP} 😬\n Consider making healthier choices in the future!`;
	} else if(avgHP < 2.8) {
		conf_hp_color = "#FFBD81";
		conf_hp_message = `The average health point value of the items in your order is ${avgHP} 🤔\n Consider making healthier choices in the future!`;
	} else if(avgHP < 3.6) {
		conf_hp_color = "#FFFDA4";
		conf_hp_message = `The average health point value of the items in your order is ${avgHP}. 👍🏼\n You're right in the middle. Try to stay at or above this threshold!`;
	} else if(avgHP < 4.4) {
		conf_hp_color = "#E0EF94";
		conf_hp_message = `The average health point value of the items in your order is ${avgHP} 😀\n You're doing great! Keep it up!`;
	} else if(avgHP > 4.4) {
		conf_hp_color = "#99E896";
		conf_hp_message = `WOW! 👀 The average health point value of the items in your order is ${avgHP} 😄\n Go ${userData.firstName}!`;
	}
			
	const confirmBody = confirmed ? (
		<Spinner color='dark' />
	) : (
		<div className='confirmationBody'>
			<div className='confirmOrderInfo'>
				<div>{order.map(renderConfirmItems)}</div>
				<div className='confirmHealthPoints'>
					<div className='chpHeader'>
						<span>Avg Health Points</span>
					</div>
					<div className='chpNumber'>
						<div style={{background:`${conf_hp_color}`}}>{avgHP}</div>
					</div>
					<div className='chpMessage'>{conf_hp_message}</div>
				</div>
			</div>

			<div className='confirmOrderInputs'>
				<Input type='select' onChange={handleTimeSelection}>
					<option
						className='pickupTimeSelect'
						defaultValue='Select Your Pickup Time'>
						Pickup Time
					</option>
					{times.map(renderTimes)}
				</Input>
				<Input
					type='textarea'
					placeholder='Special instructions for the kitchen...'
					onChange={handleCommentsInput}
				/>
			</div>
		</div>
	);	
	/****** CONDITIONAL INNER HTML ******/

	/****** RENDER THIS ******/
	if(redirect) {
		return ( <Redirect to="/"/>);
	} 
	else {
		return (
			<div className='orderFormWrapper'>
				<div className='orderFormHeader'>
					<Header user={userData.firstName} view={userData.view} />
				</div>

				<div className='orderFormBody'>
					<div className='selectCategory'>
						<div onClick={handleCategorySelection.bind(this, "bread")}>
							Bread
						</div>
						<div onClick={handleCategorySelection.bind(this, "tortilla")}>
							Tortilla
						</div>
						<div onClick={handleCategorySelection.bind(this, "protein")}>
							Protein
						</div>
						<div onClick={handleCategorySelection.bind(this, "cheese")}>
							Cheese
						</div>
						<div onClick={handleCategorySelection.bind(this, "veggie")}>
							Veggies
						</div>
						<div onClick={handleCategorySelection.bind(this, "condiment")}>
							Condiments
						</div>
						<div onClick={handleCategorySelection.bind(this, "extra")}>
							Extras
						</div>
					</div>

					<div className='orderBody'>{items.map(renderItem)}</div>

					<div className='orderDetails'>
						<div className='detailsHeader'>
							Order Details
						</div>

						<div className='detailsBody'>
							<div className='detailsBodyItems'>
								{order.map(renderOrderItems)}
							</div>
							<div className='detailsBodyInfo'>
								<h6>${total.toFixed(2)}</h6>
								<h6>{calories}cal.</h6>
								<h6>HP: {healthPoints ? (healthPoints / order.length).toFixed(1) : 0}</h6>
							</div>
						</div>

						<div className='detailsFooter'>
							<div className='orderSubmitButton' onClick={toggleModal}>
								<FaCheck/>
							</div>
							<div className='orderClearButton' onClick={handleClearOrderClick}>
								<FaTimes/>
							</div>
						</div>
					</div>
				</div>

				<Modal className='orderModal' isOpen={modal} toggle={toggleModal}>
					<div className="confirmModalWrapper">
						<div className="orderConfirmHeader">Order Confirmation</div>
						{confirmBody}
						<div className="orderConfirmButton">
							<button onClick={handlePlaceOrderClick}>
								<MdSend size={32}/>
							</button>
						</div>
					</div>
				</Modal>

				<Modal className='orderModal' isOpen={thanks} toggle={toggleThanks}>
					<div className="thanksModalWrapper">
						<div className="thanksModalHeader">Thanks, {userData.firstName}!</div>
						<div className="thanksModalBody">{thanksBody}</div>
						<div className="thanksModalButton">
							<button
								color='primary'
								value='Close'
								onClick={handleThanksClick}>
								Close
							</button>
						</div>
					</div>
				</Modal>
			
			</div>
		);
	}
}

export default OrderForm;

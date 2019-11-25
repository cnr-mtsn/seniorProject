import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/Header";
import { FaPlus, FaUserTie, FaStar } from "react-icons/fa";
import { Redirect } from 'react-router-dom';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Spinner, 
	Progress
} from "reactstrap";

function OrderForm(props) {

	//get info about the user for sending order
	const getUserStats = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${props.user.user_id}`)
			.then(response => response.json())
			.then(response => setUserData(response.data[0]))
			.catch(err => console.log(err));
	};

	/****** STATE  ******/
	const [total, setTotal] = useState(0);
	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [times, setTimes] = useState([]);
	const [comments, setComments] = useState();
	const [user, setUser] = useState(props.user);
	const [category, setCategory] = useState("");
	const [pickupTime, setPickupTime] = useState();
	const [duplicates, setDuplicates] = useState(0);
	const [healthPoints, setHealthPoints] = useState(0);
	const [userData, setUserData] = useState(getUserStats());
	const [modal, setModal] = useState(false);
	const [thanks, setThanks] = useState(false);
	const [routing, setRouting] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const [redirectProfile, setRedirectProfile] = useState(false);
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
	

	//clear order items, health points, total
	const handleClearOrderClick = () => {
		setOrder([]);
		setHealthPoints(0);
		setTotal(0);
		setDuplicates(0);
	};
	//render each item in desired category with button for adding to order.
	const renderItem = item => {

		const fixedPrice = "$" + item.price.toFixed(2);

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
			<Button outline color='primary' onClick={handleItemClick}>
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
		setTotal(0);
		setComments(null);
		setTimeout(toggleThanks, 300);
	};
	const handleThanksClick = () => {
		toggleRouting();
		setTimeout(routeHome, 800);
	};
	const routeHome = () => {
		setRedirect(true);
	};
	const routeToProfile = () => {
		setRedirectProfile(true);
	}
	/****** FUNCTIONS ******/
	

	/****** CONDITIONAL INNER HTML ******/

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
			<h5>Name: {user.firstName} {user.lastName}</h5>
			<h5>User ID: {user.user_id}</h5>
			<h5>Total: ${total.toFixed(2)}</h5>
			<Input type='select' onChange={handleTimeSelection}>
				{times.map(renderTimes)}
				<option disabled defaultValue='Pickup Time'></option>
			</Input>
			<Input
				type='textarea'
				placeholder='Special instructions for the kitchen...'
				onChange={handleCommentsInput}
			/>
		</div>
	);

	const avgHP = healthPoints / (order.length + duplicates) || 0;
	
	/****** CONDITIONAL INNER HTML ******/

	/****** RENDER THIS ******/
	if(redirect) {
		return ( <Redirect to="/"/>);
	} else if(redirectProfile) {
		return ( <Redirect to="/profile"/>);
	}
	else {
		return (
			<div className='orderFormWrapper'>
				
				<div className='orderFormHeader'>
					<Header user={user} view={user.view} />
				</div>

				<div className='orderFormSide'>
					<div className='profileSidePicAndStars'>
						<div className='profileSidePic'>
							<div className='profileSidePicInner'>
								<FaUserTie size={200} />
							</div>
							<div className='profileSideStars'>
								<FaStar size={32} />
								<FaStar size={32} />
								<FaStar size={32} />
								<FaStar size={32} />
								<FaStar size={32} />
							</div>
						</div>
					</div>

					<div className='profileSideLinks'>
						<div className='profileSideLinksOrders' onClick={routeToProfile}>
							<h5>My Orders</h5>
						</div>
						<div className='profileSideLinksFavs'>
							<h5>Favorites</h5>
						</div>
					</div>

					<div className='profileSideFooter'>
						<div className='profileSideFooterEmail'>
							<h6>{userData.email}</h6>
						</div>
						<div className='profileSideFooterID'>
							<h6>ID: {userData.user_id}</h6>
						</div>
					</div>
				</div>

				<div className='orderFormBody'>
					<div className='selectCategory'>
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

					<div className='actualForm'>
						{items.map(renderItem)}
					</div>

					<div className="orderStatus">
						<Progress value={75}/>
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
								<Button
									color='primary'
									value='Close'
									onClick={handleThanksClick}>
									Close
								</Button>
							</ModalFooter>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}

export default OrderForm;

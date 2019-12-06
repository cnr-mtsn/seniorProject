import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FaUserTie, FaStar } from 'react-icons/fa';


function Profile(props) {

	useEffect(() => {
		getUserStats();
		getUserOrders(); // eslint-disable-next-line
		getTotalHP(); // eslint-disable-next-line
	}, []);

	const getUserStats = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${props.user}`)
			.then(response => response.json())
			.then(response => setUserData(response.data[0]))
			.catch(err => console.log(err));
	};
	const getUserOrders =  async () => {
		await fetch(`http://localhost:5000/ordersById?userId=${props.user}`)
			.then(response => response.json())
			.then(response => setOrders(response.data))
			.catch(err => console.log(err));
	};
	const getTotalHP = async () => {
		await fetch(`http://localhost:5000/userHP?id=${props.user}`)
		.then(response => response.json())
		.then(response => setTotalHP(response.data[0].sum))
		.catch(err => console.log(err));
	}
	// eslint-disable-next-line
	const [totalHP, setTotalHP] = useState();
	const [orders, setOrders] = useState([]);
	const [userData, setUserData] = useState([]);
	const [orderDetails, setOrderDetails] = useState(false);

	const toggleOrderDeets = () => { setOrderDetails(!orderDetails) };
	
	const renderOrders = (order) => {
		const fixedPrice = `$${order.total.toFixed(2)}`;
		const orderModal = (
			<Modal
				className='ordersModal'
				isOpen={orderDetails}
				toggle={toggleOrderDeets}>
				<ModalHeader>Order Details</ModalHeader>
				<ModalBody>
					<ul>
						<li>Order ID: {order.order_id}</li>
					</ul>
				</ModalBody>
				<ModalFooter>Total: {fixedPrice}</ModalFooter>
			</Modal>
		)
		return (
			<div key={order.order_id} className='profileOrder'>
				<div>{order.hp}</div>
				<div>{fixedPrice}</div>
				<div>{order.order_date}</div>
				<div onClick={toggleOrderDeets} className="clickable">View Order</div>
				{orderModal}
			</div>
		);
	}

    return (
			<div className='profileWrapper'>
				<div className='profileHeader'>
					<Header user={userData.firstName} view={userData.view} />
				</div>

				<div className='profileSide'>
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
						<div className='profileSideLinksOrders'>
							<h5>My Orders</h5>
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

				<div className='profileBody'>
					<div className='profileBodyHeaders'>
						<h5>Name</h5>
						<h5>Price</h5>
						<h5>Data</h5>
						<h5>Items</h5>
					</div>
					<div className='profileBodyData'>
						{orders ? orders.map(renderOrders) : null}
					</div>
				</div>
			</div>
		);
}


export default Profile;
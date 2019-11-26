import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { FaUserTie, FaStar } from 'react-icons/fa';


function Profile(props) {

	useEffect(() => {
		getUserOrders();
		getUserStats(); // eslint-disable-next-line
	}, []);
	
	const getUserStats = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${props.user.user_id}`)
			.then(response => response.json())
			.then(response => setUserData(response.data[0]))
			.catch(err => console.log(err));
	};
	const getUserOrders =  () => {
		fetch(`http://localhost:5000/orderById?userId=${props.user.user_id}`)
			.then(response => response.json())
			.then(response => setOrders(response.data))
			.catch(err => console.log(err));
	}
	const [user] = useState(props.user);
	const [userData, setUserData] = useState(getUserStats());
	const [orderDetails, setOrderDetails] = useState(false);
	const [orders, setOrders] = useState([]);

	const toggleOrderDeets = () => { setOrderDetails(!orderDetails) };

	const renderOrders = (order) => {
		const fixedPrice = `$${order.total.toFixed(2)}`;
		return (
			<div key={order.order_id} className='profileBodyItem'>
				<div className='profileBodyDataName'>{order.order_id}</div>
				<div className='profileBodyDataPrice'>{fixedPrice}</div>
				<div className='profileBodyDataDate'>{order.order_date}</div>
				<div className='profileBodyDataItems'>
					<span onClick={toggleOrderDeets}>View Order</span>
				</div>
				<Modal
					className='ordersModal'
					isOpen={orderDetails}
					toggle={toggleOrderDeets}>
					<ModalHeader>Order Details</ModalHeader>
					<ModalBody>
						<ul>
							<li>bread</li>
							<li>meat</li>
							<li>cheese</li>
							<li>veggies</li>
							<li>sauce</li>
						</ul>
					</ModalBody>
					<ModalFooter>Total: {fixedPrice}</ModalFooter>
				</Modal>
			</div>
		);
	}

    return (
			<div className='profileWrapper'>
				<div className='profileHeader'>
					<Header user={user} view={userData.view} />
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

				<div className='profileBody'>
					<div className='profileBodyLabels'>
						<div className='profileBodyLabelName'>Name</div>
						<div className='profileBodyLabelPrice'>Price</div>
						<div className='profileBodyLabelDate'>Date</div>
						<div className='profileBodyLabelItems'>Items</div>
					</div>
					<div className='profileBodyData'>
						{orders.map(renderOrders)}
					</div>
				</div>

			
			</div>
		);
}


export default Profile;
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import OrderItem from '../components/OrderItem';



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

	
	const renderOrders = (order) => {
		const fixedPrice = `$${order.total.toFixed(2)}`;
	
		return (
			<div key={order.order_id} className='kitchenOrder'>
				<div className='orderTop'>
					<div className='kOrderUserId'>
						<div className='ticketLabel'>Date</div>
						<div className='paddingOne ticketData'>{order.order_date}</div>
					</div>
					<div className='kOrderUserId'>
						<div className='ticketLabel'>Health Points</div>
						<div className='paddingOne ticketData'>{order.hp}</div>
					</div>
					<div className='kOrderTime'>
						<div className='ticketLabel'>Price</div>
						<div className='paddingOne ticketData'>{fixedPrice}</div>
					</div>
				</div>
				<div className='orderBody'>
					<div className='kOrderItems'>
						<OrderItem style={{background:'red'}}orderId={order.order_id} />
					</div>
				</div>
			</div>
		);
	}

    return (
			<div className='profileWrapper'>
				<div className='profileHeader'>
					<Header user={userData.firstName} view={userData.view} />
				</div>

				<div className='profileBody'>

					{/* <div className='profileSide'>
						<div className='profileSidePicAndStars'>
							<div className='profileSidePic'>
								<FaUserTie size={100}/>
							</div>
							<div className='profileSideStars'>
								<div className="avgHP">
									Average HP
								</div>
								<div className="avgHPText">{totalHP / orders.length}</div>
							</div>
						</div>

						<div className='profileSideFooter'>
							<h6>{userData.email}</h6>
							<h6>ID: {userData.user_id}</h6>
						</div>
					</div> */}

					<div className='profileBodyData'>
						{orders ? orders.map(renderOrders) : null}
					</div>
				</div>
			</div>
		);
}


export default Profile;
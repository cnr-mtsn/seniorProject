import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import OrderItem from '../components/OrderItem';
import { FaCheckCircle } from 'react-icons/fa';
// import { Redirect } from 'react-router';



function Kitchen(props) {

    useEffect(() => {
		// eslint-disable-next-line
       getOrders();
    }, [])

    const getUserStats = async () => {
        await fetch(`http://localhost:5000/userByIdAll?id=${props.user}`)
        .then(response => response.json())
        .then(response => setUserData(response.data[0]))
        .catch(err => console.log(err));
    };
    const getOrders = () => {
        fetch(`http://localhost:5000/allOrders`)
        .then(response => response.json())
        .then(response => setOrders(response.data))
        .catch(err => console.log(err));
	}
  	const handleCompleteClick = async id => {
		await fetch(`http://localhost:5000/orderComplete?id=${id}`)
			.then(console.log(`Order ${id} is complete!`))
			.then(getOrders)
			.catch(err => console.log);
	};
    const [userData, setUserData] = useState(getUserStats);
    const [orders, setOrders] = useState(getOrders);
	
    const renderOrders = (order) => {
		if(order.complete === 1) {
			return null;
		} else {
			return (
				<div key={`${order.order_id}${Math.random() * 10}`} className='kitchenOrder'>

					<div className='orderTop'>
						<div className='kOrderUserId'>
							<div className='ticketLabel'>User ID</div>
							<div className='paddingOne ticketData'>{order.user_id}</div>
						</div>
						<div className='kOrderTime'>
							<div className='ticketLabel'>Pickup Time:</div>
							<div className='ticketData'>{order.pickupTime}</div>
						</div>
					</div>

					<div className='orderBody'>
						<div className='kOrderItems'>
							<OrderItem orderId={order.order_id}/>
						</div>
						<div className='kOrderComments'>
							<div className="commentsHeader">Comments</div>
							<div className="commentsBody">
								{order.comments === "undefined" ? "---" : `"${order.comments}"`}
							</div>
						</div>
					</div>

					<div className="kOrderFooter">
						<div onClick={handleCompleteClick.bind(this, `${order.order_id}`)}><FaCheckCircle size={32}/></div>
					</div>

				</div>
			);
		}
    }

    return (
			<div className='kitchenWrapper'>
				<div className='kitchenHeader'>
					<Header user={userData.firstName} view={userData.view} />
				</div>
				<div className='kitchenMain'>
					<div className='kitchenBody'>
						{ orders ? orders.map(renderOrders) : null}
					</div>
				</div>
			</div>
		);
}

export default Kitchen;
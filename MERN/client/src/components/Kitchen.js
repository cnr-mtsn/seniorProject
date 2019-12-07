import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
// import { Redirect } from 'react-router';



function Kitchen(props) {

    useEffect(() => {
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
    
    const [userData, setUserData] = useState(getUserStats);
    const [orders, setOrders] = useState(getOrders);
	
    const renderOrders = (order) => {
		
        return (
					<div key={order.order_id} className='kitchenOrder'>

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

						<div className='orderBottom'>
							<div className='kOrderItems'>
								<div>item</div>
								<div>item</div>
								<div>item</div>
								<div>item</div>
								<div>item</div>
								<div>item</div>
								<div>item</div>
							</div>
							<div className='kOrderComments'>
								<div className="commentsHeader">Comments</div>
								<div className="commentsBody">
									{order.comments === "undefined" ? "---" : order.comments}
								</div>
							</div>
						</div>

						<div className="orderFooter">
							<button>X</button>
						</div>

					</div>
				);
    }

    return (
			<div className='kitchenWrapper'>
				<div className='kitchenHeader'>
					<Header user={userData.firstName} view={userData.view} />
				</div>
				<div className='kitchenMain'>
					<div className='kitchenSide'>
						Orders
					</div>

					<div className='kitchenBody'>
						{orders ? orders.map(renderOrders) : null}
					</div>
				</div>
			</div>
		);
}

export default Kitchen;
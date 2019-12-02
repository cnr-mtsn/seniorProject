import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import { FaUserTie, FaStar } from 'react-icons/fa';
import { Redirect } from 'react-router'



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
                <div>{order.user_id}</div>
                <div>${order.total.toFixed(2)}</div>
                <div>{order.pickupTime}</div>
                <div>{order.comments}</div>
            </div>
		);
    }

    return (
			<div className='kitchenWrapper'>
				<div className='kitchenHeader'>
					<Header user={userData.firstName} view={userData.view} />
				</div>

				<div className='kitchenSide'>
					<div className='kitchenSidePicAndStars'>
						<div className='kitchenSidePic'>
							<div className='kitchenSidePicInner'>
								<FaUserTie size={200} />
							</div>
							<div className='kitchenSideStars'>
								<FaStar size={32} />
								<FaStar size={32} />
								<FaStar size={32} />
								<FaStar size={32} />
								<FaStar size={32} />
							</div>
						</div>
					</div>

					<div className='kitchenSideLinks'>
						<div
							className='kitchenSideLinksOrders'
							onClick={() => alert("get upcoming orders")}>
							<h5>Upcoming Orders</h5>
						</div>
						<div
							className='kitchenSideLinksFavs'
							onClick={() => alert("get all orders")}>
							<h5>All Orders</h5>
						</div>
					</div>

					<div className='kitchenSideFooter'>
						<div className='kitchenSideFooterEmail'>
							<h6>{userData.email}</h6>
						</div>
						<div className='kitchenSideFooterID'>
							<h6>ID: {userData.user_id}</h6>
						</div>
					</div>
				</div>

				<div className='kitchenBody'>
					<div className='kitchenBodyHeaders'>
						<h5>User ID</h5>
						<h5>Total</h5>
						<h5>Pickup Time</h5>
						<h5>Comments</h5>
					</div>
					<div className='kitchenBodyData'>
						{orders ? orders.map(renderOrders) : null}
					</div>
				</div>
			</div>
		);
}

export default Kitchen;
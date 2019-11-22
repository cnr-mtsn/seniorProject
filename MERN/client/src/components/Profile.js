import React, {useState} from 'react';
import Header from '../components/Header';

import { FaUserTie, FaStar, FaStarHalf } from 'react-icons/fa';


function Profile(props) {

	const getUserStats = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${user.user_id}`)
			.then(response => response.json())
			.then(response => setUserData(response.data[0]))
			.catch(err => console.log(err));
	};

	const [user] = useState(props.user);
	const [userData, setUserData] = useState(getUserStats());

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
						<div className='profileBodyItem'>
							<div className='profileBodyDataName'>Roast Beef</div>
							<div className='profileBodyDataPrice'>$4.20</div>
							<div className='profileBodyDataDate'>11/20/2019</div>
							<div className='profileBodyDataItems'>View Order</div>
						</div>
					</div>
				</div>
			</div>
		);
}


export default Profile;
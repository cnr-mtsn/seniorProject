import React, {useState} from 'react';
import Header from '../components/Header';

import { FaCoins } from 'react-icons/fa';


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
		<div className="profileWrapper">

			<div className="profileHeader">
				<Header user={user} view={userData.view}/>
			</div>

			<div className="profileBody">
				<h6>First Name: {userData.firstName}</h6>
				<h6>Last Name: {userData.lastName}</h6>
				<h6>Email: {userData.email}</h6>
				<h6>Admin: {userData.isAdmin}</h6>
				<h6>Total Spent: <FaCoins/>${userData.total_spent}</h6>
				<h6>Total Health Points: {userData.total_health_points}</h6>
				<h6>View: {userData.view}</h6>
			</div>

		</div>
	);
}


export default Profile;
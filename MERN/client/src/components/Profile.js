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

			<div className="profileSide">
				<div className="profileSidePicAndStars">
					<div className="profileSidePic">pic</div>
					<div className="profileSideStars">stars</div>
				</div>
				<div className="profileSideLinks">Links</div>
				<div className="profileSideFooter">Email, ID</div>
			</div>

			<div className="profileBody">
				<div className="profileBodyLabels">Labels</div>
				<div className="profileBodyData">BodyData</div>
			</div>

		</div>
	);
}


export default Profile;
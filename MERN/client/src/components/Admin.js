import React, {useState} from 'react';
import AdminItems from '../components/AdminItems';
import Header from '../components/Header';


function Admin(props) {

	const getUserStats = async () => {
		await fetch(`http://localhost:5000/userByIdAll?id=${props.user}`)
			.then(response => response.json())
			.then(response => setUserData(response.data[0]))
			.catch(err => console.log(err));
	};

	const [userData, setUserData] = useState(getUserStats);

	
    return (
		<div className="adminWrapper">

			<div className="adminHeader">
				<Header user={userData.firstName} view={userData.view}/>
			</div>

			<div className="adminMainContent">
				<AdminItems category=''/>
			</div>

		</div>
	);
}

export default Admin;
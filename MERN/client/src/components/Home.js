import React, {useState} from "react";
import Header from "../components/Header";
import {Input, Button} from 'reactstrap';

function Home(props) {
	
	const [userID, setUserID] = useState();
	const [user, setUser] = useState();

	const handleIDInput = e => {
		setUserID(e.target.value);
	}
	const getUser = () => {
		getUserData();
		switch(userView) {
			case 1: 
				//route to order form
				break;
			case 2: 
				//route to kitchen view
				break;
			case 3:
				//route to admin page
				break;
			default:
				//route home
		}
	};

	const getUserData = async () => {
		await fetch(`http://localhost:5000/userById?id=${userID}`)
		.then(response => response.json())
		.then(response => setUser(response.data))
		.catch(err => console.log(err));
	}
	
	const userName = (user ? user[0].firstName : '');
	const userView = (user ? user[0].view : 0);

	return (
		<div className='homeWrapper'>

			<div className='homeHeader'>
				<Header user={userName}/>
			</div>

			<div className='homeContainer'>

				<div className='homeInput'>
					<Input placeholder='User ID' onChange={handleIDInput}></Input>
				</div>
				
				<div className='homeButton'>
					<Button className='hb' type='submit' onClick={getUser}>
						Login
					</Button>
				</div>

			</div>

		</div>
	);
}

export default Home;

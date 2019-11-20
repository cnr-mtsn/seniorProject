import React from 'react';
import AdminItems from '../components/AdminItems';
import Header from '../components/Header';


function Admin(props) {
	
    return (
		<div className="adminWrapper">

			<div className="adminHeader">
				<Header user={props.user} view={props.user.view}/>
			</div>

			<div className="adminMainContent">
				<AdminItems category=''/>
			</div>

		</div>
	);
}

export default Admin;
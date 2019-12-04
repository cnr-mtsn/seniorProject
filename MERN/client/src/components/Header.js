import React from "react";
import fedEatsLogo from "../media/fedEatsLogo.jpeg";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function Header(props) {
	const activeLinkStyle = {color:'white'}

	const welcomeText = props.user ? (
		`Welcome, ${props.user}`
	) : null;

	var adminVis;
	var userVis;
	var kitchenVis;
	
	switch(props.view) {
		case 1:
			//users
			userVis='inline';
			break;
		case 2:
			//kitchen staff
			userVis = 'inline';
			kitchenVis = 'inline';
			break;
		case 3:
			//admin
			adminVis = 'inline';
			kitchenVis = 'inline';
			userVis = 'inline';
			break;
		default:
			adminVis = 'none';
			userVis = 'none';
			kitchenVis = 'none';
	}

	const icon = props.user ? ( 
		<FaUserCircle size={36} /> 
	) : null;

	const userView = {
		display: `${userVis}`,
		color: 'black'
	};
	const kitchenView = {
		display: `${kitchenVis}`,
		color: 'black'
	}
	const adminView = {
		display: `${adminVis}`,
		color: 'black'
	}


	return (
		<div className='mainHeader'>
			<div className='headerImg'>
				<Image style={{ height: "10vh" }} src={fedEatsLogo}></Image>
			</div>

			<div className='headerLinks'>
				
					<NavLink exact style={userView} activeStyle={activeLinkStyle} to='/'>
						Home
					</NavLink>
				
					<NavLink
						exact
						style={userView}
						activeStyle={activeLinkStyle}
						to='/orderForm'>
						Order
					</NavLink>
				
					<NavLink
						exact
						style={userView}
						activeStyle={activeLinkStyle}
						to='/profile'>
						My Profile
					</NavLink>
			
					<NavLink
						exact
						style={kitchenView}
						activeStyle={activeLinkStyle}
						to='/kitchen'>
						Kitchen
					</NavLink>
				
					<NavLink
						exact
						style={adminView}
						activeStyle={activeLinkStyle}
						to='/admin'>
						Admin
					</NavLink>
				
			</div>

			<div className='userGreeting'>
				{icon}
				<span className='grtng'>{welcomeText}</span>
			</div>
		</div>
	);
}

export default Header;

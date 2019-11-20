import React from "react";
import fedEatsLogo from "../media/fedEatsLogo.jpeg";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function Header(props) {
	const linkStyle = {color:'black'}
	const activeLinkStyle = {color:'white'}

	const homeLink = (
		<NavLink 
			exact
			style={linkStyle}
			activeStyle={activeLinkStyle} 
			to='/'>
		Home
		</NavLink>
	);
	const orderFormLink = (
		<NavLink 
			exact
			style={linkStyle} 
			activeStyle={activeLinkStyle} 
			to='/orderForm'>
		Order
		</NavLink>
	);
	const profileLink = (
		<NavLink 
			exact
			style={linkStyle} 
			activeStyle={activeLinkStyle} 
			to='/profile'>
		My Profile
		</NavLink>
	);
	const adminLink = (
		<NavLink 
			exact
			style={linkStyle} 
			activeStyle={activeLinkStyle}
			to='/admin'>
		Admin
		</NavLink>
	);

	const welcomeText = props.user ? (
		`Welcome, ${props.user.firstName}`
	) : null;

	var adminVis;
	var userVis;
	switch(props.view) {
		case 1:
			userVis = 'visible';
			adminVis= 'hidden';
			break;
		case 2:
			userVis = 'visible';
			adminVis= 'hidden';
			break;
		case 3:
			adminVis = 'visible';
			userVis = "visible";
			break;
		default:
			adminVis = 'hidden';
			userVis = 'hidden';
	}

	const icon = props.user ? ( <FaUserCircle size={36} style={{marginLeft:'75%'}}/> ) : null;


	return (
		<div className='mainHeader'>
			<div className='fedEatsLogo'>
				<Image className='fedEatsLogoImg' src={fedEatsLogo}></Image>
			</div>
			<div style={{ visibility: `${userVis}` }} className='homeLink'>
				{homeLink}
			</div>
			<div style={{ visibility: `${userVis}` }} className='orderFormLink'>
				{orderFormLink}
			</div>
			<div style={{ visibility: `${userVis}` }} className='profileLink'>
				{profileLink}
			</div>
			<div style={{ visibility: `${adminVis}` }} className='adminLink'>
				{adminLink}
			</div>
			<div className='userIcon'>{icon}</div>
			<div className='userGreeting'>
				<span className='grtng'>{welcomeText}</span>
			</div>
		</div>
	);
}

export default Header;

import React from "react";
import fedEatsLogo from "../media/fedEatsLogo.jpeg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function Header(props) {
	
	const homeLink = <Link to='/home'><span className="navLinks">Home</span></Link>;

	const orderFormLink = (
		<Link to='/orderForm'>
			<span className='navLinks'>Order Form</span>
		</Link>
	);
	const profileLink = (
		<Link to='/profile'>
			<span className='navLinks'>View Profile</span>
		</Link>
	);
	const adminLink = (
		<Link to='/admin'>
			<span className='navLinks'>Admin</span>
		</Link>
	);
	const welcomeText = props.user ? (
		`Welcome, ${props.user}`
	) : null;

	const icon = props.user ? 
		( <FaUserCircle size={36} style={{marginLeft:'75%'}}/> ) : null;

	return (
		<div className='mainHeader'>
			<div className='fedEatsLogo'>
				<Image className='fedEatsLogoImg' src={fedEatsLogo}></Image>
			</div>
			<div className='homeLink'>{homeLink}</div>
			<div className='orderFormLink'>{orderFormLink}</div>
			<div className='profileLink'>{profileLink}</div>
			<div className='adminLink'>{adminLink}</div>
			<div className='userIcon'>
				{icon}
			</div>
			<div className='userGreeting'>
				<span className="grtng">{welcomeText}</span>
			</div>
		</div>
	);
}

export default Header;

import React from "react";
import fedEatsLogo from "../media/fedEatsLogo.jpeg";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

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
	const welcomeText = (props.user ? `Welcome, ${props.user}` : null);

	return (
		<div className="mainHeader">
			<div className="fedEatsLogo"><Image className="fedEatsLogoImg" src={fedEatsLogo}></Image></div>
			<div className="homeLink">{homeLink}</div>
			<div className="orderFormLink">{orderFormLink}</div>
			<div className="profileLink">{profileLink}</div>
			<div className="adminLink">{adminLink}</div>
			<div className="user navLinks">{welcomeText}</div>
		</div>
	);
}

export default Header;

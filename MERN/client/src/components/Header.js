import React, {useState} from "react";
import fedEatsLogo from "../media/fedEatsLogo.jpeg";
import ckLogo from "../media/companyKitchenLogo.jpeg";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

function Header(props) {
	const logo1 = ( <Image className='fedEatsLogo' src={fedEatsLogo} alt='fedEats' rounded /> );
	const title = <h6 className='mainHeaderText'>{props.title}</h6>;
	const logo2 = <Image className='ckLogo d-none d-sm-block' src={ckLogo} alt='CompanyKitchen' />;

	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);

	const homeLink = <Link to='/home'><span className="navLinks">Home</span></Link>;
	// const loginLink = <Link to='/login'><span>Login</span></Link>;
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

	return (
		<div className="mainHeader">
			<div className="fedEatsLogo"><Image className="fedEatsLogoImg" src={fedEatsLogo}></Image></div>
			<div className="homeLink">{homeLink}</div>
			<div className="orderFormLink">{orderFormLink}</div>
			<div className="profileLink">{profileLink}</div>
			<div className="adminLink">{adminLink}</div>
		</div>
	);
}

export default Header;

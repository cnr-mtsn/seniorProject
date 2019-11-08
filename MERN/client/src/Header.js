import React, {useState} from "react";
import fedEatsLogo from "./media/fedEatsLogo.jpeg";
import ckLogo from "./media/companyKitchenLogo.jpeg";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

function Header(props) {
	const logo1 = ( <Image className='fedEatsLogo' src={fedEatsLogo} alt='fedEats' rounded /> );
	const title = <h6 className='mainHeaderText'>{props.title}</h6>;
	const logo2 = <Image className='ckLogo d-none d-sm-block' src={ckLogo} alt='CompanyKitchen' />;

	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);

	const homeLink = <Link to='/home'><span>Home</span></Link>;
	// const loginLink = <Link to='/login'><span>Login</span></Link>;
	const orderFormLink = <Link to='/orderForm'><span>Order Form</span></Link>;
	const profileLink = <Link to='/profile'><span>View Profile</span></Link>;
	const adminLink = <Link to='/admin'><span>Admin</span></Link>;

	return (
	
		<div>
			<Navbar color="faded" dark>
				<NavbarBrand className="mr-auto">{logo1}</NavbarBrand>
				<NavbarBrand>{title}</NavbarBrand>
				<NavbarBrand className="ml-auto">{logo2}</NavbarBrand>
				<NavbarToggler onClick={toggleNavbar} className="mr-2"/>
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						<NavItem className="navList">{homeLink}</NavItem>
						{/* <NavItem className="navList">{loginLink}</NavItem> */}
						<NavItem className="navList">{orderFormLink}</NavItem>
						<NavItem className="navList">{profileLink}</NavItem>
						<NavItem className="navList">{adminLink}</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header;

import React from "react";
import Header from "../components/Header";
import SpecialsSlideshow from "../components/SpecialsSlideshow";

import { Jumbotron } from "reactstrap";

function Home() {


	return (
		<div className='wrapper'>
			<div className="header">
				<Header title='Fed Eats Home' />
			</div>
			<div className="slideshow">
				<Jumbotron className='myJumbotron'>
					<SpecialsSlideshow />
				</Jumbotron>
			</div>
		</div>
	);
}

export default Home;

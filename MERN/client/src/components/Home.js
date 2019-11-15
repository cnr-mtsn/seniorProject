import React from "react";
import Header from "../components/Header";
import SpecialsSlideshow from "../components/SpecialsSlideshow";

import { Jumbotron } from "reactstrap";

function Home() {


	return (
		<div className='homeWrapper'>
			<div className="homeHeader">
				<Header title='Fed Eats Home' />
			</div>
			<div className="homeSlideshow">
				<Jumbotron className='myJumbotron'>
					<SpecialsSlideshow />
				</Jumbotron>
			</div>
		</div>
	);
}

export default Home;

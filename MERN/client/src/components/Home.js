import React from "react";
import Header from "../components/Header";


function Home() {


	return (
		<div className='homeWrapper'>

			<div className="homeHeader">
				<Header title='Fed Eats Home' />
			</div>
			<div className="homeBody">
				Welcome to Fed Eats
			</div>
			
		</div>
	);
}

export default Home;

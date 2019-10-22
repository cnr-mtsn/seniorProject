import React from "react";
import { Carousel, Image } from "react-bootstrap";
import pastrami from "./media/pastrami.png";
import capreseGrilledCheese from "./media/capreseGrilledCheese.png";
import frenchDip from "./media/frenchDip.png";
import "./App.css";

function SpecialsSlideshow(props) {
	return (
		<Carousel>
			<Carousel.Item>
				<Image
					className='d-block w-100 specialImage'
					src={pastrami}
					alt='N.Y. Beef & Pastrami on Rye'
				/>
				<Carousel.Caption className='specialDetails'>
					<h3>N.Y. Beef & Pastrami on Rye</h3>
					<p>
						Corned beef and pastrami sandwich with Swiss and spicy brown mustard
						on marbled rye!
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<Image
					className='d-block w-100 specialImage'
					src={capreseGrilledCheese}
					alt='Caprese Grilled Cheese'
				/>
				<Carousel.Caption className='specialDetails'>
					<h3>Caprese Grilled Cheese</h3>
					<p>
						Bread slices are layered with fresh mozzarella, fresh basil and
						fresh tomatoes then cooked in a hot skillet until golden brown and
						melty delicious!
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<Image
					className='d-block w-100 specialImage'
					src={frenchDip}
					alt='French Dip & Swiss'
				/>
				<Carousel.Caption className='specialDetails'>
					<h3>French Dip & Swiss</h3>
					<p>
						Black Angus roast beef with melted Swiss on a toasted baguette and
						served with yummy au jus dipping sauce!
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}

export default SpecialsSlideshow;
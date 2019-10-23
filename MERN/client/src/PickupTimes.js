import React, { useState, useEffect } from "react";
import { Input, Label } from "reactstrap";

function PickupTimes() {
	const [times, setTimes] = useState([]);
	useEffect(() => {
		getTimes(); //eslint-disable-next-line
	}, []);

	const getTimes = async () => {
		fetch(`http://localhost:5000/pickupTimes`)
			.then(response => response.json())
			.then(response => setTimes(response.data))
			.catch(err => console.error(err));
	};

	const renderTimes = time => {
		
		return (
			<option key={time.time_id}>{time.pickupTime}</option>
		);
	};
	return (
		<div>
			<Label check>
					<Input type='select'>
						{times.map(renderTimes)}
						<option disabled defaultValue="Pickup Time"></option>
					</Input>
			</Label>
		</div>
	);
}

export default PickupTimes;

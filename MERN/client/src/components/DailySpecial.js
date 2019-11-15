import React from "react";
import ItemHeader from "../components/ItemHeader";
import "../App.css";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";

function DailySpecial() {
	return (
		<div>
			<Row>
				<Col>
					<ItemHeader title='Daily Special' />
				</Col>
			</Row>
			<Row>
				<Col>
					<ul className='orderItems'>
						<li className='orderItem'>
							<Label check>
								<Input type='checkbox' />
								<span>N.Y. Beef & Pastrami on Rye</span>
							</Label>
						</li>
					</ul>
				</Col>
				<Col sm={1}></Col>
				<Col>
					<span className='orderItems'>Customize the special below...</span>
					<FormGroup>
						<ul className='orderItems'>
							<li className='orderItem'>
								<Label check>
									<Input type='checkbox' />
									<span>Red Onions</span>
								</Label>
							</li>
							<li className='orderItem'>
								<Label check>
									<Input type='checkbox' />
									<span>Sprouts</span>
								</Label>
							</li>
							<li className='orderItem'>
								<Label check>
									<Input type='checkbox' label="Hot Peppers"/>
									<span>Hot Peppers</span>
								</Label>
							</li>
						</ul>
					</FormGroup>
				</Col>
			</Row>
		</div>
	);
}

export default DailySpecial;

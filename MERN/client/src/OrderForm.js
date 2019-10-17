import React from "react";
import NavigationBar from "./NavigationBar";
import "./App.css";
import Header from "./Header";
import OrderItem from "./OrderItem";
import PickupTimes from "./PickupTimes";
import Comments from "./Comments";
import { Jumbotron, Container, Row, Col, Form } from "reactstrap";
import DailySpecial from "./DailySpecial";

function OrderForm() {
	return (
		<Container>
			<Row>
				<Col>
					<Header title='Order Form' />
				</Col>
			</Row>
			<Row>
				<Col>
					<NavigationBar />
				</Col>
			</Row>
			<Row>
				<Col>
					<Jumbotron className='myJumbotron'>
						<Form>
							<Row>
								<Col>
									<DailySpecial />
								</Col>
							</Row>
							<Row>
								<Col>
									<OrderItem item='bread' />
								</Col>
								<Col sm={1}></Col>
								<Col>
									<OrderItem item='tortilla' />
								</Col>
							</Row>
							<Row>
								<Col>
									<OrderItem item='protein' />
								</Col>
								<Col sm={1}></Col>
								<Col>
									<OrderItem item='cheese' />
								</Col>
							</Row>
							<Row>
								<Col>
									<OrderItem item='veggie' />
								</Col>
								<Col sm={1}></Col>
								<Col>
									<OrderItem item='condiment' />
								</Col>
							</Row>
							<Row>
								<Col>
									<OrderItem item='extra' />
								</Col>
								<Col sm={1}></Col>
								<Col>
									<Comments />
								</Col>
							</Row>
							<Row>
								<Col>
									<PickupTimes />
								</Col>
							</Row>
						</Form>
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	);
}

export default OrderForm;

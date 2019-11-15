import React, {useState} from 'react';
import Header from '../components/Header';
import { 
	Button,
	Card,
	CardTitle,
	Input,
	Jumbotron, 
	Container, 
	Row, 
	Col 
} from 'reactstrap';
import { FaUserSecret, FaCoins } from 'react-icons/fa';


function Profile(props) {

		const [userID, setUserId] = useState();
		const [profile, setProfile] = useState();
		const [userStats, setUserStats] = useState([]);
		const profileToView = (userStats.length > 0 && profile) ? ProfileView(userStats) : undefined
		
		const handleUserIdInput = (e) => {
			setUserId(e.target.value);
		}

		const handleViewProfileClick = () => {
			fetch(`http://localhost:5000/userStats?userID=${userID}`)
			.then(response => response.json())
			.then(response => setUserStats(response.data))
			setProfile(true);
		}

    return (
			<Container fluid>
				<Row>
					<Col>
						<Header title='Fed Eats Profile' />
					</Col>
				</Row>
				<Row>
					<Col></Col>
					<Col>
						<Card className="profileSelectCard">
							<CardTitle className="profileSelectTitle">Input User ID to View Profile</CardTitle>
							<br></br>
							<Row>
								<Col lg={1}></Col>
								<Col lg={7}>
									<Input
									required
									placeholder="User ID"
									onChange={handleUserIdInput}
									></Input>
								</Col>
								<Col lg={3}>
									<Button
										type="button"
										outline
										color="primary"
										style={{width:'100%'}}
										onClick={handleViewProfileClick}
										>Go
									</Button>
								</Col>
								<Col lg={1}></Col>
							</Row>
							{profileToView}
						</Card>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		);
}

function ProfileView(userStats) {
	console.log(userStats[0])

	return (
		<Container fluid>
			<br></br>
			<Row>
				<Col lg={2}>{userStats[0]["name"]}</Col>
				<Col lg={5}>
					<Col>Total Health Points:</Col>
					<Col>{userStats[0]["total_health_points"]}</Col>
				</Col>
				<Col lg={5}>
					<Col>Total Spent:</Col>
					<Col>${userStats[0]["total_spent"]}</Col>
				</Col>
			</Row>
			<br></br>
		</Container>
	);
}

export default Profile;
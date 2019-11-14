import React, {useState} from 'react';
import AdminItems from './AdminItems';
import AdminSpecials from './AdminSpecials';
import Header from './Header';
import { Button, Jumbotron, Container, Row, Col } from 'reactstrap';


function Admin(props) {

	const [category, setCategory] = useState('specials');
	
    const handleCategoryClick = () => {
        category === 'ingredients' ? setCategory('specials') : setCategory('ingredients');
    }
    const contentToManage = category === "specials" ? <AdminSpecials /> : <AdminItems category=''/>;
    const buttonText = category === 'specials' ? 'Ingredients' : 'Specials';
    return (
			<Container fluid>
				<Row>
					<Col>
						<Header title='Fed Eats Admin' />
					</Col>
				</Row>
				<Row>
					<Col>
						<div style={{ marginLeft: "1vw", width: "150px" }}>
							<Button
								style={{ width: "100%" }}
								color='secondary'
								onClick={handleCategoryClick}>
								{buttonText}
							</Button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<Jumbotron className='myJumbotron'>{contentToManage}</Jumbotron>
					</Col>
				</Row>
			</Container>
		);
}

export default Admin;
import React, { useState, useEffect } from "react";
import {
	Table,
	Button,
	Input,
	Row,
	Col,
	InputGroup,
	InputGroupAddon
} from "reactstrap";
import "./App.css";

function AdminItems(props) {

/************ STATE MANAGEMENT ************/
  //current category of admin_items
  const [category, setCategory] = useState(props.category);
  //all items of current category
  const [items, setItems] = useState([]);
  //name && price of item to add/update
  const [newItem, setNewItem] = useState( {
    name: '', 
    price: 0, 
    healthPoints: 0
  });
  //name && price of item being updated
  const [itemToChange, setItemToChange] = useState( {
    name: '', 
    price: 0, 
    healthPoints: 0
  });

  useEffect(() => {
    getItems(); //eslint-disable-next-line
  }, []);
/************ END STATE MANAGEMENT ************/

  /************ FUNCTIONS ************/
  //fetch all items of current category and load into state items
  const getItems = async () => {
    fetch(`http://localhost:5000/${category}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
    .catch(err => console.error(err))
  };
  //add item to current category with name && price == newItem{name, price}
  const addItem = async () => {
    fetch(`http://localhost:5000/${category}/add?name=${newItem.name}&price=${newItem.price}&healthPoints=${newItem.healthPoints}`)
    .then(getItems)
    .then(setNewItem({name: null, price: null, healthPoints: null}))
    .catch(err => console.error(err))
  };
  //update item in current category to newItem.[name || price]
  const updateItem = async () => {
    fetch(`http://localhost:5000/${category}/update?name=${itemToChange.name}&newName=${newItem.name}&newPrice=${newItem.price}&newHP=${newItem.healthPoints}`)
    .then(getItems)
    .catch(err => console.err(err))
  };
  //delete item of current category with name == item.name
  const deleteItem = async (name) => {
    fetch(`http://localhost:5000/${category}/delete?name=${name}`)
    .then(getItems)
    .then(console.log(`removed: ${name}`))
    .catch(err => console.error(err))
  };
  //set name of ItemToChange&&NewItem when input box edited
  const handleNameChange = (e) => {
    setItemToChange( {
      name: e.target.placeholder,
      price: itemToChange.price, 
      healthPoints: itemToChange.healthPoints
    });
    setNewItem( {
      name: e.target.value,
      price: newItem.price, 
      healthPoints: newItem.healthPoints
    })
  };
  //set price of ItemToChange&&NewItem when input box edited
  const handlePriceChange = (e) => {
    setItemToChange( {
      name: itemToChange.name,
     price: e.target.placeholder, 
     healthPoints: itemToChange.healthPoints
    });
    setNewItem( {
      name: newItem.name,
      price: e.target.value, 
      healthPoints: itemToChange.healthPoints
    });
  };
  //set healthPoints of ItemToChange && NewItem when input box edited
  const handleHealthPointsChange = (e) => {
    setItemToChange({
      name: itemToChange.name,
      price: itemToChange.price,
      healthPoints: e.target.placeholder
    });
    setNewItem({
      name: newItem.name,
      price: newItem.price,
      healthPoints: e.target.value
    })
  };
  const handleCategorySelection = (selection) => {
    fetch(`http://localhost:5000/${selection}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
    .then(setCategory(selection))
    .then(console.log("selected"))
  }
  const handleAddClick = () => {
    addItem();
  }
  const handleUpdateClick = () => {
    updateItem();
  }
  //render items as table of editable input boxes with buttons for updating/deleting data
  const renderItem = (item) => {
    //convert price in database to string preceded by $ and fixed to 2 decimals
    const fixedPrice ='$' + item.price.toFixed(2);
    return (
    <tr key={item.name}>
      <td>
        <Input placeholder={item.name} onChange={handleNameChange} className="manageItemPrice"></Input></td>
      <td>
        <Input placeholder={fixedPrice} onChange={handlePriceChange} className="manageItemPrice"></Input>
      </td>
      <td>
        <Input placeholder={item.health_points} onChange={handleHealthPointsChange} className="manageItemPrice"></Input>
      </td>
      <td>
        <InputGroupAddon addonType="append">
          <Button block outline color="primary" type="button" onClick={handleUpdateClick}className="manageItemButton manageItemPrice">Update</Button>
        </InputGroupAddon>
      </td>
      <td>
        <InputGroupAddon addonType="append">
          <Button block outline color="danger" type="button" className="manageItemButton manageItemPrice" onClick={(e) => { deleteItem(item.name)}}>Delete
          </Button>
        </InputGroupAddon>
      </td>
    </tr>
    );
  };
  /************ END FUNCTIONS ************/
  /************ HTML ELEMENTS ************/
    const categoryCap = category.charAt(0).toUpperCase() + category.substring(1);
 
    const nameInput = <Input placeholder="Name" onChange={e => setNewItem({
      name: e.target.value,
      price: null
    })}/>;
    const priceInput = <Input placeholder="Price" onChange={e => setNewItem({
      name: newItem.name,
      price: e.target.value
    })}/>;
    const healthPointsInput = <Input placeholder="Health Points" onChange={e => setNewItem({
      name: newItem.name,
      price: newItem.price,
      healthPoints: e.target.value
    })}/>;
    const addItemButton = ( 
      <InputGroupAddon addonType="append">
        <Button block className="purpleButton" style={{outline:'none', width:'150px'}} onClick={handleAddClick}
        >Add {categoryCap}
        </Button>
      </InputGroupAddon>
    );
  
    const selectCategory = (
      <div className="adminSelectCategory">
        <ul className="bg-light list-group">
          <span className="text-muted">Choose a Category...</span>
          <li className="list-group-item list-group-item-action" value='bread' onClick={handleCategorySelection.bind(this, 'bread')}>Bread</li>
          <li className="list-group-item list-group-item-action" value='tortilla' onClick={handleCategorySelection.bind(this, 'tortilla')}>Tortillas</li>
          <li className="list-group-item list-group-item-action" value='protein' onClick={handleCategorySelection.bind(this, 'protein')}>Protein</li>
          <li className="list-group-item list-group-item-action" value='cheese' onClick={handleCategorySelection.bind(this, 'cheese')}>Cheese</li>
          <li className="list-group-item list-group-item-action" value='veggie' onClick={handleCategorySelection.bind(this, 'veggie')}>Veggies</li>
          <li className="list-group-item list-group-item-action" value='condiment' onClick={handleCategorySelection.bind(this, 'condiment')}>Condiments</li>
          <li className="list-group-item list-group-item-action" value='extra' onClick={handleCategorySelection.bind(this, 'extra')}>Extras</li>
        </ul>
      </div>
    );
    const addItemInputGroup = category ? (
			<InputGroup className='addItemInput'>
				{nameInput}
				{priceInput}
				{healthPointsInput}
				{addItemButton}
			</InputGroup>
		) : null;
		const tableHeader = category ? (
			<tr className='manageItemHeader'>
				<td>Name</td>
				<td>Price</td>
				<td>Health Points</td>
				<td></td>
				<td></td>
			</tr>
		) : null;
    /************ END HTML ELEMENTS ************/
    /************ DATA TO RENDER VIA COMPONENT ************/
    return ( 
      <div className="items">
        <Row>
          <Col lg={2}>{selectCategory}</Col>
          <Col lg={1}></Col>
          <Col>
            <div className="adminTable">
              <Table className="itemTable itemDetailsTable bg-light">
                <thead>
                  {tableHeader}
                </thead>
                <tbody>
                  {items.map(renderItem)}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}></Col>
          <Col>
            {addItemInputGroup}
          </Col>
        </Row>
      </div>
    );
}

export default AdminItems;

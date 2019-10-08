import React, { useState, useEffect } from 'react';
import { Table, 
        Button, 
        Input, 
        Row, 
        Col, 
        InputGroup, 
        InputGroupAddon, 
        Container
        } from 'reactstrap';
import './App.css';

function Items(props) {

  const [category, setCategory] = useState(props.category);
  const [items, setItems] = useState([]);
  // const [newPrice, setNewPrice] = useState();
  // const [newName, setNewName] = useState();
  // const [itemToChange, setItemToChange] = useState( {
  //   name: '', 
  //   price: null
  // })
  const [newItem, setNewItem] = useState( {
    name: '', 
    price: null
  });

  
  useEffect(() => {
    getItems();
  }, [])


  //ITEMS
  const getItems = async () => {
    fetch(`http://localhost:5000/${category}`)
    .then(response => response.json())
    .then(response => setItems(response.data))
    .catch(err => console.error(err))
  };
  const addItem = async () => {
    fetch(`http://localhost:5000/${category}/add?name=${newItem.name}&price=${newItem.price}`)
    .then(getItems)
    .then(setNewItem({name: null, price: null}))
    .catch(err => console.error(err))
  };
  const deleteItem = async (name) => {
    fetch(`http://localhost:5000/${category}/delete?name=${name}`)
    .then(getItems)
    .then(console.log(`removed: ${name}`))
    .catch(err => console.error(err))
  };

  const renderItem = (item) => {
    const fixedPrice ='$' + item.price.toFixed(2);
    return (
    <tr key={item.name}>
      <td>
        <Input placeholder={item.name} ></Input>
      </td>
      <td>
        <Input placeholder={fixedPrice} className="manageItemPrice"></Input>
      </td>
      <td>
        <InputGroupAddon addonType="append">
          {/* IMPLEMENT UPDATE ITEM ONCLICK() */}
          <Button block outline color="primary" type="button" className="manageItemButton manageItemPrice">Update</Button>
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
 
    const categoryCap = category.charAt(0).toUpperCase() + category.substring(1);
    const nameInput = <Input placeholder="Name" onChange={e => setNewItem({
      name: e.target.value,
      price: null
    })}/>;
  
    const priceInput = <Input placeholder="Price" onChange={e => setNewItem({
      name: newItem.name,
      price: e.target.value
    })}/>;

    const addItemButton = ( 
      <InputGroupAddon addonType="append">
        <Button block outline color="success" onClick={handleAddClick}
        >Add {categoryCap}
        </Button>
      </InputGroupAddon>
    );

    
    const selectCategory = (
      <ul className="adminSelectCategory bg-light list-group">
        <span className="text-muted">Choose a Category...</span>
        <li className="list-group-item list-group-item-action" value='bread' onClick={handleCategorySelection.bind(this, 'bread')}>Bread</li>
        <li className="list-group-item list-group-item-action" value='tortilla' onClick={handleCategorySelection.bind(this, 'tortilla')}>Tortillas</li>
        <li className="list-group-item list-group-item-action" value='protein' onClick={handleCategorySelection.bind(this, 'protein')}>Protein</li>
        <li className="list-group-item list-group-item-action" value='cheese' onClick={handleCategorySelection.bind(this, 'cheese')}>Cheese</li>
        <li className="list-group-item list-group-item-action" value='veggie' onClick={handleCategorySelection.bind(this, 'veggie')}>Veggies</li>
        <li className="list-group-item list-group-item-action" value='condiment' onClick={handleCategorySelection.bind(this, 'condiment')}>Condiments</li>
        <li className="list-group-item list-group-item-action" value='extra' onClick={handleCategorySelection.bind(this, 'extra')}>Extras</li>
      </ul>
  )

    return ( 

      <Container className="items">
        <Row>
          <Col xl={3} lg={3}>{selectCategory}</Col>
          <Col>
            <Table className="itemTable bg-light" striped>
              <thead>
                <tr className="manageItemHeader">
                  <th>Manage {categoryCap}s</th>
                </tr>
              </thead>
              <tbody>
                  {items.map(renderItem)}
              </tbody>
            </Table>
          </Col>
        </Row>
        
      
        <Row>
          <Col></Col>
          <Col xl={8} lg={8}>
            <InputGroup className="addItemInput">
              {nameInput}
              {priceInput}
              {addItemButton}
            </InputGroup>
          </Col>
          <Col></Col>
        </Row>
      

      </Container>
    );
}

export default Items;

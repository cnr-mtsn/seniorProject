import React from 'react';
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
export class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      items: [], 
      newItem: {
        name: '', 
        price: null
      }, 
      itemToRemove: {
        name: null
      }
    };
  }
  

  componentDidMount() {
     this.getItems();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  //ITEMS
  getItems = async () => {
    fetch(`http://localhost:5000/${this.state.category}`)
    .then(response => response.json())
    .then(response => this.setState({ items : response.data}))
    .catch(err => console.error(err))
  };
  addItem = async () => {
    const { newItem } = this.state;
    fetch(`http://localhost:5000/${this.state.category}/add?name=${newItem.name}&price=${newItem.price}`)
    .then(this.getItems)
    .then()
    .catch(err => console.error(err))
  };
  deleteItem = async () => {
    const { itemToRemove } = this.state; 
    fetch(`http://localhost:5000/${this.state.category}/delete?name=${itemToRemove.name}`)
    .then(this.getItems)
    .then(console.log(`removed: ${itemToRemove}`))
    .catch(err => console.error(err))
  };
  renderItem = (item) => {
    const {itemToRemove} = this.state;

    return (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td className="d-flex">
        <Button type="button" className="close" aria-label="Close" onClick={(e) => { 
          this.setState({itemToRemove:{...itemToRemove, name: item.name}});
          this.deleteItem();
        }}>
          <span aria-hidden="true">&times;</span>
        </Button>
      </td>
    </tr>
    );
  };
  handleCategorySelection = (selection) => {
    this.setState({category: selection}); 
    this.getItems();
  }
  
  render() {  
    const {items, newItem, category} = this.state;
    const categoryCap = category.charAt(0).toUpperCase() + category.substring(1);
    const nameInput = <Input placeholder="Name" onChange={e => this.setState({newItem: {...newItem, name: e.target.value}})}/>;
    const priceInput = <Input placeholder="Price" onChange={e => this.setState({newItem: {...newItem, price: e.target.value}})}/>;
    const addItemButton = ( 
      <InputGroupAddon addonType="append">
        <Button block outline color="success" onClick={() => {
          this.addItem()
        }}
        >Add {categoryCap}
        </Button>
      </InputGroupAddon>
    );

    const selectCategory = (
      <ul className="adminSelectCategory bg-light list-group">
        <span className="text-muted">Choose a Category</span>
        <li className="list-group-item list-group-item-action" value='bread' onClick={this.handleCategorySelection.bind(this, 'bread')}>Bread</li>
        <li className="list-group-item list-group-item-action" value='tortilla' onClick={this.handleCategorySelection.bind(this, 'tortilla')}>Tortillas</li>
        <li className="list-group-item list-group-item-action" value='protein' onClick={this.handleCategorySelection.bind(this, 'protein')}>Protein</li>
        <li className="list-group-item list-group-item-action" value='cheese' onClick={this.handleCategorySelection.bind(this, 'cheese')}>Cheese</li>
        <li className="list-group-item list-group-item-action" value='veggie' onClick={this.handleCategorySelection.bind(this, 'veggie')}>Veggies</li>
        <li className="list-group-item list-group-item-action" value='condiment' onClick={this.handleCategorySelection.bind(this, 'condiment')}>Condiments</li>
        <li className="list-group-item list-group-item-action" value='extra' onClick={this.handleCategorySelection.bind(this, 'extra')}>Extras</li>
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
                {items.map(this.renderItem)}
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
}

export default Items;

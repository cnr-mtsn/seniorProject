import React from 'react';
import {Col, Row, Container} from 'reactstrap';

import './App.css';
class Admin extends React.Component {
  constructor(props) {
    super();
  }
  state = {
    items: [], 
    newItem: {
      item_id: null, 
      name: '', 
      price: null
    }, 
    itemToRemove: {
      item_id: null
    }
  };

  componentDidMount() {
     this.interval = setInterval(() => this.getItems(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  //ITEMS
  getItems = () => {
    fetch(`http://localhost:5000/${this.props.category}`)
    .then(response => response.json())
    .then(response => this.setState({ items : response.data}))
    .catch(err => console.error(err))
  };
  addItem = async () => {
    const { newItem } = this.state;
    fetch(`http://localhost:5000/${this.props.category}/add?name=${newItem.name}&price=${newItem.price}`)
    .then(this.getItems)
    .then()
    .catch(err => console.error(err))
  };
  deleteItem = async () => {
    const { itemToRemove } = this.state; 
    fetch(`http://localhost:5000/${this.props.category}/delete?name=${itemToRemove.name}`)
    .then(this.getItems)
    .then(console.log(`removed: ${itemToRemove}`))
    .catch(err => console.error(err))
  };
  renderItem = (item) => {
    const {itemToRemove} = this.state;
    return (
    <div key={item.name}>
      <span>${this.props.category}: {item.name} -  ${item.price.toFixed(2)}</span>
      <button onClick={(e) =>  { 
        this.setState({itemToRemove:{...itemToRemove, name: item.name}});
        this.deleteItem();
      }}>delete</button>
      </div>
    );
  };
  


  render() {  
    const {items, newItem} = this.state;
    return (
      <div className="App">
        <header>
          <p>
           Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            <strong>MERN - MySQL, Express, React, Node</strong>
          </p>
        </header>

        <div style={{border: '1px solid black'}} className='container'>
          <h4>{this.props.category}</h4>
          {items.map(this.renderItem)}
        </div>
        <div>
          <input placeholder="Name" onChange={e => this.setState({newItem: {...newItem, name: e.target.value}})}/>
          <input placeholder="Price" onChange={e => this.setState({newItem: {...newItem, price: e.target.value}})}/>
          <button onClick={() => {
               this.addItem()
          }}>Add ${this.props.category}</button>
        </div>
      </div>
    );
  }
}

export default Admin;

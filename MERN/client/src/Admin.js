import React from 'react';
import {Col, Row, Container} from 'reactstrap';

import './App.css';
class Admin extends React.Component {

  state = {
    breads: [], 
    tortillas: [], 
    proteins: [],
    cheeses: [], 
    veggies: [],
    condiments: [], 
    extras: [],
    specials: [], 
    
    newCheese: {
      cheese_id: null, 
      name: '', 
      price: null
    }, 
    cheeseToRemove: {
      cheese_id: null
    },
    newVeggie: {
      veggie_id: null, 
      name: '', 
      price: null
    }, 
    veggieToRemove: {
      veggie_id: null
    }, 
    newBread: {
      sandwich_id: null, 
      name: '', 
      price: null
    }, 
    breadToRemove: {
      sandwich_id: null
    },
    newTortilla: {
      tortilla_id: null, 
      name: '', 
      price: null
    }, 
    tortillaToRemove: {
      tortilla_id: null
    },
    newProtein: {
      protein_id: null, 
      name: '', 
      price: null
    }, 
    proteinToRemove: {
      tortilla_id: null
    },
    newCondiment: {
      condiments_id: null, 
      name: '', 
      price: null
    }, 
    condimentToRemove: {
      condiments_id: null
    },
    newExtra: {
      extras_id: null, 
      name: '', 
      price: null
    }, 
    extraToRemove: {
      extras_id: null
    },
    newSpecial: {
      main_id: null, 
      name: '', 
      price: null
    }, 
    specialToRemove: {
      main_id: null
    },
  };

  componentDidMount() {
     this.interval = setInterval(() => this.getIngredients(), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getIngredients = () => {
    this.getCheeses(); 
    this.getVeggies();
  }
  //CHEESES
  getCheeses = () => {
    fetch('http://localhost:5000/cheeses')
    .then(response => response.json())
    .then(response => this.setState({ cheeses : response.data}))
    .catch(err => console.error(err))
  };
  addCheese = async () => {
    const { newCheese } = this.state;
    fetch(`http://localhost:5000/cheeses/add?cheese_id=${newCheese.cheese_id}&name=${newCheese.name}&price=${newCheese.price}`)
    .then(this.getCheeses)
    .then()
    .catch(err => console.error(err))
  };
  deleteCheese = async () => {
    const { cheeseToRemove } = this.state; 
    fetch(`http://localhost:5000/cheeses/delete?cheese_id=${cheeseToRemove.cheese_id}`)
    .then(this.getCheeses)
    .then(console.log(`removed: ${cheeseToRemove}`))
    .catch(err => console.error(err))
  };
  renderCheese = (cheese) => {
    const {cheeseToRemove} = this.state;
    return (
    <div key={cheese.cheese_id}>
      <span>Cheese: {cheese.cheese_id}, {cheese.name} -  ${cheese.price.toFixed(2)}</span>
      <button onClick={(e) =>  { 
        this.setState({cheeseToRemove:{...cheeseToRemove, cheese_id: cheese.cheese_id}});
        this.deleteCheese();
      }}>delete</button>
      </div>
    );
  };
  //VEGGIES 
  getVeggies = () => {
    fetch('http://localhost:5000/veggies')
    .then(response => response.json())
    .then(response => this.setState({ veggies : response.data}))
    .catch(err => console.error(err))
  };
  addVeggie = async () => {
    const { newVeggie } = this.state;
    fetch(`http://localhost:5000/veggies/add?veggie_id=${newVeggie.veggie_id}&name=${newVeggie.name}&price=${newVeggie.price}`)
    .then(this.getVeggies)
    .then()
    .catch(err => console.error(err))
  };
  deleteVeggie = async () => {
    const { veggieToRemove } = this.state; 
    fetch(`http://localhost:5000/veggies/delete?veggie_id=${veggieToRemove.veggie_id}`)
    .then(this.getVeggies)
    .then(console.log(`removed: ${veggieToRemove}`))
    .catch(err => console.error(err))
  };
  renderVeggie = (veggies) => {
    const {veggieToRemove} = this.state;
    return (
    <div key={veggies.veggie_id}>
      <span>Veggie: {veggies.veggie_id}, {veggies.name} -  ${veggies.price.toFixed(2)}</span>
      <button onClick={(e) =>  { 
        this.setState({veggieToRemove:{...veggieToRemove, veggie_id: veggies.veggie_id}});
        this.deleteVeggie();
      }}>delete</button>
      </div>
    );
  };


  render() {  
    const {cheeses, newCheese, veggies, newVeggie} = this.state;
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
          <h4>Cheeses</h4>
          {cheeses.map(this.renderCheese)}
        </div>
        <div>
          <input placeholder="ID" onChange={e => this.setState({newCheese: {...newCheese, cheese_id: e.target.value}})}/>
          <input placeholder="Name" onChange={e => this.setState({newCheese: {...newCheese, name: e.target.value}})}/>
          <input placeholder="Price" onChange={e => this.setState({newCheese: {...newCheese, price: e.target.value}})}/>
          <button onClick={() => {
               this.addCheese()
          }}>Add Cheese</button>
        </div>

        <div style={{border: '1px solid black'}}>
          <h4>Veggies</h4>
          {veggies.map(this.renderVeggie)}
        </div>
        <div>
          <input placeholder="ID" onChange={e => this.setState({newVeggie: {...newVeggie, veggie_id: e.target.value}})}/>
          <input placeholder="Name" onChange={e => this.setState({newVeggie: {...newVeggie, name: e.target.value}})}/>
          <input placeholder="Price" onChange={e => this.setState({newVeggie: {...newVeggie, price: e.target.value}})}/>
          <button onClick={() => {
               this.addVeggie()
          }}>Add Vegetable</button>
        </div>
      </div>
    );
  }
}

export default Admin;

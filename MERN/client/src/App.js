import React from 'react';
import './App.css';
class App extends React.Component {

  state = {
    cheeses: [], 
    newCheese: {
      cheese_id: null, 
      name: '', 
      price: null
    }, 
    cheeseToRemove: {
      cheese_id: null
    }
  };

  componentDidMount() {
     this.interval = setInterval(() => this.getCheeses(), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
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
    <div key={cheese.email}>
      <span>Cheese: {cheese.cheese_id}, {cheese.name} -  ${cheese.price}</span>
      <button onClick={(e) =>  { 
        this.setState({cheeseToRemove:{...cheeseToRemove, cheese_id: cheese.cheese_id}});
        this.deleteCheese();
      }}>delete</button>
      </div>
    );
  };


  render() {  
    const {cheeses, newCheese} = this.state;
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
          {cheeses.map(this.renderCheese)}
        <div>
          <input placeholder="ID" onChange={e => this.setState({newCheese: {...newCheese, cheese_id: e.target.value}})}/>
          <input placeholder="Name" onChange={e => this.setState({newCheese: {...newCheese, name: e.target.value}})}/>
          <input placeholder="Price" onChange={e => this.setState({newCheese: {...newCheese, price: e.target.value}})}/>
          <button onClick={() => {
               this.addCheese()
          }}>Add Cheese</button>
        </div>
      </div>
    );
  }
}

export default App;

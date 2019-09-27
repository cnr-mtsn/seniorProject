import React from 'react';
import './App.css';
class App extends React.Component {

  state = {
    users: [], 
    newUser: {
      firstName: 'First Name', 
      lastName: 'Last Name', 
      email: 'Email'
    }, 
    currentUser: {
      firstName: '', 
      lastName: '',
      email: ''
    }, 
    userToRemove: {
      email: ''
    }
  };

  componentDidMount() {
     this.interval = setInterval(() => this.getUsers(), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getUsers = () => {
    fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(response => this.setState({ users: response.data}))
    .catch(err => console.error(err))
  };

  addUser = async () => {
    const { newUser } = this.state;
    fetch(`http://localhost:5000/users/add?firstName=${newUser.firstName}&lastName=${newUser.lastName}&email=${newUser.email}`)
    .then(this.getUsers)
    .then()
    .catch(err => console.error(err))
  };

  deleteUser = async () => {
    const { userToRemove } = this.state; 
    fetch(`http://localhost:5000/users/delete?email=${userToRemove.email}`)
    .then(this.getUsers)
    .then(console.log(`removed: ${userToRemove}`))
    .catch(err => console.error(err))
  };
  
  renderUser = (user) => {
    const {userToRemove} = this.state;
    return (
    <div key={user.email}>
      <span>User: {user.lastName}, {user.firstName} - {user.email}</span>
      <button onClick={(e) =>  { 
        this.setState({userToRemove:{...userToRemove, email: user.email}});
        this.deleteUser();
      }}>delete</button>
      </div>
    );
  };


  render() {  
    const {users, newUser} = this.state;
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
          {users.map(this.renderUser)}
        <div>
          <input ref={(input) => { this.textInput = input; }} placeholder={newUser.firstName} onChange={e => this.setState({newUser: {...newUser, firstName: e.target.value}})}/>
          <input placeholder={newUser.lastName} onChange={e => this.setState({newUser: {...newUser, lastName: e.target.value}})}/>
          <input placeholder={newUser.email} onChange={e => this.setState({newUser: {...newUser, email: e.target.value}})}/>
          <button onClick={() => {
               this.addUser()
          }}>Add User</button>
        </div>
      </div>
    );
  }
}

export default App;

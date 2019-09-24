import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import Special from '../components/Special';
import Items from '../components/Items';
import Pickup from '../components/Pickup';
import Comments from '../components/Comments';
import * as serviceWorker from '../serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<Header cuisine="Deli Order Form"/>, document.getElementById('navbar'));
ReactDOM.render(<Special />, document.getElementById('special'));
ReactDOM.render(<Items />, document.getElementById('items'));
ReactDOM.render(<Pickup />, document.getElementById('pickup'));
ReactDOM.render(<Comments />, document.getElementById('comments'));

//ReactDOM.render(<DailySpecial />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
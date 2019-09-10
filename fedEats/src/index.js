import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Special from './Special';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Header />, document.getElementById('navbar'));
ReactDOM.render(<Special />, document.getElementById('special'));
//ReactDOM.render(<DailySpecial />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

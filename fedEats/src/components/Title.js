import React from 'react';
import '../css/App.css';

/*
Title Component: may be rendered in two ways: 

    1: directly to webpage via 'index.js': 
        a) ReactDOM.render(<Title/>, document.getElementById('id'));

    2: in any other component(s) via:
        a) import Title from '../components/Title'
        b) declare <Title name="your text here"></Title> element in components return statement. 
                          
        Prop {name} is passed in at instantiation
          Examples:
            'Items.js' => line(s) {16, 20, 26, 30, 36, 40}
            'Special.js' => line(s) {44}
            'Comments.js' => line(s) {17}
            'Pickup.js' => line(s) {16}
*/


function Title(props) {
    return ( <span className="title">{props.name}</span> );
}

export default Title;
import React from 'react';
import './App.css';

function Title(props) {
    return (
            <h3 className="title">{props.name}</h3>
    );
}

export default Title;
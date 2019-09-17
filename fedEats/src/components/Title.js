import React from 'react';
import '../css/App.css';

function Title(props) {
    return (
            <span className="title">{props.name}</span>
    );
}

export default Title;
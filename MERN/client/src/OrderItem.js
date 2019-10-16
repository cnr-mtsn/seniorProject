import React, { useState, useEffect } from 'react'
import ItemHeader from './ItemHeader'
import { Input, Label } from 'reactstrap';
import './App.css';

function OrderItem(props) {

    const [options, setOptions] = useState([]);
    useEffect(() => {
        getOptions(); //eslint-disable-next-line
    }, []);

    const itemCapPlural = props.item.charAt(0).toUpperCase() + props.item.substring(1) + 's';

    const getOptions = async () => {
        fetch(`http://localhost:5000/${props.item}`)
        .then(response => response.json())
        .then(response => setOptions(response.data))
        .catch(err => console.error(err))
      };
    
    const renderOptions = (option) => {
        const optionCap = option.name.charAt(0).toUpperCase() + option.name.substring(1);
        return (
            <li className="orderItem">
                <Label check>
                    <Input type="checkbox" key={option.name}/>
                    <span>{optionCap}</span>
                </Label>
            </li>
        )
    }
    return ( 
        <div>
            <ItemHeader title={itemCapPlural}/>
            <ul className="orderItems">
                {options.map(renderOptions)}
            </ul>
        </div>
    
    
    
    
    );
}

export default OrderItem;
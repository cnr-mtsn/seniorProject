import React, { useState, useEffect } from 'react';
import { Input, Label } from 'reactstrap';
import ItemHeader from './ItemHeader';

function PickupTimes() {

    const [times, setTimes] = useState([]);
    useEffect(() => {
        getTimes(); //eslint-disable-next-line
    }, []);

    const getTimes = async () => {
        fetch(`http://localhost:5000/pickupTimes`)
        .then(response => response.json())
        .then(response => setTimes(response.data))
        .catch(err => console.error(err))
      };
      
    const renderTimes = (time) => {
        const pickupTime = time.pickupTime;
        return (
            <li className="orderItem">
                <Label check>
                    <Input type="checkbox" key={pickupTime}/>
                    <span>{pickupTime}</span>
                </Label>
            </li>
        );
    }
    return (
        <div>
            <ItemHeader title="Pickup Times"/>
            <ul>
                {times.map(renderTimes)}
            </ul>

        </div>
    );
}

export default PickupTimes;
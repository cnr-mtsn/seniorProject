
/**
 * State is generally only accessible to 'class based components,' but with the
 *  react hook {useState} we can store and use state in a functional Component,
 *  as shown below. 
 */ 
import React, {useState} from 'react';


const Form = () => {

    // Using useState: << [stateName, setStateFunctionName] = useState(initialState) >> 
    const [bread, setBread] = useState(['']); 
    //state name = bread
    //setState() = setBread
    //initial state = empty array of strings
    const [tortilla, setTortilla] = useState(['']); 
    const [protein, setProtein] = useState(['']);
    const [cheese, setCheese] = useState(['']);
    const [veggies, setVeggies] = useState(['']);
    const [condiments, setCondiments] = useState(['']);
    const [extras, setExtras] = useState(['']);
    const [pickupTime, setPickupTime] = useState(['']);


    return (
        <div>
            <Form>
                <input 
                    type="radio"
                    //onClick= add/delete from state array
                >
                 </input>
            </Form>
        </div>
    );
}

export default Form;
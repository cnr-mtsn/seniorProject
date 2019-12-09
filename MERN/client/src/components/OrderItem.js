import React, { useState, useEffect } from 'react';


const OrderItem = (props) => {
    
    const [items, setItems] = useState([]);

     useEffect(() => {
        getItems(); // eslint-disable-next-line
    }, []);

     const getItems = () => {
        var list = items;
        categories.forEach(category => {
            fetch(`http://localhost:5000/getItemNames?orderId=${orderId}&category=${category.category}&orders_category=${category.order_category}`)
            .then(response => response.json())
            .then((response) => {
                response.data.forEach(item => {
                    list = list.concat(item.name);
                    setItems(list);
                })
            })
            .catch(err => console.log(err));
        });
    };
    

    const orderId = props.orderId;

    const categories = [
        {category: 'sandwichBase', order_category:'orders_sandwich'}, 
        {category: 'tortillaBase', order_category:'orders_tortilla'}, 
        {category: 'proteins', order_category:'orders_protein'}, 
        {category: 'cheese', order_category:'orders_cheese'}, 
        {category: 'veggies', order_category:'orders_veggies'}, 
        {category: 'condiments', order_category:'orders_condiments'}, 
        {category: 'extras', order_category:'orders_extras'}
    ];

   const renderNames = (item) => {
       return (
           <div key={item + orderId}className="kOrderItemName">{item}</div>
       );
   }

    return (
        <div className='kOrderItemsWrapper'>{items ? items.map(renderNames) : 'Empty Order'} </div>
    );
}

export default OrderItem;
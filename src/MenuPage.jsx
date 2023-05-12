import React, { useState, useEffect } from 'react';

function MenuPage(props) {
    const {menuItems} = props;
    
    const handleAddToCart = (itemID) => {
       return fetch(`/api/carts/${itemID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); 
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const handleRemoveFromCart = (itemID) => {
        return fetch(`/api/carts/${itemID}/decrease`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({subtract: true})
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); 
        })
        .catch((error) => {
          console.error(error);
        });
      };
      

  return (
    <div className='menu-page'>
        <h1>Let's see our menu!</h1>
        <div className='menu'>
        {menuItems.map(item => (
            <div className='menu-item' key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button className='button-one' id={`button-${item.id}`} onClick={() =>handleAddToCart(item.id)}>
                Add 
            </button>
            <button className='button-one' id={`remove-${item.id}`} onClick={() => handleRemoveFromCart(item.id)}>
                Remove
            </button>
            </div>
        ))}
        </div>
    </div>
  );
}

export default MenuPage;



import React from 'react';
import CartTotal from './CartTotal';

const Cart = ({ cartItems, removeCartItem,updateQuantity }) => {
    
console.log(cartItems)

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Quantity: {item.quantity}</p>
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            >
            {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                {index + 1}
                </option>
                ))}
          </select>
          <p> {item.price} </p>
          <p> ${parseFloat(item.price) * parseInt(item.quantity)}</p>
        
          <button onClick={() => removeCartItem(item.id)}>Remove</button>
        </div>
      ))}
       <CartTotal cartItems={cartItems} />
    </div>
  );
};

export default Cart;

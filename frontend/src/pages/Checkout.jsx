import React from 'react';
import LoggedCart from '../components/LoggedCart';
import Cart from '../components/Cart';

function Checkout({ cartItems, removeCartItem, updateQuantity, checkOutFinal }) {
  return (
    <div>
    
      <Cart cartItems={cartItems} removeCartItem={removeCartItem} updateQuantity={updateQuantity} checkOutFinal={checkOutFinal} />
      <LoggedCart />
    </div>
  );
}

export default Checkout;

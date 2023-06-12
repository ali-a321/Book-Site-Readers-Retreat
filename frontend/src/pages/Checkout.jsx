import React from 'react';
import LoggedCartToday from './LoggedCartToday';
import Cart from '../components/Cart';

function Checkout({ cartItems, removeCartItem, updateQuantity, checkOutFinal, gotoHome }) {
  return (
    <div>
    
      <Cart cartItems={cartItems} removeCartItem={removeCartItem} 
        updateQuantity={updateQuantity} checkOutFinal={checkOutFinal} 
        gotoHome = {gotoHome}
        />
      <LoggedCartToday />
    </div>
  );
}

export default Checkout;

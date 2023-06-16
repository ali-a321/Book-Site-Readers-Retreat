import React from 'react';
import LoggedCartToday from './LoggedCartToday';
import Cart from '../components/Cart';

function Checkout({ cartItems, removeCartItem, updateQuantity, checkOutFinal, gotoHome, showLogin, loading }) {

  const token = localStorage.getItem('token');
  
  return (
    <div>
      <Cart
        cartItems={cartItems}
        removeCartItem={removeCartItem}
        updateQuantity={updateQuantity}
        checkOutFinal={checkOutFinal}
        gotoHome={gotoHome}
        showLogin={showLogin}
        loading = {loading}
      />
      {token && <LoggedCartToday />}
    </div>
  );
}

export default Checkout;

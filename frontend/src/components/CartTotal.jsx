import React, { useState, useEffect } from 'react';

const CartTotal = ({ cartItems, checkOutFinal, gotoHome, showLogin }) => {
  const [cartFinal, setCartFinal] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  const calculateTotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return total;
  };

  useEffect(() => {
    setCartFinal(calculateTotal());
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, [cartItems]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className='orderBox'>
      <div className='orderSummaryTitle'>Order Summary</div>
      <div className='orderContainer'>
        <div className="ordersum">Shipping</div>
        <div>
          <div className="ordernum">
            <strong>Free</strong>
          </div>
        </div>
      </div>
      <div className='orderContainer'>
        <div className="ordersum">
          <strong>Total:</strong>
        </div>
        <div className="ordernum">
          <strong>${calculateTotal()} </strong>
        </div>
      </div>
      {cartFinal > 0 ? (
        loggedIn ? (
          <div className="finalCheckoutContainer">
            <button onClick={checkOutFinal} className="finalCheckout">Checkout</button>
          </div>
        ) : (
          <div onClick={() => showLogin()} className="finalCheckout">Login</div>
        )
      ) : (
        <div onClick={() => gotoHome()} className="finalCheckout">Continue Shopping</div>
      )}
    </div>
  );
};

export default CartTotal;

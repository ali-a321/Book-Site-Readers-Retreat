import React from 'react';

const CartTotal = ({ cartItems, checkOutFinal }) => {
  const calculateTotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return total;
  };

  return (
    <div className='orderBox'>
    <div className='orderSummaryTitle'>Order Summary</div>
    <div className='orderContainer'>
      <div className="ordersum">
        Shipping
        </div>
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
          <strong>${calculateTotal()}</strong>
        </div>
      </div>
      <div className='finalCheckoutContainer'><button onClick={checkOutFinal} className='finalCheckout'> Checkout </button> </div>
    </div>

  
  );
};

export default CartTotal;

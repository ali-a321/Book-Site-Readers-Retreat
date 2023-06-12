import React, { useState, useEffect } from 'react';

const CartTotal = ({ cartItems, checkOutFinal, gotoHome }) => {

  const [cartFinal, setCartFinal] = useState(0);

  const calculateTotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    return total;
  };
  useEffect(() => {
    setCartFinal(calculateTotal());
  }, [cartItems]);

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
          <strong>${calculateTotal()} </strong>
        </div>
      </div>
      {cartFinal >0 ? (<> <div className='finalCheckoutContainer'><button onClick={checkOutFinal} className='finalCheckout'> Checkout </button> </div> </>)
       : <div onClick={()=> gotoHome()} className='finalCheckout'> Continue Shopping </div>}
      
    </div>

  
  );
};

export default CartTotal;

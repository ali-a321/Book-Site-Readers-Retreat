import React from 'react';

const CartTotal = ({ cartItems }) => {
  const calculateTotal = () => {
    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return total;
  };

  return (
    <div>
      Total: ${calculateTotal()}
    </div>
  );
};

export default CartTotal;

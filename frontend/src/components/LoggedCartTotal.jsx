import React from 'react';

const LoggedCartTotal = ({ cartsItems }) => {
  
    const calculateTotal = () => {
    const total = cartsItems.reduce((accumulator, item) => {
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

export default LoggedCartTotal;

import React, { useEffect, useState } from 'react';
import LoggedCartTotal from './LoggedCartTotal';

const LoggedCart = () => {
  const [cartsItems, setCartsItems] = useState([]);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);

  useEffect(() => {
    // Function to fetch cart items for logged-in user
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const userId = localStorage.getItem('id')
        const response = await fetch(`http://localhost:8000/cartuser/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartsItems(data);
          const totalPrice = data.reduce((total, item) => total + item.total_price, 0);
          setFinalTotalPrice(totalPrice);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);
  console.log(cartsItems)
  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartsItems.map((item) => (
          <div key={item.id}>
            <img src={item.cover} alt="book cover image" className='bookCheckoutImage' /> 
            <div>{item.title}</div>
            <div>Quantity: {item.quantity}</div>
            <div> ${item.total_price}</div>
          </div>
        ))}
            <div> <strong> Total Price: ${finalTotalPrice} </strong></div>
      </ul>

    </div>
  );
};

export default LoggedCart;

import React, { useEffect, useState } from 'react';

const LoggedCartToday = () => {
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
  
  return (
    <div className='ordersSubmittedContainer'>
      <div> <h2>Orders Submitted Today</h2></div>
      <div>
        {cartsItems.map((item) => (
          <div key={item.id} className='shoppingCartContainer'>
            <img src={item.cover} alt= {`Cover image of ${item.title}`} className='checkoutCoverImg' /> 
            <div className='itemTitle'>{item.title}</div>
            <div className='quantityBar'>Quantity: {item.quantity}</div>
            <div className='subtotal'> ${item.total_price}</div>
          </div>
        ))}
            <div className='totalOrderPrice'> <strong> Total ${finalTotalPrice} </strong></div>
      </div>

    </div>
  );
};

export default LoggedCartToday;

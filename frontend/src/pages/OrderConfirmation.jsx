import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
  const [cartsItems, setCartsItems] = useState([]);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const userId = localStorage.getItem('id');
  
        const response = await axios.get(`http://localhost:8000/cartnow/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          const data = response.data;
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
  
  return (<> 
    <div className='titleHeader'>
        <div> <h1 className='inventoryTittle' onClick={()=>navigate("/")}> Readers' Retreat </h1></div>
        </div>
    <div className='ordersSubmittedContainer'>
      <h2>Order Submitted </h2>
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
      <div className='continueCheckout' onClick ={() => navigate("/")}> Continue </div>
    </div>
    </>
  );
};

export default OrderConfirmation;

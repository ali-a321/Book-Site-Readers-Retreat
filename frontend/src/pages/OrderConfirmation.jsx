import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
  const [cartsItems, setCartsItems] = useState([]);
  const [orderedCart, setOrderedCart] = useState([]);

  const [finalTotalPrice, setFinalTotalPrice] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const social = localStorage.getItem("social")
        if (token) {
         
       
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
        }
        else if(social){
          const ordered = localStorage.getItem("cartItems")
          console.log(ordered)
          setOrderedCart(JSON.parse(ordered))
          const totalPrice = JSON.parse(ordered).reduce((total, item) => total + item.totalPrice, 0);
          setFinalTotalPrice(totalPrice);
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
           {orderedCart.map((item) => (
          <div key={item.id} className='shoppingCartContainer'>
            <img src={item.cover} alt= {`Cover image of ${item.title}`} className='checkoutCoverImg' /> 
            <div className='itemTitle'>{item.title}</div>
            <div className='quantityBar'>Quantity: {item.quantity}</div>
            <div className='subtotal'> ${item.totalPrice}</div>
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

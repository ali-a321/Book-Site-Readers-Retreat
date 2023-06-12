import React from 'react';
import CartTotal from './CartTotal';

const Cart = ({ cartItems,removeCartItem,updateQuantity, checkOutFinal, gotoHome }) => { 

  return (
    <>
    <div className='yourShoppingCartTitle'> <h2>Your Shopping Cart</h2> </div>
    <div className='CartDisplay'>
      <div> 
      {cartItems.map((item) => (
        <div key={item.id} className='shoppingCartContainer'>
         <img src={item.cover} alt={`Cover image of ${item.title}`} className='checkoutCoverImg'/>
          <div className='itemTitle'>{item.title}</div>
       
          <div> {item.price} </div>
          <div className='quantityBar'> 
          <select
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          </div>
          <div> 
            <div className='subtotal'> ${parseFloat(item.price) * parseInt(item.quantity)}</div>
            <div onClick={() => removeCartItem(item.id)} className='removeBtnCart'>Remove</div>
          </div>
        </div>
      ))}
      
      </div>
      <CartTotal cartItems={cartItems} checkOutFinal={checkOutFinal} gotoHome= {gotoHome} />
    </div>
    </>
  );
};

export default Cart;

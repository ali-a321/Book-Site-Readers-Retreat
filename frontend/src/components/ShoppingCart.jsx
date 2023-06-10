import React, { useState } from 'react';
import Cart from './Cart';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToLogCart = async (book) => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = localStorage.getItem('id');
      const data = {
        book_id: book.id,
        quantity: 1,
      };
      try {
        const response = await fetch(`http://localhost:8000/cartuser/${userId}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log('Item added to cart');
        } else {
          console.error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };
  
  // Function to remove an item from the cart
  const removeCartItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);

    // Send POST request to update shopping cart in the backend
    const token = localStorage.getItem('token');
    if (token) {
      const userId = localStorage.getItem('id');
      const data = {
        bookId: itemId,
        quantity: 0, // Set quantity to 0 to remove the item from the cart
      };

      fetch(`http://localhost:8000/cartuser/${userId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Item removed from cart');
          } else {
            console.error('Failed to remove item from cart');
          }
        })
        .catch((error) => {
          console.error('Error removing item from cart:', error);
        });
    }
  };

  return (
    <div>
      <h1>Book Store</h1>
      {/* Display book list */}
      {/* Assuming you have a books array containing book data */}
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>Price: ${book.price}</p>
          <button onClick={() => addToCart(book)}>Add to Cart</button>
        </div>
      ))}
      <Cart cartItems={cartItems} removeCartItem={removeCartItem} />
    </div>
  );
};

export default ShoppingCart;

import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from "../components/Dropdown"
import BookCarousel from "../components/BookCarousel"
import Cart from "../components/Cart"
import shoppingLogo from "../images/shoppingcart.svg"
import userLogo from "../images/userLogo.svg"
import Logout from '../components/Logout'
import LoggedCart from '../components/LoggedCart'



function Books() {

    const [books, setBooks] = useState([])
    const [bestBooks, setBestBooks] = useState([])
    const username = localStorage.getItem('username');
   

    useEffect(() => {
        const fetchBestBooks = async () => {
            try {
            const res = await axios.get("http://localhost:8000/booksbest")
            setBestBooks(res.data)
            
            } catch (error) {
                
            }
        }
        fetchBestBooks()
        
    }, [])

   
    const handleDelete = async (bookid) => {
        try {
           await axios.delete(`http://localhost:8000/books/${bookid}`)
            console.log("Book Has been deleted")
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
        
    }

    const [cartItems, setCartItems] = useState([]);
    const addToCart = (bookId) => {
      fetch(`http://localhost:8000/books/${bookId}`)
        .then((response) => response.json())
        .then((data) => {
          const book = data[0];
          const existingItem = cartItems.find((item) => item.id === book.id);
          if (existingItem) {
            // If item already exists in the cart, update the quantity and totalPrice
            const updatedItems = cartItems.map((item) => {
              if (item.id === book.id) {
                return { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * book.price };
              }
              return item;
            });
            setCartItems(updatedItems);
            console.log(cartItems);
          } else {
            // If item doesn't exist in the cart, add it with quantity and totalPrice
            const newItem = { ...book, quantity: 1, totalPrice: book.price };
            setCartItems([...cartItems, newItem]);
            console.log(cartItems);
          }
    
          // Check if the user is logged in
          const token = localStorage.getItem('token');
          if (token) {
            const userId = localStorage.getItem('id');
            const data = {
              book_id: book.id,
              quantity: 1,
              total_price: book.price
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
                  console.log('Item added to cart');
                } else {
                  console.error('Failed to add item to cart');
                }
              })
              .catch((error) => {
                console.error('Error adding item to cart:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error fetching book price:', error);
        });
    };
    
      
      
      const removeCartItem = (itemId) => {
        const updatedItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedItems);
      };
      const updateQuantity = (itemId, newQuantity) => {
        const updatedItems = cartItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.price };
          }
          return item;
        });
        setCartItems(updatedItems);
      };
  return (
    <div>
        <div className='titleHeader'>
        <div> <h1 className='inventoryTittle'> Readers' Retreat </h1></div>
        <div> 
          {username}
          <Logout/>
          <Link to="/login">
            <img src={userLogo} alt="user account logo" className="shoppingCartLogo" />
          </Link>
          <img src= {shoppingLogo} alt='shopping cart logo' className='shoppingCartLogo'/>  </div>
        </div>
        <div className='display'> 
           
        <div className='bestsellingTitle'> <div className='bestsellingheader'>Best Sellers  </div>
            <div className='bestSelling'> 
            <BookCarousel bestBooks={ bestBooks} />
            </div>
            </div>
            <div className='dropdownMenu'> 
            <Dropdown setBooks = {setBooks} />   
            </div>
            <div className='bookContainer'> 
            {books.map(item =>( <div className='bookItem' key={item.id}>
            <div className='bookPicture'> 
                    <img src={item.cover} alt={item.cover} className='bookPic'/>
                </div>
                <div className='bookTitle'> 
                   <strong> {item.title} </strong>
                </div>
                <div className='bookDescription'> 
                    {item.description}
                </div>
                
                <div className='bookPrice'> 
                    ${item.price}
                </div>
                <button onClick={() => addToCart(item.id)}>Add to Cart</button>
                <button className='deleteBtn' onClick={() => handleDelete(item.id)}> Delete </button>
                <button className='updateBtn' > <Link to= {`/update/${item.id}`}> Update </Link>  </button>
            </div> 
            ))
            }
            </div>
            <Cart cartItems={cartItems} removeCartItem={removeCartItem} updateQuantity= {updateQuantity}  />
            <LoggedCart />
            <div className='addContainer'><button className='addBtn'> <Link to ="/add"> Add new Book </Link>  </button> </div>       

    </div>


    </div>
  )
}

export default Books
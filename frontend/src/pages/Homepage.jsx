import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from "../components/Dropdown"
import BookCarousel from "../components/BookCarousel"
import shoppingLogo from "../images/shoppingcart.svg"
import userLogo from "../images/userLogo.svg"
import Checkout from './Checkout'
import Login from './Login'
import Register from './Register'
import logoutLogo from "../images/logoutLogo.svg"




function Homepage() {

    const [books, setBooks] = useState([])
    const [bestBooks, setBestBooks] = useState([])
    const [cartCounter, setCartCounter] = useState(0)
    const username = localStorage.getItem('username');
   
    const navigate = useNavigate();

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
     
    const totalBooks = () => {
      let totalQuantity = 0;
      cartItems.forEach((item) => {
        totalQuantity += item.quantity;
      });
    
      setCartCounter(totalQuantity);
    };
    
    
    const addToCart = (bookId) => {
        // Make a request to the server to fetch the price of the book
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
       
              
            } else {
              // If item doesn't exist in the cart, add it with quantity and totalPrice
              const newItem = { ...book, quantity: 1, totalPrice: book.price };
              setCartItems([...cartItems, newItem]);
             
              
            }
            setCartCounter(prevState => prevState +1)
          })
        
          .catch((error) => {
            console.error('Error fetching book price:', error);
          });
          
      };   
       
      const removeCartItem = (itemId) => {
        const removedItem = cartItems.find((item) => item.id === itemId);
        if (removedItem) {
          const updatedItems = cartItems.filter((item) => item.id !== itemId);
          setCartItems(updatedItems);
          setCartCounter((prevState) => prevState - removedItem.quantity);
        }
      };
      
      
      const updateQuantity = (itemId, newQuantity) => {
        const updatedItems = cartItems.map((item) => {
          if (item.id === itemId) {
            const quantityDifference = newQuantity - item.quantity;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.price,
            };
          }
          return item;
        });
        setCartItems(updatedItems);
      
        const quantityDifference = newQuantity - cartItems.find((item) => item.id === itemId)?.quantity;
        setCartCounter((prevState) => prevState + quantityDifference);
      };
      

    const checkOutFinal = () => {
        if (!Array.isArray(cartItems)) {
          console.error('cartItems is not an array');
          return;
        }
        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (token) {
          const userId = localStorage.getItem('id');
      
          // Create an array of items to be added to the cart
          const itemsToAdd = cartItems.map((item) => ({
            book_id: item.id,
            quantity: item.quantity,
            total_price: item.totalPrice,
          }));
        
          // Make a POST request to add the items to the cart
          fetch(`http://localhost:8000/cartuser/${userId}/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(itemsToAdd),
          })
            .then((response) => {
              if (response.ok) {
                console.log('Items added to cart');
                navigate("/orderconfirmation")
              } else {
                console.error('Failed to add items to cart');
              }
            })
            .catch((error) => {
              console.error('Error adding items to cart:', error);
            });
        }
      };
      const [renderBooks, setRenderbooks] = useState(true);
     

      const gotoCheck = () => {
        setRenderbooks(false)
      }
      const gotoHome = () => {
        setRenderbooks(true)
      }
      useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(cartItems);
        totalBooks(cartItems); 
      }, []);
    
      //  cartItems to localStorage when it changes
      useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }, [cartItems]);
    

      const [renderLogin, setRenderLogin] = useState(false);
      const [renderRegister, setRenderRegister] = useState(false);

      const handleClickOutside = (e) => {
        if (e.target.classList.contains('popup-container')) {
          setRenderLogin(false);
        }
      }
      const registerClickOut = (e) => {
        if(e.target.classList.contains('registerPopup-container')) {
          setRenderRegister(false);
        }
      };
      
      const showLogin = () => {
        setRenderLogin(true)
      }
    
      const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        window.location.reload();
        
      };
    
   
  return (
    <div>
        <div className='titleHeader'>
        <div> <h1 className='inventoryTittle' onClick={() => gotoHome()}> Readers' Retreat </h1></div>
        <div className='headerIcons'> 
          {username}
   
          <div className="cart-link" onClick={() => showLogin()}>
          
          {username ? (
            <img src={logoutLogo} alt="logout button" className="userLogo" onClick={()=> handleLogout()}/>
          ) : (
            <img src={userLogo} alt="user account logo" className="userLogo" />
          )}
            {cartCounter > 0 && (
              <span className="cart-counter" > {cartCounter}</span>
            )}
          </div>
          <img src= {shoppingLogo} alt='shopping cart logo' className='shoppingCartLogo' onClick={()=> gotoCheck()}/>  </div>
        </div>
        <div className={`popup-container ${renderLogin ? 'open' : ''}`} onClick={handleClickOutside}>
          <Login setRenderLogin = {setRenderLogin} setRenderRegister = {setRenderRegister}/>
        </div>
      
        <div className={`registerPopup-container ${renderRegister ? 'open' : ''}`} onClick={registerClickOut}>
          <Register setRenderRegister={setRenderRegister} showLogin={showLogin} />
        </div>
        
        <div className='display'> 
          {renderBooks ? <> 
        <div className='bestsellingTitle'> <div className='bestsellingheader'>Best Sellers  </div>
            <div className='bestSelling'> 
            <BookCarousel bestBooks={ bestBooks} />
            </div>
            </div>
            <div className='middleContainer'> 
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
            </div>
              <div className='addContainer'><button className='addBtn'> <Link to ="/add"> Add new Book </Link>  </button> </div>       
         </>
            : <Checkout cartItems={cartItems} removeCartItem={removeCartItem} updateQuantity= {updateQuantity} 
                checkOutFinal = {checkOutFinal} gotoHome= {gotoHome}/> } 
           
    </div>
    </div>
  )
}

export default Homepage
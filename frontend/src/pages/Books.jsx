import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from "../components/Dropdown"


function Books() {

    const [books, setBooks] = useState([])


   
    const handleDelete = async (bookid) => {
        try {
           await axios.delete(`http://localhost:8000/books/${bookid}`)
            console.log("Book Has been deleted")
            window.location.reload()

        } catch (error) {
            console.log(error)
        }
        
    }
  

  return (
    <div>
        <h1 className='inventoryTittle'> Book Inventory </h1>
        
        <div className='display'> 
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
                <button className='deleteBtn' onClick={() => handleDelete(item.id)}> Delete </button>
                <button className='updateBtn' > <Link to= {`/update/${item.id}`}> Update </Link>  </button>
            </div> 
            ))
            }
            </div>
            <div className='addContainer'><button className='addBtn'> <Link to ="/add"> Add new Book </Link>  </button> </div>       

    </div>


    </div>
  )
}

export default Books
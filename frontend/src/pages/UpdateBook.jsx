import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

function UpdateBook() {

  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.pathname.split("/")[2];

  const [bookInfo, setBookInfo] = useState(
    {  title: '',
    description: '',
    cover: '',
    price: ""
  });

  useEffect(() => {
      const fetchBook = async (bookId) => {
          try {
             const res = await axios.get(`http://localhost:8000/books/${bookId}`)
             
             const bookMaterial = res.data[0]
    
             setBookInfo({
              title: bookMaterial.title,
              description: bookMaterial.description,
              cover: bookMaterial.cover,
              price: bookMaterial.price
            });

          
          } catch (error) {
              console.log(error)
          }
      }
      fetchBook(bookId)
      
  }, [])
 


  const [error,setError] = useState(false)

  const onChangeBookInfo = (e) => {
    setBookInfo((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }) )
  }
  const onUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8000/books/${bookId}`, bookInfo)
      console.log("Book Has been updated")

      setBookInfo( {title: "",
            description: "",
            cover: "",
            price: "",
            }) 
            navigate('/')

    } catch (error) {
        console.log(error);
        setError(true)
    }
    

}   
  

  return (
    <div className='form-container'>
    <div className='sendMsg'> Update Book </div>
        <section className="form">
            <form onSubmit={onUpdate} > 
            <div className="form-group">
              
              <div className="form-group">
                  <input type="text" className="form-control" id="title" 
                  name="title" 
                  required
                  value={bookInfo.title}
                  onChange={onChangeBookInfo}
                  placeholder= "Book title" 
                  autoComplete="off"
                  />
              </div>
              <div className="form-group">
                  <input type="text" className="form-control" id="description" 
                  name="description" 
                  required
                  value={bookInfo.description}
                  onChange={onChangeBookInfo}
                  placeholder= "Description" 
                  autoComplete="off"

                 />
              </div>    
              <div className="form-group">
                  <input type="text" className="form-control" id="cover" 
                  name="cover" 
                  required
                  value={bookInfo.cover}
                  onChange={onChangeBookInfo}
                  placeholder= "Book Cover" 
                  autoComplete="off"

                 />
              </div>        
              <div className="form-group">
                  <input type="number" className="form-control" id="price" 
                  name="price" 
                  required
                  value={bookInfo.price}
                  onChange={onChangeBookInfo}
                  placeholder= "Price" 
                  autoComplete="off"

                 />
              </div>          
            </div>
            <div className="form-group">
              <button className="submitBtn" type="submit" > Update </button>
              {error && "Something went wrong!"}
              <br></br>
              <Link to="/">Back</Link>
        
            </div>
            </form>
          </section>

    </div>
  )
}

export default UpdateBook
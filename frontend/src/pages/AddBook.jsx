import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

function AddBook() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    description: '',
    cover: "",
    price: null,
    points: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onChangeBookInfo = (e) => {
    setBookInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("file", bookInfo.cover);
      formData.append("upload_preset", "twitter-clone");
      formData.append("cloud_name", "dadpcmkn3");
  
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dadpcmkn3/image/upload",
        formData
      );
      const coverUrl = response.data.url;
      console.log(coverUrl)
      const book = {
        title: bookInfo.title,
        author: bookInfo.author,
        description: bookInfo.description,
        cover: coverUrl,
        price: bookInfo.price,
        points: bookInfo.points,

      };
      console.log(book)
      await axios.post("http://localhost:8000/books", book);
  
      setBookInfo({
        title: "",
        author: "",
        description: "",
        cover: "",
        price: null,
        points: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  const onCoverChange = (file) => {
    setBookInfo((prevState) => ({
      ...prevState,
      cover: file,
    }));
  };
  console.log(bookInfo.cover)

  return (
    <div>
      <div className="form-container">
        <div className="sendMsg"> Add Book </div>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  required
                  onChange={onChangeBookInfo}
                  placeholder="Book title"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  required
                  onChange={onChangeBookInfo}
                  placeholder="Book Author"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  required
                  onChange={onChangeBookInfo}
                  placeholder="Description"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <ImageUpload onChange={onCoverChange} />
              </div>
              <div className="form-group">
              
                {bookInfo.cover && (
                  <input
                    type="text"
                    className="form-control"
                    id="cover"
                    name="cover"
                    value={bookInfo.cover.name}
                    required
                    disabled
                  />
                  
                )}
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  required
                  onChange={onChangeBookInfo}
                  placeholder="Price"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  id="points"
                  name="points"
                  required
                  onChange={onChangeBookInfo}
                  placeholder="Points"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="form-group">
              <button className="submitBtn" type="submit">
                Submit
              </button>
              <br></br>
              {error && <div>Something went wrong!</div>}
              <Link to="/">Back</Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddBook;

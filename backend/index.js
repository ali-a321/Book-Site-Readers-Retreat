const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
    
})
app.use(express.json())

app.get("/", (req,res) => {
    res.json("This is backend")
})

app.get("/books", (req,res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
})
//Get singular book
app.get("/books/:id", (req,res) => {
    const bookId = req.params.id
    const q = "SELECT * FROM books WHERE id = ?"
    db.query(q, bookId, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
})
//Order based on price
app.get("/booksascending", (req,res) => {
    const q = 'SELECT * FROM books ORDER BY price ASC';
    db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
})
app.get("/booksdescending", (req,res) => {
    const q = 'SELECT * FROM books ORDER BY price DESC';
    db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
})

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`, `price`) VALUES (?)"
    const values = [ req.body.title, req.body.description, req.body.cover, req.body.price]
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created")
    } )
})
app.delete("/books/:id", (req,res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted")
    })
})
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `description`= ?, `cover`= ?, `price`= ? WHERE id = ?";
  
    const values = [ req.body.title, req.body.description, req.body.cover, req.body.price,]

    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });



app.listen(8000, () => {
    console.log("Server Running")
})
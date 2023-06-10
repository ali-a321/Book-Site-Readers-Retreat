
//GET ALL BOOKS, /books
const getAllBooks = async (req, res) => {
    const q = "SELECT * FROM books";
    const db = req.db;
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };

//GET single, /books/:id
const getSingleBook = async (req,res) => {
    const bookId = req.params.id
    const db = req.db;
    const q = "SELECT * FROM books WHERE id = ?"
    db.query(q, bookId, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
}
//GET book above 19 points, /booksbest
const getBestBooks = async (req,res) => {
    const q = 'SELECT * FROM books WHERE points >= 20';
    const db = req.db;
    db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
}

//GET books filtered, /booksascending
const getBooksAsc = async (req,res) => {
    const q = 'SELECT * FROM books ORDER BY price ASC';
    const db = req.db;
    db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
}
//GET FILTER,  /booksdescending
const getBooksDesc = async (req,res) => {
    const q = 'SELECT * FROM books ORDER BY price DESC';
    const db = req.db;
    db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
    })
}
//Add book, POST, /books
const addBook = async (req,res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`, `price`, `points`) VALUES (?)"
    const db = req.db;
    const values = [ req.body.title, req.body.description, req.body.cover, req.body.price, req.body.points]
    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created")
    } )
}
//DELETE book, /books/:id
const deleteBook = async (req, res) => {
    const bookId = req.params.id
    const db = req.db;
    const q = "DELETE FROM books WHERE id = ?"
    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted")
    })
}

//UPDATE book, /books/:id
const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const db = req.db;
    const q = "UPDATE books SET `title`= ?, `description`= ?, `cover`= ?, `price`= ?, `points` WHERE id = ?";
  
    const values = [ req.body.title, req.body.description, req.body.cover, req.body.price, req.body.points]

    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}

//POST,  Link logged user to cart, /cartuser/:id/add
const connectUserToCart = async (req, res) => {
  const user_id = req.params.id;
  console.log(req.body)
  const { book_id, quantity, total_price } = req.body;

  if (!book_id || !quantity || !total_price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const db = req.db;
  const sql = 'INSERT INTO cart (user_id, book_id, quantity, total_price) VALUES (?, ?, ?, ?)';
  const values = [user_id, book_id, quantity, total_price];

  try {
    await db.query(sql, values);
    console.log('Item added to cart');
    res.json({ message: 'Item added to cart' });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.sendStatus(500);
  }
};

//GET, get logged user cart, /cartuser/:id

const getUserCart = async (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT c.*, b.title, b.cover 
    FROM cart AS c
    JOIN books AS b ON c.book_id = b.id
    WHERE c.user_id = ?`;
  const db = req.db;
  console.log(db)
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error', err);
     
    } else {
      console.log(results);
      res.json(results)
    }
  });
};

const deleteCart = () => {

}

const updateCart = () => {
  
}


module.exports = {getAllBooks, updateBook, deleteBook, addBook, getBooksDesc, getBooksAsc,
                  getBestBooks, getSingleBook, connectUserToCart, getUserCart, updateCart, 
                  deleteCart  }


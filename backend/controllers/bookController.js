
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
//GET top 5 book , /booksbest
const getBestBooks = async (req, res) => {
  const q = 'SELECT * FROM books ORDER BY points DESC LIMIT 5';
  const db = req.db;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};


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
    const q = "INSERT INTO books (`title`, `author`, `description`, `cover`, `price`, `points`) VALUES (?)"
    const db = req.db;
    const values = [ req.body.title, req.body.author, req.body.description, req.body.cover, req.body.price, req.body.points]
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

//PUT UPDATE book, /books/:id
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const db = req.db;
  const q = "UPDATE books SET `title`= ?, `author`= ?, `description`= ?, `cover`= ?, `price`= ?, `points` = ? WHERE id = ?";

  const values = [req.body.title, req.body.author, req.body.description, req.body.cover, req.body.price, req.body.points];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};


//POST, checkout for multiple books, /cartuser/:id/add

const addBooksToCart = async (req, res) => {
  const user_id = req.params.id;
  const cartItems = Array.isArray(req.body) ? req.body : [req.body];

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Invalid cart items data' });
  }

  const db = req.db;

  try {
    for (const item of cartItems) {
      const { book_id, quantity, total_price } = item;

      if (!book_id || !quantity || !total_price) {
        console.error('Invalid cart item data:', item);
        continue; // Skip this item go to the next one
      }        
      const sql =
       'INSERT INTO cart (user_id, book_id, quantity, total_price) VALUES (?, ?, ?, ?)';
      const values = [user_id, book_id, quantity, total_price];
      await db.query(sql, values);
      console.log('Item added to cart');
    }
    res.json({ message: 'Items added to cart' });

  } catch (err) {
    console.error('Error adding items to cart:', err);
    res.sendStatus(500);
  }
};


//GET, get logged user cart today, /cartuser/:id

const getUserCart = async (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT c.*, b.title, b.cover b.author
    FROM cart AS c
    JOIN books AS b ON c.book_id = b.id
    WHERE c.user_id = ?
      AND DATE(c.created_at) = CURDATE()`;;
  const db = req.db;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error', err);
      res.status(500).json({ error: 'An error occurred while fetching the user cart.' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
};
//GET, get logged user cart now, /cartnow/:id

const getUserCartNow = async (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT c.*, b.title, b.cover, b.price, b.author
    FROM cart AS c
    JOIN books AS b ON c.book_id = b.id
    WHERE c.user_id = ?
      AND c.created_at >= NOW() - INTERVAL 1 MINUTE`;
  const db = req.db;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error', err);
      res.status(500).json({ error: 'An error occurred while fetching the user cart.' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

// //POST,  Link logged user to cart, /cartuser/:id/add
// const connectUserToCart = async (req, res) => {
//   const user_id = req.params.id;
//   console.log(req.body);
//   const { book_id, quantity, total_price } = req.body;

//   if (!book_id || !quantity || !total_price) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const db = req.db;

//   try {
//     // Check if the book is already present in the user's cart
//     const existingCartItem = await db.query(
//       'SELECT * FROM cart WHERE user_id = ? AND book_id = ?',
//       [user_id, book_id]
//     );
//       console.log(existingCartItem + "existingCartItem")
//       console.log(existingCartItem.length)
//     if (existingCartItem.length > 0) {
//       // If the book is already in the cart, update the quantity
//       const updatedQuantity = existingCartItem[0].quantity + quantity;
//       await db.query(
//         'UPDATE cart SET quantity = ? WHERE user_id = ? AND book_id = ?',
//         [updatedQuantity, user_id, book_id]
//       );
//       console.log('Cart item quantity updated');
//     } else {
//       // If the book is not in the cart, add a new entry
//       const sql =
//         'INSERT INTO cart (user_id, book_id, quantity, total_price) VALUES (?, ?, ?, ?)';
//       const values = [user_id, book_id, quantity, total_price];
//       await db.query(sql, values);
//       console.log('Item added to cart');
//     }

//     res.json({ message: 'Item added to cart' + book_id + user_id });
//   } catch (err) {
//     console.error('Error adding item to cart:', err);
//     res.sendStatus(500);
//   }
// };


//PUT, /cartuser/:id/update/:book
// const updateCart = async (req,res) => {
//   const user_id = req.params.id;
//   const book_id = req.params.book;
//   const { quantity, total_price } = req.body;

//   if (!quantity || !total_price) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const db = req.db;

//   try {
//     // Update the cart item with the new quantity and total price
//     await db.query(
//       'UPDATE cart SET quantity = ?, total_price = ? WHERE user_id = ? AND item_id = ?',
//       [quantity, total_price, user_id, book_id]
//     );
//     console.log('Cart item updated');

//     res.json({ message: 'Cart item updated' });
//   } catch (err) {
//     console.error('Error updating cart item:', err);
//     res.sendStatus(500);
//   }
// }


module.exports = {getAllBooks, updateBook, deleteBook, addBook, getBooksDesc, getBooksAsc,
                  getBestBooks, getSingleBook, getUserCart, 
                  addBooksToCart,getUserCartNow  }


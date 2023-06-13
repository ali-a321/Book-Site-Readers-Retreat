const mysql = require('mysql')


const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    
})

module.exports = db
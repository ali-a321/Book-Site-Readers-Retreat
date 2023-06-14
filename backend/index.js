const express = require('express')
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser');


const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(express.json())


app.use("/", require('./routes/bookRoutes'))
app.use("/", require('./routes/userRoutes'))
app.use("/", require('./routes/emailRoutes'))


app.listen(8000, () => {
    console.log("Server Running")
})
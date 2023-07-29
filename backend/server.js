//bring in express
const express = require('express')
//import colors to style terminal messages
const colors = require('colors')
//import dotenv
require('dotenv').config()
//import error handler
const errorHandler = require('./middleware/errorMiddleware')
//import connectDB
const connectDB = require('./config/db')
//define port
const PORT = process.env.PORT || 8000
//connect to db
connectDB()
//initialize app
const app = express()

//add middleware (body-parser)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//create the route
app.get('/', (req, res) => {
	res.send('hello')
})

//use route created in routes
app.use('/api/users', require('./routes/userRoutes'))

//allow app to use errorHandler
app.use(errorHandler)

//listen for changes
app.listen(PORT, () => console.log('Server started on port ' + PORT))

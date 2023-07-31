const express = require('express')
//init router
const router = express.Router()
//import controllers
const {
	getTickets,
	createTicket,
	getTicket,
	updateTicket,
	deleteTicket,
} = require('../controllers/ticketController')
//import function to protect route
const { protect } = require('../middleware/authMiddleware')

//connect notes routes to ticket routes
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

//create routes with imported controllers
router.route('/').get(protect, getTickets).post(protect, createTicket)

//create routes for single ticket with imported controllers
router
	.route('/:id')
	.get(protect, getTicket)
	.put(protect, updateTicket)
	.delete(protect, deleteTicket)

//export
module.exports = router

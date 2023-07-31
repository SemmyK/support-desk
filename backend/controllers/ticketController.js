//import express async handler which will wrap all controllers
const asyncHandler = require('express-async-handler')
//import models
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//controller for getting tickets
// @desc   Get user tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	} else {
		//if user exists and given password is the same as registered password
		const tickets = await Ticket.find({ user: req.user.id })

		res.status(200).json(tickets)
	}
})

//controller for getting single ticket
// @desc   Get single tickets
// @route  GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	} else {
		//if user exists and given password is the same as registered password
		const ticket = await Ticket.findById(req.params.id)
		if (!ticket) {
			res.status(404)
			throw new Error('Ticket not found')
		}

		if (ticket.user.toString() !== req.user.id) {
			res.status(401)
			throw new Error('Not authorized')
		}

		res.status(200).json(ticket)
	}
})

//controller for creating ticket
// @desc   Create tickets
// @route  POST /api/tickets
// @access Private

const createTicket = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	//destructure product and description from req body
	const { product, description } = req.body

	if (!product || !description) {
		res.status(400)
		throw new Error('Please add a product and description')
	}

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	} else {
		//if user exists
		const ticket = await Ticket.create({
			product,
			description,
			user: req.user.id,
			status: 'new',
		})

		res.status(201).json(ticket)
	}
})

//controller for updating single ticket
// @desc   Update single tickets
// @route  PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	} else {
		//if user exists and given password is the same as registered password
		const ticket = await Ticket.findById(req.params.id)

		if (!ticket) {
			res.status(404)
			throw new Error('Ticket not found')
		}

		if (ticket.user.toString() !== req.user.id) {
			res.status(401)
			throw new Error('Not authorized')
		}

		const updatedTicket = await Ticket.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)

		res.status(200).json(updatedTicket)
	}
})

//controller for deleting single ticket
// @desc   Delete single tickets
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	}
	//if user exists and given password is the same as registered password
	const ticket = await Ticket.findById(req.params.id)

	if (!ticket) {
		res.status(404)
		throw new Error('Ticket not found')
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not authorized')
	}

	await Ticket.findByIdAndRemove(req.params.id)

	res.status(200).json({ success: true })
})

module.exports = {
	getTickets,
	getTicket,
	createTicket,
	updateTicket,
	deleteTicket,
}

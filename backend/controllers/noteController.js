//import express async handler which will wrap all controllers
const asyncHandler = require('express-async-handler')
//import models
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

//controller for getting notes
// @desc   Get user notes
// @route  GET  /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('User not found.')
	}
	//get ticket connected to note
	const ticket = await Ticket.findById(req.params.ticketId)

	if (ticket) {
		if (ticket.user.toString() !== req.user.id) {
			res.status(401)
			throw new Error('Unauthorized access.')
		}

		const notes = await Note.find({ ticket: req.params.ticketId })

		res.status(200).json(notes)
	}
})

//controller for creating note
// @desc   Create notes
// @route  POST /api/tickets/:ticketId/notes
// @access Private

const createNote = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('User not found.')
	}
	//get ticket connected to note
	const ticket = await Ticket.findById(req.params.ticketId)
	if (ticket) {
		if (ticket.user.toString() !== req.user.id) {
			res.status(401)
			throw new Error('Unauthorized access.')
		}
		const note = await Note.create({
			ticket: req.params.ticketId,
			text: req.body.text,
			isStaff: false,
			user: req.user.id,
		})

		res.status(201).json(note)
	}
})

//controller for updating single note
// @desc   Update single note
// @route  PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('User not found.')
	} else {
		//get ticket connected to note
		const note = await Note.findById(req.params.noteId)

		if (note.user.toString() !== req.user.id) {
			res.status(401)
			throw new Error('Unauthorized access.')
		}
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.noteId,
			req.body,
			{
				new: true,
			}
		)

		res.status(200).json(updatedNote)
	}
})

//controller for deleting single ticket
// @desc   Delete single tickets
// @route  DELETE /api/tickets/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
	//get user using the id in JWT
	const user = await User.findById(req.user.id)

	if (!user) {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Unauthorized access.User not found.')
	}
	//if user exists and given password is the same as registered password
	const note = await Note.findById(req.params.noteId)

	if (!note) {
		res.status(404)
		throw new Error('Ticket not found')
	}

	if (note.user.toString() !== req.user.id) {
		res.status(401)
		throw new Error('Not authorized')
	}

	await Note.findByIdAndRemove(req.params.noteId)

	res.status(200).json({ success: true })
})

module.exports = {
	getNotes,
	createNote,
	updateNote,
	deleteNote,
}

const express = require('express')
//init router
const router = express.Router({ mergeParams: true })
//import function to protect route
const { protect } = require('../middleware/authMiddleware')
//import controllers
const {
	getNotes,
	createNote,
	updateNote,
	deleteNote,
} = require('../controllers/noteController')

//create routes with imported controllers
router.route('/').get(protect, getNotes).post(protect, createNote)

//create routes for single ticket with imported controllers
router.route('/:noteId').put(protect, updateNote).delete(protect, deleteNote)

//export
module.exports = router

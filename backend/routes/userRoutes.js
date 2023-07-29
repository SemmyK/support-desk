const express = require('express')
//init router
const router = express.Router()
//import controllers
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController')
//import function to protect route
const { protect } = require('../middleware/authMiddleware')

//create routes with imported controllers
router.post('/', registerUser)
router.post('/login', loginUser)
//create protected route by adding protect as second argument to any route you want to protect
router.get('/me', protect, getMe)

//export
module.exports = router

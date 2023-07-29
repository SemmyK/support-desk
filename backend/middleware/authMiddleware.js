// MIDDLEWARE FOR PROTECTING ROUTES

//import neccessary packages
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//create fuction that will protect routes
const protect = asyncHandler(async (req, res, next) => {
	//initialize token
	let token

	//check for token in header of request
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			//get token from header (in headers is saved as: Bearer token)
			token = req.headers.authorization.split(' ')[1]
			//verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			//get user from token with password
			req.user = await User.findById(decoded.id).select('-password')
			//call next piece of middleware
			next()
		} catch (error) {
			console.log(error)
			res.status(401)
			throw new Error('Not authorized.')
		}
	}

	//check if there is no token just throw an error
	if (!token) {
		res.status(401)
		throw new Error('Not authorized.')
	}
})

module.exports = { protect }

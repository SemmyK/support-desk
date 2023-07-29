//import express async handler which will wrap all controllers
const asyncHandler = require('express-async-handler')
//import bcrypt to hash the password
const bcrypt = require('bcryptjs')
//import JWT
const jwt = require('jsonwebtoken')
//import model
const User = require('../models/userModel')

//controller for registering user
// @desc   Register a new user
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	//destructure data from request body
	const { name, email, password } = req.body

	//validation
	if (!name || !email || !password) {
		//send error with 400 status code
		//OPTION 1
		// return res.status(400).json({ message: 'Please include all fields' })
		//OPTION2
		res.status(400)
		throw new Error('Please include all fields.')
	}

	//if there is no error and all fields are there
	//check if user already exists
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exists.')
	}

	// HASH THE PASSWORD
	//step 1: get salt
	const salt = await bcrypt.genSalt(12)
	//step 2 hash password with provided salt
	const hashedPassword = await bcrypt.hash(password, salt)

	//CREATE USER
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	})

	if (user) {
		//if user was created send data back
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		//if user was not created send back error
		res.status(400)
		throw new Error('Invalid user data')
	}
})

//controller for login in user
// @desc   Login user
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	//destructure email and pass from req body
	const { email, password } = req.body
	//check if user exists in db
	const user = await User.findOne({ email })

	if (user && (await bcrypt.compare(password, user.password))) {
		//if user exists and given password is the same as registered password
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		//if user does not exist send back error
		res.status(401)
		throw new Error('Invalid credentials')
	}
})

//controller for getting user info
// @desc   Get current user
// @route  /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	//get all user data from db (without password becase we put '-password' in authMiddleware)
	const allUserData = req.user
	//choose what we want to send back from allData
	const user = {
		id: allUserData._id,
		email: allUserData.email,
		name: allUserData.name,
	}

	res.status(200).json(user)
})

//function to generate token JWT
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}

module.exports = {
	registerUser,
	loginUser,
	getMe,
}

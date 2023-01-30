const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrpyt = require('bcryptjs')
const { validationResult } = require('express-validator')

// Register User
const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const result = errors.array({ onlyFirstError: true })
    console.log(result[0].msg)
    throw new Error(result[0].msg, 422)
  }

  const { name, email, password } = req.body
  console.log('it passed reg')
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrpyt.genSalt(10)
  const hashedPassword = await bcrpyt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
})

// Login User
const loginUser = asyncHandler(async (req, res, next) => {
  // const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     return next(
  //       new Error('Invalid inputs passed, please check your data.', 422)
  //     )
  //   }
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('Could not find a user')
  }

  if (await bcrpyt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// getMe
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
  console.log('it passed getme')
})

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

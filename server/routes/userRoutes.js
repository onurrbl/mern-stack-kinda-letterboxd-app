const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { checkInputs} = require('../middleware/validations')
const {requireAuth} = require('../middleware/authMiddleware')


// /api/users 
router.post('/', checkInputs, registerUser)
router.post('/login',checkInputs, loginUser)
router.get('/me', requireAuth, getMe)

module.exports = router
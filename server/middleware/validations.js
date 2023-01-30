const { body} = require('express-validator');

const checkInputs =  [
    body('name')
      .exists()
      .trim()
      .withMessage('username is required')
  
      .notEmpty()
      .withMessage('username cannot be blank')
  
      .isLength({ max: 16 })
      .withMessage('username must be at most 16 characters long')
  
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('username contains invalid characters'),
  
    body('password')
      .exists()
      .trim()
      .withMessage('password is required')
  
      .notEmpty()
      .withMessage('password cannot be blank')
  
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 characters long')
  
      .isLength({ max: 50 })
      .withMessage('password must be at most 50 characters long')
  ]

module.exports = {
    checkInputs
}
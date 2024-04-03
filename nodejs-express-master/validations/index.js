const { check } = require('express-validator');

exports.signupValidation = [
  check('firstName', 'First Name should be at least 3 characters')
    .trim()
    .isLength({ min: 3, max: 30 }),
  check('lastName', 'Last Name is requied')
    .trim()
    .isLength({ min: 3, max: 30 }),
  check('email', 'Please include a valid email')
    .trim()
    .isEmail()
    .normalizeEmail(),
  check('dob', 'Please enter a valid date in format YYYY-MM-DD')
    .isDate(),
  check('gender', 'Select your gender')
    .notEmpty(),
  check('city', 'Add your city')
    .notEmpty(),
  check('state', 'Add your state')
    .notEmpty(),
  check('zipCode', 'Enter zip code')
    .trim()
    .notEmpty()
    .isInt()
    .withMessage('Please enter a valid zip code'),
  check('password', 'Password should have at least 6 characters, upper case, lower case and numbers.')
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$/*!@]{6,}$/),
  check('confirmPassword')
    .trim()
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password
      if (password !== confirmPassword) {
        throw new Error('Confirm Password should be same as password')
      }
    })
]

exports.validateUpdateBody = [
  check('firstName', 'First Name should be at least 3 characters')
    .trim()
    .isLength({ min: 3, max: 30 }),
  check('lastName', 'Last Name is requied')
    .trim()
    .isLength({ min: 3, max: 30 }),
  check('email', 'Please include a valid email')
    .trim()
    .isEmail()
    .normalizeEmail(),
  check('dob', 'Please enter a valid date in format YYYY-MM-DD')
    .isDate(),
  check('gender', 'Select your gender')
    .notEmpty(),
  check('city', 'Add your city')
    .notEmpty(),
]

exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password must be between 4 to 16 characters').isLength({ min: 6, max: 16 })
]
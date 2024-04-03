require('dotenv').config();
const { Router } = require('express');
const { param } = require('express-validator');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const { imageUpload } = require('../middleware/uploader');
const { signupValidation, loginValidation, validateUpdateBody } = require('../validations');
const { saveUser } = require('../middleware/auth');
const { passport } = require('../authentication/passport');
const router = Router();

// Authentication routes
router.post('/auth/login', loginValidation, passport.authenticate('local', {session: false}), authController.login);
router.post('/auth/signup', signupValidation, saveUser, authController.signup);


// Post routes
router.get('/posts',  passport.authenticate('jwt', {session : false}), postController.getAllPosts);
router.get('/posts/:postId', passport.authenticate('jwt', {session : false}), postController.getPostById);
router.put('/posts/:postId', passport.authenticate('jwt', {session : false}), postController.updatePost);
router.delete('/posts/:postId', passport.authenticate('jwt', {session : false}), [param("postId", "Post id must be integer").isInt()], postController.deletePost);

// User routes
router.get('/users',  passport.authenticate('jwt', {session : false}), userController.getAllUsers);
router.get('/users/:userId', passport.authenticate('jwt', {session : false}), userController.getUserById);
router.put('/users/:userId', validateUpdateBody, passport.authenticate('jwt', {session : false}), userController.updateUser);
router.delete('/users/:userId', [param("userId", "User id must be integer").isInt()], passport.authenticate('jwt', {session : false}), userController.deleteUser);
router.post('/users/profile', passport.authenticate('jwt', {session : false}), imageUpload.single('profile'), userController.createProfile);
router.post('/users/add-user', passport.authenticate('jwt', {session : false}), signupValidation, saveUser, userController.addUser);

module.exports = router;
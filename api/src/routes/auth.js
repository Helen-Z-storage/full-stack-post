const express = require('express');
const router = express.Router();
const { UserController } = require('./controllers');

/**
 * Register a new user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
router.post('/register', UserController.addNewUser);

/**
 * Authenticate an existing user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
router.post('/login', UserController.loginUser);

router.get('/allUsers', UserController.fetchAllUsers);
module.exports = router;

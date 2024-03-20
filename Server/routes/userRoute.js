const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser, getUserById } = require('../controller/userAuth.controller')

/**
 * @description sign up
 */
router.post('/register', registerUser);

/**
 * @description login
 */
router.post('/', loginUser);


/**
 * @description get data by id
 */
router.get('/user/:id', getUserById);


// router.get('/current', validateToken, currentUser);

module.exports = router;
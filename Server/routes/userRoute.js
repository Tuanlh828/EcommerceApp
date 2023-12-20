const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser, validateToken } = require('../controller/userAuth.controller')

router.post('/register', registerUser);

router.post('/login', loginUser);

// router.get('/current', validateToken, currentUser);

module.exports = router;
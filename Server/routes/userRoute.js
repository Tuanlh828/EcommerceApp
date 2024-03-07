const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controller/userAuth.controller')

router.post('/register', registerUser);

router.post('/', loginUser);

// router.get('/current', validateToken, currentUser);

module.exports = router;
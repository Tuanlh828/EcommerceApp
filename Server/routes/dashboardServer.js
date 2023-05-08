const express = require('express');
const router = express.Router();
const { cookieJwtAuth } = require('../controller/userAuth.controller')
const { homepage } = require('../controller/dashboard.controller')
router.get('/dashboard', cookieJwtAuth, homepage
);
module.exports = router;
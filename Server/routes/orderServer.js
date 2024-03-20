var express = require('express');
var router = express.Router();
const {getAllItem, getOrderByID} = require("../controller/order.controller")

router.get('/', getAllItem);
router.get('/:id', getOrderByID);
module.exports = router;
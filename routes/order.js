const express = require('express');
const app = express();
const router = express.Router();
const {Order} = require('../models/order.js');

const {addOrder, getOrders} = require('../controllers/Order.js');

/**
 * Order routes
 */

router.post('/', addOrder);
router.get('/', getOrders);

exports.routes = router;
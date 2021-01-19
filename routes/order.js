const express = require('express');
const app = express();
const router = express.Router();
const {Order} = require('../models/order.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {addOrder, getOrders} = require('../controllers/Order.js');

router.post('/', addOrder);
router.get('/', getOrders);

exports.routes = router;
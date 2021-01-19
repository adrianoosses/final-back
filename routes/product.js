const express = require('express');
const app = express();
const router = express.Router();
const {Product} = require('../models/product.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {addProduct, getProducts} = require('../controllers/Product.js');

router.post('/', addProduct);
router.get('/', getProducts);

exports.routes = router;
const express = require('express');
const app = express();
const router = express.Router();
const {Product} = require('../models/product.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {addProduct, getProducts} = require('../controllers/Product.js');

router.post('/', addProduct);
router.get('/', getProducts);

// Endpoint de Perfil (R)read -> GET
//router.get('/', getUsers);
//router.get('/profile', getProfile);
//router.put('/', changeUser);

// Endpoint de Baja de usuario (D) -> DELETE
//router.delete('/:id', isAdmin, deleteUserByName);
exports.routes = router;
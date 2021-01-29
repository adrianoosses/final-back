const express = require('express');
const app = express();
const router = express.Router();

//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {addProduct, getProducts, deleteProduct, getProductById} = require('../controllers/Product.js');
const {auth, authDeleteProduct} = require('../controllers/middlewares/Auth');

router.post('/', addProduct);
//router.get('/',auth, getProducts);
router.get('/',getProducts);
router.get('/details',getProductById);
router.delete('/', authDeleteProduct, deleteProduct);

exports.routes = router;
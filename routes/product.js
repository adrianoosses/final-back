const express = require('express');
const app = express();
const router = express.Router();

const {addProduct, getProducts, deleteProduct, getProductById} = require('../controllers/Product.js');
const {simpleAuth, authProduct, guessAuth} = require('../controllers/middlewares/Auth');

/**
 * Product routes
 */

//router.post('/', simpleAuth, addProduct);
router.post('/', addProduct);
router.get('/', guessAuth, getProducts);
router.get('/details', guessAuth, getProductById);
router.delete('/', authProduct, deleteProduct);

exports.routes = router;
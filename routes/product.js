const express = require('express');

const router = express.Router();

const {
	addProduct, getProducts, deleteProduct, getProductById,
} = require('../controllers/Product.js');
const { simpleAuth, authProduct, guessAuth } = require('../controllers/middlewares/Auth');
const { isAdmin } = require('../controllers/middlewares/Admin');

/**
 * Product routes
 */

router.post('/', simpleAuth, addProduct);
router.get('/', guessAuth, getProducts);
router.get('/details', guessAuth, getProductById);
router.delete('/', authProduct, isAdmin, deleteProduct);

exports.routes = router;

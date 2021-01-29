const express = require('express');
const app = express();
const router = express.Router();

const {addProduct, getProducts, deleteProduct, getProductById} = require('../controllers/Product.js');
const {auth, authDeleteProduct} = require('../controllers/middlewares/Auth');

/**
 * Product routes
 */

router.post('/', addProduct);
router.get('/',getProducts);
router.get('/details',getProductById);
router.delete('/', authDeleteProduct, deleteProduct);

exports.routes = router;
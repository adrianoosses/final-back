const express = require('express');

const router = express.Router();
const { setFavorite, getFavorite, deleteProductFavorite } = require('../controllers/ProductFavorite.js');
const { simpleAuth } = require('../controllers/middlewares/Auth');
/**
 * ProductFavorite routes
 */

router.post('/', simpleAuth, setFavorite);
router.get('/', simpleAuth, getFavorite);
router.delete('/', simpleAuth, deleteProductFavorite);

exports.routes = router;

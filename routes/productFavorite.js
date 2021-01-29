const express = require('express');
const app = express();
const router = express.Router();
const {setFavorite, getFavorite, deleteProductFavorite} = require('../controllers/ProductFavorite.js');

/**
 * ProductFavorite routes
 */

router.post('/', setFavorite);
router.get('/', getFavorite);
router.delete('/', deleteProductFavorite);

exports.routes = router;
const express = require('express');
const app = express();
const router = express.Router();

const {setOffer, getOffer} = require('../controllers/Offer.js');
const {simpleAuth, authProduct} = require('../controllers/middlewares/Auth');

/**
 * Offer routes
 */

router.post('/', simpleAuth, setOffer);
router.get('/',  authProduct, getOffer);

exports.routes = router;
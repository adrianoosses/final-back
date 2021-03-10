const express = require('express');

const router = express.Router();

const { setOffer, getOffer } = require('../controllers/Offer.js');
const { simpleAuth, authOffer } = require('../controllers/middlewares/Auth');

/**
 * Offer routes
 */

router.post('/', simpleAuth, setOffer);
router.get('/', authOffer, getOffer);

exports.routes = router;

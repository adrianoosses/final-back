const express = require('express');
const app = express();
const router = express.Router();

const {setOffer, getOffer} = require('../controllers/Offer.js');

/**
 * Offer routes
 */

router.post('/', setOffer);
router.get('/', getOffer);

exports.routes = router;
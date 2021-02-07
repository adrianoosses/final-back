const express = require('express');
const app = express();
const router = express.Router();

const {setOffer, getOffer} = require('../controllers/Offer.js');
const {simpleAuth, authOffer} = require('../controllers/middlewares/Auth');

/**
 * Offer routes
 */

router.post('/', simpleAuth, setOffer);
router.get('/',  authOffer, getOffer);
//router.get('/', getOffer);

exports.routes = router;
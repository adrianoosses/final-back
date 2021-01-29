const express = require('express');
const app = express();
const router = express.Router();
const {Order} = require('../models/order.js');
const {addScore, getScore} = require('../controllers/UserScore.js');

/**
 * UserScore routes
 */

router.post('/', addScore);
router.get('/', getScore);

exports.routes = router;
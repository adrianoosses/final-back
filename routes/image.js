const express = require('express');
const app = express();
const router = express.Router();
const {Chat} = require('../models/chat.js');
const {addImage, getImages} = require('../controllers/Image.js');

/**
 * Image routes
 */

router.post('/', addImage);
router.get('/', getImages);

exports.routes = router;
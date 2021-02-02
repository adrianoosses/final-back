const express = require('express');
const app = express();
const router = express.Router();
const {Chat} = require('../models/chat.js');
const {addImage, getImages} = require('../controllers/Image.js');
const {guessAuth} = require('../controllers/middlewares/Auth');

/**
 * Image routes
 */

router.post('/', guessAuth, addImage);
router.get('/', guessAuth, getImages);

exports.routes = router;
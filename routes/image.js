const express = require('express');

const router = express.Router();
const { addImage, getImages } = require('../controllers/Image.js');
const { guessAuth } = require('../controllers/middlewares/Auth');

/**
 * Image routes
 */

router.post('/', guessAuth, addImage);
router.get('/', guessAuth, getImages);

exports.routes = router;

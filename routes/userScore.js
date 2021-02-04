const express = require('express');
const app = express();
const router = express.Router();
const {addScore, getScore} = require('../controllers/UserScore.js');
const {simpleAuth, guessAuth} = require('../controllers/middlewares/Auth');
/**
 * UserScore routes
 */

router.post('/', simpleAuth, addScore);
router.get('/', guessAuth, getScore);

exports.routes = router;
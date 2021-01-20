const express = require('express');
const app = express();
const router = express.Router();
const {Order} = require('../models/order.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {addScore, getScore} = require('../controllers/UserScore.js');

router.post('/', addScore);
router.get('/', getScore);

exports.routes = router;
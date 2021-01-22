const express = require('express');
const app = express();
const router = express.Router();

//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {setOffer, getOffer} = require('../controllers/Offer.js');

router.post('/', setOffer);
router.get('/', getOffer);

exports.routes = router;
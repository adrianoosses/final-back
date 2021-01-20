const express = require('express');
const app = express();
const router = express.Router();
const {Chat} = require('../models/chat.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {addImage, getImages} = require('../controllers/Image.js');

router.post('/', addImage);
router.get('/', getImages);

exports.routes = router;
const express = require('express');
const app = express();
const router = express.Router();
const {Chat} = require('../models/chat.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {sendMessage, getChats} = require('../controllers/Chat.js');

router.post('/', sendMessage);
router.get('/', getChats);

exports.routes = router;
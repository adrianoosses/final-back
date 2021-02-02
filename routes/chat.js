const express = require('express');
const app = express();
const router = express.Router();
const {Chat} = require('../models/chat.js');
const {sendMessage, getChats} = require('../controllers/Chat.js');
const {authChat, authChatSend} = require('../controllers/middlewares/Auth');
/**
 * Chat routes
 */

router.post('/', authChatSend, sendMessage);
router.get('/', authChat, getChats);

exports.routes = router;
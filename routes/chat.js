const express = require('express');

const router = express.Router();
const { sendMessage, getChats } = require('../controllers/Chat.js');
const { authChat, authChatSend } = require('../controllers/middlewares/Auth');
/**
 * Chat routes
 */

router.post('/', authChatSend, sendMessage);
router.get('/', authChat, getChats);

exports.routes = router;

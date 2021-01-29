const express = require('express');
const app = express();
const router = express.Router();
const {Chat} = require('../models/chat.js');
const {sendMessage, getChats} = require('../controllers/Chat.js');

/**
 * Chat routes
 */

router.post('/', sendMessage);
router.get('/', getChats);

exports.routes = router;
const express = require('express');
const app = express();
const router = express.Router();
const {User} = require('../models/user.js');
const {getUsers, signUp, login, getListUsersAndProducts} = require('../controllers/User.js');
const {auth} = require('../controllers/middlewares/Auth');
const {isAdmin} = require('../controllers/middlewares/Admin');

/**
 * User routes
 */

router.post('/', signUp);
router.post('/login', login);

router.get('/', getUsers);
router.get('/list', isAdmin, getListUsersAndProducts);

exports.routes = router;
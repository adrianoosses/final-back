const express = require('express');
const app = express();
const router = express.Router();
const {User} = require('../models/user.js');
const {getUsers, signUp, login, getListUsersAndProducts, deleteUser} = require('../controllers/User.js');
const {auth, guessAuth} = require('../controllers/middlewares/Auth');
const {isAdmin} = require('../controllers/middlewares/Admin');

/**
 * User routes
 */

router.post('/', guessAuth, signUp);
router.post('/login', guessAuth, login);

router.get('/', guessAuth, getUsers);
router.get('/list', isAdmin, getListUsersAndProducts);
router.delete('/', isAdmin, deleteUser);

exports.routes = router;
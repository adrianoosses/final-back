const express = require('express');
const {
	getUsers, signUp, login, getListUsersAndProducts, deleteUser,
} = require('../controllers/User.js');

const router = express.Router();
const { guessAuth } = require('../controllers/middlewares/Auth');
const { isAdmin } = require('../controllers/middlewares/Admin');

/**
 * User routes
 */

router.post('/', guessAuth, signUp);
router.post('/login', guessAuth, login);
router.get('/', guessAuth, getUsers);
router.get('/list', isAdmin, getListUsersAndProducts);
router.delete('/', isAdmin, deleteUser);

exports.routes = router;

const express = require('express');
const app = express();
const router = express.Router();

//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {setFavorite, getFavorite} = require('../controllers/ProductFavorite.js');

router.post('/', setFavorite);
router.get('/', getFavorite);

exports.routes = router;
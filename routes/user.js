const express = require('express');
const app = express();
const router = express.Router();
const {User} = require('../models/user.js');
//const {auth, isAdmin} = require('./middlewares.js');
//const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');
const {getUsers, signUp, login, getListUsersAndProducts} = require('../controllers/User.js');
const {auth} = require('../controllers/middlewares/Auth');
const {isAdmin} = require('../controllers/middlewares/Admin');

router.post('/', signUp);
router.post('/login', login);

// Endpoint de Perfil (R)read -> GET
router.get('/', getUsers);
router.get('/list', isAdmin, getListUsersAndProducts);
//router.get('/profile', getProfile);
//router.put('/', changeUser);

// Endpoint de Baja de usuario (D) -> DELETE
//router.delete('/:id', isAdmin, deleteUserByName);
exports.routes = router;
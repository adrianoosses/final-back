const PasswordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Product } = require('../models/index.js');

const claveToken = process.env.TOKEN_KEY;

/**
 * Users controller
 */

const getAllUsers = async () => User.findAll();

exports.getUsers = async (req, res) => {
    let user = '';
    try {
        user = await getAllUsers(req, res);
        res.status(200).json(user);
        return true;
    } catch {
        res.status(400).json({ error: user });
        return false;
    }
};

exports.signUp = async (req, res) => {
    const msg = 'User added.';
    const SchemaPasswordValidator = new PasswordValidator();
    SchemaPasswordValidator
	.is().min(8)
	.is().max(100)
	.has()
	.uppercase()
	.has()
	.lowercase()
	.has()
	.digits(2)
	.has()
	.not()
	.spaces()
	.is()
	.not()
	.oneOf(['Password123', 'Qwerty12345']);
    const {
		name, lastName, email, password, roleDb, birthDate, address, phone, card, createdAt, updatedAt,
    } = req.body;
    const role = roleDb || 'Client';
    try {
        if (!SchemaPasswordValidator.validate(password)) return res.status(401).json({ error: 'weak password' });
        const newUser = await User.create({
			name,
			lastName,
			email,
			password: bcrypt.hashSync(password, 6),
			role,
			birthDate,
			address,
			phone,
			card,
			createdAt,
			updatedAt,
        });
        res.status(200).json({ message: `Good: ${msg}`, newUser });
    } catch (error) {
        console.error(error);
        res.status(400)
        .json({ error: 'Wrong' });
    }
    return res;
};

const getUserByEmail = async (req) => {
    let email = '';
    if (req.body.email) email = req.body.email;
    if (req.query.email) email = req.query.email;
    const fUser = await User.findAll({
        where: {
          email,
        },
      });
    return fUser;
};

exports.getUserByGivenEmail = async (email) => {
    const fUser = await User.findAll({
        where: {
          email,
        },
      });
    return fUser;
};

exports.getUserByEmailQ = (req) => getUserByEmail(req);

exports.userHasProduct = async (userId, productId) => Product.findAll({
        attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus',
        'mainImage', 'sellerId', 'category'],
        where: {
          id: productId,
          sellerId: userId,
        },
      });

const generateToken = (user) => {
    const newUser = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(newUser, claveToken, { expiresIn: 60 * 60 * 24 });
};

exports.decodeToken = (token) => {
    try {
        return jwt.verify(token, claveToken);
    } catch (e) {
        return null;
    }
};

exports.getUsers = async (req, res) => {
    let user = '';
    try {
        if (req.query.email || req.query.email) user = await getUserByEmail(req);
        else user = await getAllUsers(req, res);
        res.status(200).json(user);
        return true;
    } catch {
        res.status(400).json({ error: user });
        return false;
    }
};

exports.login = async (req, res) => {
    try {
        const { password } = req.body;
        const testCode = req.headers.testcode;
        const usrLogin = await getUserByEmail(req);
        const isValid = bcrypt.compareSync(password, usrLogin[0].password, 6);
        if (usrLogin && isValid && (testCode === process.env.TEST_CODE)) {
            const token = generateToken(usrLogin[0]);
            res.status(200).json({ message: 'Logged', token });
            return true;
        }
		res.status(400).json({ error: 'Wrong user or password' });
		return false;
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'error' });
        return false;
    }
};

exports.getListUsersAndProducts = async (req, res) => {
   const products = await User.findAll({
        attributes: ['id', 'name', 'email'],
        include: [{
            model: Product,
            attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage', 'sellerId', 'category'],
        }],
    });

    try {
        res.status(200).json(products);
        return true;
    } catch {
        res.status(400).json({ error: 'error' });
        return false;
    }
};

exports.deleteUser = async (req, res) => {
    let msg = '';
    const { id } = req.query;
    try {
        msg = 'User deleted';
        await User.destroy({ where: { id } });
        res.status(200).json({ message: `Good: ${msg}` });
    } catch {
        res.status(400).json({ error: 'Wrong' });
    }
    return true;
};

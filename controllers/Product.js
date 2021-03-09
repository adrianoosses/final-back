const { Product, User } = require('../models/index.js');
const { decodeToken } = require('./User');

/**
 * Products controller
 */
const getAllProductPrev = async (req) => {
    try {
        const page = req.query.page || 1;
        const numItems = 12;
        const offset = (page - 1) * numItems;
        const products = await Product.findAll({
            attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage'],
            offset,
            limit: numItems,
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'],
            }],
        });
        return products;
    } catch (error) {
        console.error(error);
		return false;
    }
};

const getProductByUserEmail = async (email) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage',
            'sellerId', 'category'],
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'],
                where: { email },
            }],
        });
        return products;
    } catch (error) {
        console.error(error);
		return false;
    }
};

exports.getProducts = async (req, res) => {
    let products = '';
    try {
        if (req.query.email) products = await getProductByUserEmail(req.query.email);
        else products = await getAllProductPrev(req);
        res.status(200).json(products);
        return true;
    } catch {
        res.status(400).json({ error: products });
        return false;
    }
};

const getProductByIdQ = async (id) => {
    const products = await Product.findAll({
        attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage',
        'sellerId', 'category'],
        where: { id },
        include: [{
            model: User,
            attributes: ['id', 'name', 'email'],
        }],
    });
    return products;
};

exports.getProductById = async (req, res) => {
    let product = '';
    try {
        if (req.query.id) product = await getProductByIdQ(req.query.id);
        res.status(200).json(product);
        return true;
    } catch {
        res.status(400).json({ error: product });
        return false;
    }
};

/**
 * Set one image on both tables products and images
 */

exports.addProduct = async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    let msg = '';
    const {
		title, description, mainImage, price, sellDate, productStatus, createdAt, updatedAt,
	} = req.body;
    try {
        await Product.create({
            sellerId: decodedToken.id,
			title,
			price,
			description,
			sellDate,
			productStatus,
			mainImage,
			createdAt,
			updatedAt,
        });
        /* let q2 = `INSERT INTO Images (productId, path, createdAt, updatedAt)
            VALUES((SELECT MAX(id) FROM Products), ?, ?, ?);`; */
        msg = 'Product added.';
        res.status(200)
        .json({ message: `Good: ${msg}` });
    } catch {
        res.status(400)
        .json({ error: 'Wrong' });
    }
    return true;
};

exports.deleteProduct = async (req, res) => {
    let msg = '';
    const { id } = req.query;
    try {
        await Product.destroy({ where: { id } });
        msg = 'Product deleted';
        res.status(200).json({ message: `Good: ${msg}` });
    } catch {
        res.status(400).json({ error: 'Wrong' });
    }
    return true;
};

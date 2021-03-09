const { ProductFavorite, Product, User } = require('../models/index.js');
const { decodeToken } = require('./User');

/**
 * ProductFavorite controller
 */

const getFavorites = async (userId) => {
    try {
        const favorite = await Product.findAll({
            attributes: ['id', 'sellerId', 'title', 'mainImage', 'description', 'price', 'sellDate',
            'productStatus', 'category'],
            include: [{
                model: ProductFavorite,
                where: { userId },
                include: [{
                    model: User,
                    attributes: ['name', 'email'],
                }],
            }],
        });
        return favorite;
    } catch (error) {
        console.error(error);
		return false;
    }
};

exports.getFavorite = async (req, res) => {
    let favorite = '';
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    try {
		favorite = await getFavorites(decodedToken.id);
        res.json(favorite);
        return true;
    } catch {
        res.status(400).json({ error: favorite });
        return false;
    }
};

exports.setFavorite = async (req, res) => {
    let msg = '';
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    const { productId, createdAt, updatedAt } = req.body;
    try {
        msg = 'Favorite added.';
        await ProductFavorite.create({
            userId: decodedToken.id, productId, createdAt, updatedAt,
        });
        res.status(200)
        .json({ message: `Good: ${msg}` });
        return true;
    } catch {
        res.status(400)
        .json({ error: 'Wrong' });
        return false;
    }
};

exports.deleteProductFavorite = async (req, res) => {
    let msg = '';
    const { productid } = req.query;
    try {
        msg = 'Favorite added.';
        await ProductFavorite.destroy({ where: { productId: productid } });
        res.status(200)
        .json({ message: `Good: ${msg}` });
        return true;
    } catch {
        res.status(400)
        .json({ error: 'Wrong' });
        return false;
    }
};

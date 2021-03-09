const { sequelize } = require('../models/index.js');

/**
 * Image controller
 */

const getImagesByProductId = async (productId) => {
    const q = `SELECT * FROM Images WHERE productId='${productId}'`;
    const images = await sequelize.query(q, { type: sequelize.QueryTypes.SELECT });
    return images;
};

exports.getImages = async (req, res) => {
    let images = '';
    try {
        images = await getImagesByProductId(req.query.product);
        res.json(images);
        return true;
    } catch {
        res.status(400).json({ error: images });
        return false;
    }
};

exports.addImage = async (req, res) => {
    let msg = '';
    const {
		productId, path, createdAt, updatedAt,
	} = req.body;
    const q = `INSERT INTO Images (productId, path, createdAt, updatedAt)
        VALUES (${productId}, '${path}', '${createdAt}', '${updatedAt}')`;
    try {
        msg = 'Image added.';
        await sequelize.query(q, { type: sequelize.QueryTypes.INSERT });
        res.status(200).json({ message: `Good: ${msg}` });
		return true;
    } catch {
        res.status(400).json({ error: 'Wrong' });
		return false;
    }
};

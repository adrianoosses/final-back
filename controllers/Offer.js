const { Offer, Product, User } = require('../models/index.js');
const { decodeToken } = require('./User');

/**
 * Offer controller
 */

const getOffersProductId = async (productId) => {
    const offer = await Offer.findAll({
        attributes: ['offerValue', 'createdAt', 'updatedAt'],
        where: { productId },
        include: [{
            model: Product,
            attributes: ['title'],
        }, {
            model: User,
            attributes: ['email'],
        }],
        order: [['offerValue', 'DESC']],
    });
    return offer;
};

exports.getOffer = async (req, res) => {
	let offer = '';
    try {
        offer = await getOffersProductId(req.query.productid);
        res.status(200).json(offer);
        return true;
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: offer });
        return false;
    }
};

exports.setOffer = async (req, res) => {
    let msg = '';
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    const {
		productId, offerValue, createdAt, updatedAt,
	} = req.body;
    try {
        msg = 'Score added.';
        await Offer.create({
			sellerId: decodedToken.id, productId, offerValue, createdAt, updatedAt,
		});
        res.status(200).json({ message: `Good: ${msg}` });
        return true;
    } catch {
        res.status(400).json({ error: 'Wrong' });
        return false;
    }
};

const { decodeToken, userHasProduct } = require('../User');
/**
 * User auth middleware
 */
exports.auth = (req, res, next) => {
    try {
        if ((!!req.query.email) && (!!decodeToken(req.headers.authorization))) {
            const token = req.headers.authorization;
            const { email } = req.query;
            const decodedToken = decodeToken(token);
            if (decodedToken.email === email) return next();
            return res.token.status(400).json({ error: 'Error' });
        }
        return res.status(400).json({ error: 'Error' });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * Check only if user is signed in
 */
exports.simpleAuth = (req, res, next) => {
    try {
        if (decodeToken(req.headers.authorization)) return next();
        return res.status(401).json({ error: 'error' });
    } catch (error) {
        return res.status(402).json({ error });
    }
};

/**
 * Chat middleware
 */
exports.authChat = (req, res, next) => {
    try {
        if ((!!req.query.srcemail) && (!!decodeToken(req.headers.authorization))) {
            const token = req.headers.authorization;
            const email = req.query.srcemail;
            const decodedToken = decodeToken(token);
            if (decodedToken.email === email) return next();
            return res.token.status(400).json({ error: 'Error' });
        }
        return res.status(400).json({ error: 'Error' });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * Chat middleware send
 */
exports.authChatSend = (req, res, next) => {
    try {
        if ((!!req.body.source) && (!!decodeToken(req.headers.authorization))) {
            if (decodeToken(req.headers.authorization).id === req.body.source) return next();
            return res.token.status(400).json({ error: 'Error' });
        }
        return res.status(400).json({ error: 'Error' });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

/**
 * Product auth middleware
 */
exports.authProduct = (req, res, next) => {
    if (req.query.id) {
        const token = req.headers.authorization;
        if (decodeToken(token)) {
            const productId = req.query.id;
            const decodedToken = decodeToken(token);
            if (userHasProduct(decodedToken.id, productId)) return next();
            return res.status(400).json({ error: 'Error' });
		}
        return res.status(400).json({ error: 'Error' });
    }
    return res.status(400).json({ error: 'Error' });
};

exports.authOffer = (req, res, next) => {
    const token = req.headers.authorization;
    if (decodeToken(token)) {
        const productId = req.query.productid;
        const decodedToken = decodeToken(token);
        if (userHasProduct(decodedToken.id, productId)) return next();
        return res.status(400).json({ error: 'Error' });
    }
	return res.status(400).json({ error: 'Error' });
};

exports.guessAuth = (req, res, next) => {
    next();
};

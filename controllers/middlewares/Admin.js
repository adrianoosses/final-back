const { decodeToken } = require('../User');

/**
 * Admin middleware
 */
exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = decodeToken(token);
        if (decodedToken.role === 'Admin') {
            next();
        } else {
            res.status(400).json({ error: 'ERROR: not authorized.' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

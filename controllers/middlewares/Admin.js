const { decodeToken } = require('../User');

/**
 * Admin middleware
 */
exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = decodeToken(token);
        if( decodedToken.role === 'Admin'){
            //console.log("User is admin.");
            next();
        } else {
            //console.log("ERROR: User is not admin.");
            res
            .status(400)
            .json({error:"ERROR: not authorized."})
        }
    } catch (error) {
        //console.log("JWT malformed");
        res
        .status(400)
        .json({error:error});
    }
};

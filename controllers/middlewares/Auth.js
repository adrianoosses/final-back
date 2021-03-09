const {decodeToken, userHasProduct} = require('../User');

/**
 * User auth middleware
 */


exports.auth = (req, res, next) => {
    try{
        if((!!req.query.email) && (!!decodeToken(req.headers.authorization))){
            const token = req.headers.authorization;
            let email = req.query.email;
            let decodedToken = decodeToken(token);
            if(decodedToken.email === email) next();
            else return res.token.status(400).json({error:"Error"}); 
        } else {
            return res.status(400).json({error:"Error"});
        }
    } catch(error){
        return res.status(400).json({error:error});
    }
}

/**
 * Check only if user is signed in
 */
exports.simpleAuth = (req, res, next) => {
    try{
        if(decodeToken(req.headers.authorization)){
            next(); 
        }    
        else return res.status(401).json({error:error})
    } catch(error){
        return res.status(402).json({error:error});
    }
}

/**
 * Chat middleware
 */
exports.authChat = (req, res, next) => {
    try{
        if((!!req.query.srcemail) && (!!decodeToken(req.headers.authorization))){
            const token = req.headers.authorization;
            let email = req.query.srcemail;
            let decodedToken = decodeToken(token);
            if(decodedToken.email === email) next();
            else return res.token.status(400).json({error:"Error"}); 
        } else {
            return res.status(400).json({error:"Error"});
        }
    } catch(error){
        return res.status(400).json({error:error});
    }
}

/**
 * Chat middleware send
 */
exports.authChatSend = (req, res, next) => {
    try{
        if((!!req.body.source) && (!!decodeToken(req.headers.authorization))){
            const token = req.headers.authorization;
            let srcId = req.body;
            if(decodeToken(req.headers.authorization).id === req.body.source) next();
            else return res.token.status(400).json({error:"Error"}); 
        } else {
            return res.status(400).json({error:"Error"});
        }
    } catch(error){
        return res.status(400).json({error:error});
    }
}

/**
 * Product auth middleware
 */
exports.authProduct = (req, res, next) => {
    if(req.query.id){
        const token = req.headers.authorization;
        if(decodeToken(token)){ 
            let productId = req.query.id;
            let decodedToken = decodeToken(token);
            if(userHasProduct(decodedToken.id, productId)) next(); 
            else return res.status(400).json({error:"Error"}); 
        }else{
            return res.status(400).json({error:"Error"});
        }
    } else {
        return res.status(400).json({error:"Error"});
    }
}

exports.authOffer = (req, res, next) => {
    const token = req.headers.authorization; 
    if(decodeToken(token)){ 
        let productId = req.query.productid;
        let decodedToken = decodeToken(token);
        if(userHasProduct(decodedToken.id, productId)) next(); 
        else return res.status(400).json({error:"Error"}); 
    }else{
        return res.status(400).json({error:"Error"});
    }
}

exports.guessAuth = (req, res, next) => {
    next();
}
const {decodeToken, userHasProduct} = require('../User');

/**
 * User auth middleware
 */

 /*
exports.auth = (req, res, next) => {
    console.log("------------ENTRA AUTH!");
    try{
        console.log("------------ENTRA TRY!");
        console.log("req.query.email", req.query.email);
        console.log("decodeToken(token) ", decodeToken(req.headers.authorization));
        if(req.query.email && decodeToken(token)){
            console.log("------------PRIMER IF!");
            const token = req.headers.authorization;
            console.log("TOKEN: ", req.headers.authorization);
                console.log("---------entra en decode");
                let email = req.query.email;
                let decodedToken = decodeToken(token);
                console.log("email", email);
                console.log("decodedToken", decodedToken.email);
                if(decodedToken.email === email) next();
                else return res.status(400).json({error:"Error"}); 
        } else {
            //console.log("NEXT");
            //next();
            console.log("------------PRIMER ELSE!");
            return res.status(400).json({error:"Error"});
        }
    } catch(error){
        return res.status(400).json({error:error});
    }
}
*/

exports.auth = (req, res, next) => {
    console.log("-----------ENTRA A AUTH");
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
    console.log("-----------ENTRA A AUTH SIMPLE");
    try{
        
        let decodif = decodeToken(req.headers.authorization);
        console.log("decodif", decodif);
        if(decodeToken(req.headers.authorization)) next();    
        else return res.status(400).json({error:error})
    } catch(error){
        return res.status(400).json({error:error});
    }
}

/**
 * Chat middleware
 */
exports.authChat = (req, res, next) => {
    console.log("-----------ENTRA A AUTH CHAT");
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
    console.log("-----------ENTRA A AUTH CHAT SEND");
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
    console.log("-----------ENTRA A AUTH PRODUCT");
    if(req.query.id){
        const token = req.headers.authorization;
        console.log("TOKEN: ", req.headers.authorization);
        if(decodeToken(token)){ 
            let productId = req.query.id;
            let decodedToken = decodeToken(token);
            //console.log("productId", productId);
            //console.log("decodedToken", decodedToken.id);
            if(userHasProduct(decodedToken.id, productId)) next(); 
            else return res.status(400).json({error:"Error"}); 
        }else{
            return res.status(400).json({error:"Error"});
        }
    } else {
        //console.log("NEXT");
        //next();
        return res.status(400).json({error:"Error"});
    }
}

exports.guessAuth = (req, res, next) => {
    next();
}
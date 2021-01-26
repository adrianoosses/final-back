const {decodeToken, userHasProduct} = require('../User');

exports.auth = (req, res, next) => {
    //console.log("TOKEN auth: " + us.generateToken(req.body));
    if(req.query.email){
        const token = req.headers.authorization;
        console.log("TOKEN: ", req.headers.authorization);
        if(decodeToken(token)){ 
            let email = req.query.email;
            let decodedToken = decodeToken(token);
            console.log("email", email);
            console.log("decodedToken", decodedToken.email);
            if(decodeToken.email === email) next();  
        }else{
            console.log("EMAIL");
            return res.json({error:"Error"});
        }
    } else {
        console.log("NEXT");
        next();
    }
}

exports.authDeleteProduct = (req, res, next) => {
    //console.log("TOKEN auth: " + us.generateToken(req.body));
    if(req.query.id){
        const token = req.headers.authorization;
        console.log("TOKEN: ", req.headers.authorization);
        if(decodeToken(token)){ 
            let productId = req.query.id;
            let decodedToken = decodeToken(token);
            console.log("productId", productId);
            console.log("decodedToken", decodedToken.id);
            if(userHasProduct(decodedToken.id, productId)) next(); 
            else return res.status(400).json({error:"Error"}); 
        }else{
            return res.status(400).json({error:"Error"});
        }
    } else {
        console.log("NEXT");
        next();
    }
}
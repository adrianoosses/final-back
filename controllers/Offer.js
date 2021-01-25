const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

let getOffersProductId = async(productId) =>{
    let q = `SELECT sellerId, productId, offerValue, offers.createdAt, offers.updatedAt
    FROM OFFERS
    WHERE productId = "${productId}";`
    let offer = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("offer", offer);
    return offer;   
}

exports.getOffer = async(req, res) => {
    let score = "";
    try{
        const offer = await getOffersProductId(req.query.product);
        console.log("offer: ", offer);
        res.json(offer);
        return true;
    }catch{
        res.status(400).json({"Error":offer});
        return false;
    } 
}

exports.setOffer = async(req, res) =>{
    let msg = '';
    let {sellerEmail, productId, offerValue, createdAt, updatedAt} = req.body;
    let q = `
    INSERT INTO OFFERS (sellerId, productId, offerValue, createdAt, updatedAt)
    VALUES((SELECT id
    FROM USERS
    WHERE users.email = '${sellerEmail}'
    ), '${productId}', '${offerValue}', '${createdAt}', '${updatedAt}')`;
    
    try{
        msg = 'Score added.';
        let offer = await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
        return true;
    }catch{
        res.status(400)
        .json({error:"Wrong"});
        return false;
    }
};

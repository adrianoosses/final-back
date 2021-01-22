const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

let getOffersByEmail = async(sellerEmail) =>{
    let q = `SELECT sellerId, productId, offerValue, offers.createdAt, offers.updatedAt
    FROM OFFERS
    INNER JOIN USERS
    ON users.id = offers.sellerId
    WHERE users.email = "${sellerEmail}";`
    let score = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("score", score);
    return score;   
}

exports.getOffer = async(req, res) => {
    let score = "";
    try{
        console.log("email: ", req.query);
        const offer = await getOffersByEmail(req.query.email);
        console.log("offer: ", score);
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

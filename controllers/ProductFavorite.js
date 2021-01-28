const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

let getFavoriteByEmail = async(userEmail) =>{
    let q = `SELECT PRODUCTS.id, sellerId, title, mainImage, description, price, sellDate, productStatus, USERS.name, USERS.email, category,
    PRODUCTS.createdAt, PRODUCTS.updatedAt
	FROM PRODUCTS
    INNER JOIN PRODUCTFAVORITES
    ON productfavorites.productId = products.id
    INNER JOIN USERS
    ON users.id = PRODUCTFAVORITES.userId
    WHERE users.email = ?;`
    let favorite = await sequelize.query(q, {replacements: [email],
        type: sequelize.QueryTypes.SELECT})
    console.log("favorite", favorite);
    return favorite;   
}

exports.getFavorite = async(req, res) => {
    let favorite = "";
    try{
        console.log("email: ", req.query);
        const favorite = await getFavoriteByEmail(req.query.email);
        console.log("favorite: ", favorite);
        res.json(favorite);
        return true;
    }catch{
        res.status(400).json({"Error":favorite});
        return false;
    } 
}

exports.setFavorite = async(req, res) =>{
    let msg = '';
    let {userEmail, productId, createdAt, updatedAt} = req.body;
    let q = `
    INSERT INTO PRODUCTFAVORITES (userId, productId, createdAt, updatedAt)
    VALUES((SELECT id
    FROM USERS
    WHERE users.email = '${userEmail}'
    ), '${productId}', '${createdAt}', '${updatedAt}')`;
    
    try{
        msg = 'Favorite added.';
        let favorite = await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
        return true;
    }catch{
        res.status(400)
        .json({error:"Wrong"});
        return false;
    }
};

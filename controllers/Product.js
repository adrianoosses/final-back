const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

let getAllProducts = async(req, res) =>{
    let q = `SELECT * FROM PRODUCTS`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

let getProductByUserId = async(userId) =>{
    let q = `SELECT * FROM PRODUCTS WHERE userId='${userId}'`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

exports.getProducts = async(req, res) => {
    let products = "";
    try{
        if(req.query.userid) products = await getAllProducts(req.query.userid);
        else products = await getAllProducts(req, res);
        console.log("product: ", products);
        res.json(products);
        return true;
    }catch{
        res.status(400).json({"Errordd":products});
        return false;
    } 
}

exports.addProduct = (req, res) =>{
    let msg = '';
    let {userId, title, description, photo, price, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO PRODUCTS (userId, title, price, description, photo, createdAt, updatedAt)
        VALUES ('${userId}', '${title}', '${price}', '${description}', '${photo}', '${createdAt}', '${updatedAt}')`;
    try{
        msg = 'Product added.';
        sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
    }catch{
        res.status(400)
        .json({error:"Wrong"});
    }
    return true;
};


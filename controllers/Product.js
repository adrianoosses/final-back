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

let getAllProductPrev = async(req, res) => {
    let q = `
        SELECT title, price, img.path
        FROM PRODUCTS
        INNER JOIN IMAGES AS img
        ON products.id = img.productId; `
    let products = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT});
    return products;
}

let getProductByUserId = async(userId) =>{
    let q = `SELECT * FROM PRODUCTS WHERE userId='${userId}'`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

let getProductId = async(id) =>{
    let q = `SELECT * FROM PRODUCTS WHERE id='${id}'`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

exports.getProducts = async(req, res) => {
    let products = "";
    try{
        products = await getAllProductPrev(req, res);
        console.log("product: ", products);
        res.json(products);
        return true;
    }catch{
        res.status(400).json({"Error":products});
        return false;
    } 
}

exports.addProduct = async (req, res) =>{
    let msg = '';
    let {buyerId, title, description, price, sellDate, productStatus, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO PRODUCTS (buyerId, title, price, description, sellDate, 
        productStatus, createdAt, updatedAt)
        VALUES ('${buyerId}','${title}', '${price}', '${description}', '${sellDate}',  
        '${productStatus}', '${createdAt}', '${updatedAt}')`;
    try{
        msg = 'Product added.';
        await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good: " + msg});
    }catch{
        res.status(400)
        .json({error:"Wrong"});
    }
    return true;
};


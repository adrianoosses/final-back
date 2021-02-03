const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

/**
 * Products controller
 */


let getAllProductPrev = async(req, res) => {
    const page = req.query.page || 1;
    const numItems = 12;
    const offset = (page-1)*numItems;
    let q = `
        SELECT Products.id, title, price, description, sellDate, productStatus, mainImage, usr.name, usr.email
        FROM Products
        JOIN Users as usr
        ON Products.sellerId = usr.id
        LIMIT ${offset},${numItems}`
    let products = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT});
    return products;
}



let getProductByUserEmail = async(email) =>{
    //console.log("get product by emailllll")
    let q = `SELECT Products.id, sellerId, title, mainImage, description, price, sellDate, productStatus, USERS.name, USERS.email, category,
    Products.createdAt, Products.updatedAt 
            FROM Products
            INNER JOIN Users
            ON Products.sellerId = Users.id
            WHERE Users.email=?`
    let product = await sequelize.query(q, 
        {replacements: [email],
            type: sequelize.QueryTypes.SELECT})
    //console.log("products",product);
    return product;   
}

exports.getProducts = async(req, res) => {
    //console.log("entra en getProducts");
    let products = "";
    try{
        if(req.query.email) products = await getProductByUserEmail(req.query.email);
        else products = await getAllProductPrev(req, res);
        //console.log("product: ", products);
        res.status(200).json(products);
        return true;
    }catch{
        res.status(400).json({"Error":products});
        return false;
    } 
}
let getProductByIdQ = async(id) =>{
    //console.log("get product by emailllll")
    let q = `SELECT Products.id, sellerId, title, mainImage, description, price, sellDate, productStatus, Users.name, Users.email, category,
    Products.createdAt, Products.updatedAt
            FROM Products
            INNER JOIN Users
            ON Users.ID = Products.sellerId
            WHERE Products.id=?`
    let product = await sequelize.query(q, 
        {replacements: [id],
            type: sequelize.QueryTypes.SELECT})
    //console.log("products",product);
    return product;   
}

exports.getProductById = async(req, res) => {
    //console.log("entra en getProducts");
    let product = "";
    try{
        //console.log("IDIIDI: ", req.query.id);
        if(req.query.id) product = await getProductByIdQ(req.query.id);
        //console.log("product: ", product);
        res.status(200).json(product);
        return true;
    }catch{
        res.status(400).json({"Error":product});
        return false;
    } 
}

/**
 * Set one image on both tables products and images
 */

exports.addProduct = async (req, res) =>{
    let msg = '';
    let {sellerEmail, title, description, mainImage, price, sellDate, productStatus, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO Products ( sellerId, title, price, description, sellDate, 
        productStatus, mainImage, createdAt, updatedAt)
        VALUES ((SELECT id
            FROM Users
            WHERE Users.email = ?
            ),?, ?, ?, ?,  
        ?, ?,  ?, ?)`;
    let q2 = `INSERT INTO Images (productId, path, createdAt, updatedAt) 
        VALUES((SELECT MAX(id) FROM Products), ?, ?, ?);`;
    try{
        msg = 'Product added.'; 
        const p1 = sequelize.query(q, 
            {replacements: [sellerEmail,title,price,description,sellDate,productStatus,mainImage,createdAt,updatedAt],
            type: sequelize.QueryTypes.INSERT});
        const p2 = sequelize.query(q2, 
            {replacements: [mainImage,createdAt,updatedAt],
                type: sequelize.QueryTypes.INSERT,});
        await Promise.all([p1, p2])
        res.status(200)
        .json({message:"Good: " + msg});
    }catch{
        res.status(400)
        .json({error:"Wrong"});
    }
    return true;
};

exports.deleteProduct = async (req, res) =>{
    let msg = '';
    let {id} = req.query;
    let q = `DELETE FROM Products
            WHERE id = ?`;
    try{
        msg = 'Product deleted';
        await sequelize.query(q, {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE})
        res.status(200)
        .json({message:"Good: " + msg});
    }catch{
        res.status(400)
        .json({error:"Wrong"});
    }
    return true;
};

exports.addImageToProduct = async (req, res) =>{
    let msg = '';
    let q = `SELECT LAST_INSERT_ID();`;
    try{
        msg = 'Image added.';
        await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good: " + msg});
    }catch{
        res.status(400)
        .json({error:"Wrong"});
    }
    return true;
};


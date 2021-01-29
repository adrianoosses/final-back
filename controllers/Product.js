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
    const page = req.query.page;
    const numItems = 12;
    const offset = (page-1)*numItems;
    let q = `
        SELECT PRODUCTS.id, title, price, description, sellDate, productStatus, mainImage, usr.name, usr.email
        FROM PRODUCTS
        JOIN USERS as usr
        ON products.sellerId = usr.id
        LIMIT ${offset},${numItems}`
    let products = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT});
    return products;
}

/*
let getAllProductPrev = async(req, res) => {
    let q = `
        SELECT title, price, description, sellDate, productStatus, img.path, usr.name, usr.email
        FROM PRODUCTS
        JOIN IMAGES AS img
        ON products.id = img.productId
        JOIN USERS as usr
        ON products.sellerId = usr.id; `
    let products = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT});
    return products;
}
*/




let getProductByUserEmail = async(email) =>{
    console.log("get product by emailllll")
    let q = `SELECT PRODUCTS.id, sellerId, title, mainImage, description, price, sellDate, productStatus, USERS.name, USERS.email, category,
    PRODUCTS.createdAt, PRODUCTS.updatedAt 
            FROM PRODUCTS
            INNER JOIN USERS
            ON products.sellerId = users.id
            WHERE users.email=?`
    let product = await sequelize.query(q, 
        {replacements: [email],
            type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

exports.getProducts = async(req, res) => {
    console.log("entra en getProducts");
    let products = "";
    try{
        if(req.query.email) products = await getProductByUserEmail(req.query.email);
        else products = await getAllProductPrev(req, res);
        console.log("product: ", products);
        res.status(200).json(products);
        return true;
    }catch{
        res.status(400).json({"Error":products});
        return false;
    } 
}
let getProductByIdQ = async(id) =>{
    console.log("get product by emailllll")
    let q = `SELECT PRODUCTS.id, sellerId, title, mainImage, description, price, sellDate, productStatus, USERS.name, USERS.email, category,
    PRODUCTS.createdAt, PRODUCTS.updatedAt
            FROM PRODUCTS
            INNER JOIN users
            ON USERS.ID = PRODUCTS.sellerId
            WHERE products.id=?`
    let product = await sequelize.query(q, 
        {replacements: [id],
            type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

exports.getProductById = async(req, res) => {
    console.log("entra en getProducts");
    let product = "";
    try{
        console.log("IDIIDI: ", req.query.id);
        if(req.query.id) product = await getProductByIdQ(req.query.id);
        console.log("product: ", product);
        res.status(200).json(product);
        return true;
    }catch{
        res.status(400).json({"Error":product});
        return false;
    } 
}


exports.addProduct = async (req, res) =>{
    let msg = '';
    let {sellerEmail, title, description, mainImage, price, sellDate, productStatus, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO PRODUCTS ( sellerId, title, price, description, sellDate, 
        productStatus, mainImage, createdAt, updatedAt)
        VALUES ((SELECT id
            FROM USERS
            WHERE users.email = ?
            ),?, ?, ?, ?,  
        ?, ?,  ?, ?)`;
    let q2 = `INSERT INTO IMAGES (productId, path, createdAt, updatedAt) 
        VALUES((SELECT MAX(id) FROM PRODUCTS), ?, ?, ?);`;

        //LAST_INSERT_ID()SELECT MAX(id) FROM PRODUCTS;
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
    let q = `DELETE FROM PRODUCTS
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
    //let {sellerEmail, title, description, price, sellDate, productStatus, createdAt, updatedAt} = req.body;
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


const {sequelize, Product, User} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');
let {decodeToken} = require('../controllers/User');

/**
 * Products controller
 */
let getAllProductPrev = async(req, res) => {
    try{
        console.log("getAllProductPrev");
        const page = req.query.page || 1;
        const numItems = 12;
        const offset = (page-1)*numItems;
        const products = await Product.findAll({ 
            attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage'],
            offset: offset, 
            limit: numItems,
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });
        return products;
    }catch(error){
        console.error(error);
    }
}



let getProductByUserEmail = async(email) =>{
    try{
        const products = await Product.findAll({ 
            attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage', 
            'sellerId', 'category'],
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'],
                where: {email}
            }]
        });
        return products;
    }catch(error){
        console.error(error);
    }
}

exports.getProducts = async(req, res) => {
    let products = "";
    try{
        if(req.query.email) products = await getProductByUserEmail(req.query.email);
        else products = await getAllProductPrev(req, res);
        res.status(200).json(products);
        return true;
    }catch{
        res.status(400).json({"Error":products});
        return false;
    } 
}
let getProductByIdQ = async(id) =>{
    const products = await Product.findAll({ 
        attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage', 
        'sellerId', 'category'],
        where: {id:id},
        include: [{
            model: User,
            attributes: ['id', 'name', 'email']
        }]
    });
    return products;   
}

exports.getProductById = async(req, res) => {
    let product = "";
    try{
        if(req.query.id) product = await getProductByIdQ(req.query.id);
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
    const token = req.headers.authorization;
    let decodedToken = decodeToken(token);
    let msg = '';
    let {title, description, mainImage, price, sellDate, productStatus, createdAt, updatedAt} = req.body;
    
    try{
        const newProduct = await Product.create({ 
            sellerId:decodedToken.id, 
            title, price, description, sellDate, productStatus, mainImage, createdAt, updatedAt
        });
        /*let q2 = `INSERT INTO Images (productId, path, createdAt, updatedAt) 
            VALUES((SELECT MAX(id) FROM Products), ?, ?, ?);`;*/
        msg = 'Product added.'; 
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
    try{
        await Product.destroy({where:{id}});
        msg = 'Product deleted';
        res.status(200).json({message:"Good: " + msg});
    }catch{
        res.status(400).json({error:"Wrong"});
    }
    return true;
};
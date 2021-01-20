const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

/*
let getAllProducts = async(req, res) =>{
    let q = `SELECT * FROM PRODUCTS`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}
*/

let getImagesByProductId = async(productId) =>{
    let q = `SELECT * FROM IMAGES WHERE productId='${productId}'`
    let images = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("images", images);
    return images;   
}
/*
let getProductId = async(id) =>{
    let q = `SELECT * FROM PRODUCTS WHERE id='${id}'`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}
*/

exports.getImages = async(req, res) => {
    let images = "";
    try{
        images = await getImagesByProductId(req.query.product);
        console.log("images: ", images);
        res.json(images);
        return true;
    }catch{
        res.status(400).json({"Error":images});
        return false;
    } 
}

exports.addImage = async (req, res) =>{
    let msg = '';
    
    let {productId, path, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO IMAGES (productId, path, createdAt, updatedAt)
        VALUES (${productId}, '${path}', '${createdAt}', '${updatedAt}')`;
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

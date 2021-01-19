const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

let getAllOrders = async(req, res) =>{
    let q = `SELECT * FROM ORDERS`
    let orders = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("orders",orders);
    return orders;   
}

let getOrdersByUserId = async(buyerId) =>{
    let q = `SELECT * FROM ORDERS WHERE userId='${buyerId}'`
    let product = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("products",product);
    return product;   
}

exports.getOrders = async(req, res) => {
    let orders = "";
    try{
        //if(req.query.userid) orders = await getProductToSellByUserId(req.query.userid);
        //else 
        orders = await getAllOrders(req, res);
        console.log("orders: ",orders);
        res.json(orders);
        return true;
    }catch{
        res.status(400).json({"Error":orders});
        return false;
    } 
}

exports.addOrder = async(req, res) =>{
    let msg = '';
    let {userId, productId, orderNumber, orderDescription, orderDate, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO ORDERS (userId, productId, orderNumber, 
        orderDescription, orderDate, createdAt, updatedAt)
        VALUES ('${userId}', '${productId}', '${orderNumber}', '${orderDescription}', 
        '${orderDate}', '${createdAt}', '${updatedAt}')`;
    try{
        msg = 'Order added.';
        let order = await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
        return true;
    }catch{
        res.status(400)
        .json({error:"Wrong"});
        return false;
    }
};

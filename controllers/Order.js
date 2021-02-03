const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

/**
 * Order controller
 */

let getAllOrders = async(req, res) =>{
    let q = `SELECT * FROM Orders`
    let orders = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    //console.log("orders",orders);
    return orders;   
}


exports.getOrders = async(req, res) => {
    let orders = "";
    try{
        orders = await getAllOrders(req, res);
        //console.log("orders: ",orders);
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
    let q = `INSERT INTO Orders (userId, productId, orderNumber, 
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

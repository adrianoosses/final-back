const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

/*
let getAllChats = async(req, res) =>{
    let q = `SELECT * FROM CHATS`
    let orders = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("orders",orders);
    return orders;   
}*/

/*
let getChatsById = async(userId) =>{
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
*/

let getChatByDestination = async(source, destination) =>{
    let q = `SELECT * FROM CHATS 
    WHERE (source=${source} AND destination=${destination}) OR
    (source=${destination} AND destination=${source})`;
    let chats = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("chats",chats);
    return chats;
}

exports.getChats = async(req, res) => {
    let chats = "";
    try{
        let destinationId = req.query.userid;
        let sourceId = 1; // token
        chats = await getChatByDestination(sourceId, destinationId);
        console.log("chats: ",chats);
        res.json(chats);
        return true;
    }catch{
        res.status(400).json({"Error":chats});
        return false;
    } 
}

exports.sendMessage = async(req, res) =>{
    let msg = '';
    let {source, destination, chatDate, message, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO CHATS (source, destination, chatDate, 
        message, createdAt, updatedAt)
        VALUES (${source}, '${ destination}', '${chatDate}',
        '${message}', '${createdAt}', '${updatedAt}')`;
    try{
        msg = 'Message sent.';
        let chat = await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
        return true;
    }catch{
        res.status(400)
        .json({error:"Wrong"});
        return false;
    }
};

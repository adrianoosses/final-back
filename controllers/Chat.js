const { Op } = require('sequelize');
const { getUserByGivenEmail, decodeToken } = require('./User');
// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
// const WebSocket = require('ws');
const { Chat, User } = require('../models/index.js');
// const wss = new WebSocket.Server({server:server});
/**
 * Chat controller
 */

 /*
wss.on('connection', function connection(ws){
    console.log("A new client connected");
    ws.send("A new client connected");

    ws.on('message', function incoming(message){
        console.log("Received:", message);
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        })
    })
});
*/

const reverseOrder = (arr) => {
    let tmp = '';
	const arrAux = arr;
    for (let i = 0; i < arr.length / 2; i += 1) {
        tmp = arrAux[i];
        arrAux[i] = arrAux[arrAux.length - i - 1];
        arrAux[arrAux.length - i - 1] = tmp;
    }
    return arrAux;
};

const getChatByDestination = async (source, destination) => {
    try {
        const chatsDesc = await Chat.findAll({
            attributes: ['source', 'destination', 'chatDate', 'message'],
            where: {
                [Op.or]: [
                    { source, destination },
                    { source: destination, destination: source },
                ],
			},
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'],
            }],
            order: [['chatDate', 'DESC']],
            limit: 8,
        });
        return reverseOrder(chatsDesc);
    } catch (error) {
        console.error(error);
		return false;
    }
};

exports.getChats = async (req, res) => {
    let chats = '';
    try {
        const destination = req.query.dstemail;
        const dest = await getUserByGivenEmail(destination);
        const token = req.headers.authorization;
        const decodedToken = decodeToken(token);
        chats = await getChatByDestination(decodedToken.id, dest[0].dataValues.id);
        res.json(chats);
        return true;
    } catch (error) {
        res.status(400).json({ error: chats });
        return false;
    }
};

exports.sendMessage = async (req, res) => {
    let msg = '';
    const {
		source, destination, chatDate, message, createdAt, updatedAt,
	} = req.body;
    try {
        msg = 'Message sent.';
        await Chat.create({
            source, destination, chatDate, message, createdAt, updatedAt,
        });
        res.status(200).json({ message: `Good: ${msg}` });
        return true;
    } catch {
        res.status(400).json({ error: 'Wrong' });
        return false;
    }
};

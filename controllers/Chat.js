const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

/**
 * Chat controller
 */

let getChatByDestination = async(source, destination) =>{
    let q = `SELECT id, sourceemail, destinationemail, chatDate, message
    FROM 
    (SELECT chats.id, src.email as sourceemail, dst.email destinationemail, chats.chatDate, message
    FROM CHATS
    JOIN USERS as src
    ON CHATS.SOURCE = src.ID
    JOIN USERS as dst
    ON CHATS.destination = dst.ID
    WHERE (src.email=? AND dst.email=?) OR (src.email=? AND dst.email=?)
    ORDER BY chats.id DESC
    LIMIT 8) as table2
    ORDER BY table2.id ASC
    ;`;
    let chats = await sequelize.query(q, 
        {replacements: [source, destination, destination, source],
            type: sequelize.QueryTypes.SELECT})
    //console.log("chats",chats);
    return chats;
}

exports.getChats = async(req, res) => {
    //let chats = "";
    console.log("---------------ENTRA CHATS!");
    try{
        let destinationEmail = req.query.dstemail;
        //console.log("destinationEmail",destinationEmail);
        let sourceEmail = req.query.srcemail; // token
        
        //console.log("sourceEmail",sourceEmail)
        chats = await getChatByDestination(sourceEmail, destinationEmail);
        //console.log("chats: ",chats);
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

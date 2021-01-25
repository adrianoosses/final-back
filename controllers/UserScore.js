const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

let getScoresByEmail = async(sellerIdEmail) =>{
    let q = `SELECT AVG(uScore) as score
    FROM USERSCORES 
    INNER JOIN USERS
    ON users.id = userscores.userId
    WHERE users.email='${sellerIdEmail}';`
    let score = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    console.log("score", score);
    return score;   
}

exports.getScore = async(req, res) => {
    let score = "";
    try{
        //if(req.query.userid) orders = await getProductToSellByUserId(req.query.userid);
        //else 
        const score = await getScoresByEmail(req.query.email);
        console.log("score: ", score);
        res.json(score);
        return true;
    }catch{
        res.status(400).json({"Error":score});
        return false;
    } 
}

exports.addScore = async(req, res) =>{
    let msg = '';
    let {userId, uScore, createdAt, updatedAt} = req.body;
    let q = `INSERT INTO USERSCORES (userId, uScore, createdAt, updatedAt)
        VALUES ('${userId}', '${uScore}', '${createdAt}', '${updatedAt}')`;
    try{
        msg = 'Score added.';
        let score = await sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
        return true;
    }catch{
        res.status(400)
        .json({error:"Wrong"});
        return false;
    }
};

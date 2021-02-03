const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');
const {decodeToken} = require('./User');

/**
 * UserScores controller
 */

let getScoresByEmail = async(sellerIdEmail) =>{
    let q = `SELECT AVG(uScore) as score
    FROM UserScores 
    INNER JOIN Users
    ON Users.id = UserScores.userReceive
    WHERE Users.email='${sellerIdEmail}';`
    let score = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    //console.log("score", score);
    return score;   
}

exports.getScore = async(req, res) => {
    let score = "";
    try{
        const score = await getScoresByEmail(req.query.email);
        //console.log("email score:",req.query.email);
        //console.log("score: ", score);
        res.json(score);
        return true;
    }catch{
        res.status(400).json({"Error":score});
        return false;
    } 
}
const scoredThisUser = async(userSend, userReceive) => {
    //console.log("------SCORED THIS USER");
    //console.log("---------req.headers.authorization: ", req.headers.authorization);
    let msg = '';
    let q = `SELECT * 
        FROM UserScores
        WHERE userReceive=? AND userSend=?`;
    try{
        msg = 'Score added.';
        let score = await sequelize.query(q, 
            {replacements: [userReceive, userSend]},
            {type: sequelize.QueryTypes.SELECT})
        return !!score[0].length;
    }catch{
        return false;
    }
}


exports.addScore = async(req, res) =>{
    //console.log("ENTRA A ADDSCORE");
    let msg = '';
    let decodedToken = decodeToken(req.headers.authorization);
    //console.log("decodedToken ",decodedToken );
    let {userReceive, uScore, createdAt, updatedAt} = req.body;
    if(decodedToken.id == userReceive) return res.status(401).json({error:"Cannot set score yourself"});
    //console.log("PRIMER IF");
    if(await scoredThisUser(decodedToken.id, userReceive)){
        //console.log("scoredThisUser(decodedToken.id, userReceive)", await scoredThisUser(decodedToken.id, userReceive));
        //console.log("you scored already");
        return res.status(401).json({error:"You scored this user already"});
    } 
    //console.log("SEGUNDO IF");
    let q = `INSERT INTO UserScores (userSend, userReceive, uScore, createdAt, updatedAt)
        VALUES ('${decodedToken.id}', '${userReceive}', '${uScore}', '${createdAt}', '${updatedAt}')`;
    try{
        msg = 'Score added.';
        let score = await sequelize.query(q, 
            {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
        return true;
    }catch{
        res.status(400)
        .json({error:"Wrong"});
        return false;
    }
};

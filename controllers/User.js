const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');

exports.getAllUsers = async(req, res) =>{
    let q = `SELECT * FROM USERS`
    let users = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    return users;   
}

exports.getUsers = async(req, res) => {
    let user = "";
    try{
        user = await getAllUsers(req, res);
        console.log("user: ", user);
        res.json(user);
        return true;
    }catch{
        res.status(400).json({"Error":user});
        return false;
    } 
}


exports.signUp = (req, res) =>{
    let msg = 'User added.';
    let {name, lastName, email, password,  role, birthDate, address, 
        phone, card, createdAt, updatedAt
    } = req.body;
    let q = `INSERT INTO USERS (name, lastName, email, password, role, birthDate, address, 
        phone, card, createdAt, updatedAt)
        VALUES ('${name}', '${lastName}', '${email}', '${password}', '${role}', '${birthDate}', '${address}', 
        '${phone}', '${card}', '${createdAt}', '${updatedAt}')`;
    try{
        sequelize.query(q, {type: sequelize.QueryTypes.INSERT})
        res.status(200)
        .json({message:"Good" + msg});
    }catch{
        res.status(400)
        .json({error:"Wrong"});
    }
    return true;
};

let getUserByEmail = async(req, res) =>{
    let email = '';
    //let {email} = req.body;
    if(req.body.email) email = req.body.email;
    if(req.query.email) email = req.query.email;
    console.log("getting user by email");
    let q = `SELECT * FROM USERS WHERE email='${email}'`;
    return sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
}

let generateToken = (user)=>{
    // console.log("generating token...");
    let newUser = {
        email: user.email
    }
    // console.log("email: " + newUser.email);
    return jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

exports.getUsers = async(req, res) => {
    let user = "";
    try{
        if(req.query.email || req.query.email) user = await getUserByEmail(req, res);
        else user = await getAllUsers(req, res);
        console.log("user: ", user);
        res.json(user);
        return true;
    }catch{
        res.status(400).json({"Error":user});
        return false;
    } 
}

exports.login = async(req, res) =>{
    try{
        let password = req.body.password;
        let usrLogin = await getUserByEmail(req, res);
        if(usrLogin && usrLogin[0].password === password){
            let token = generateToken(usrLogin[0]);
            res.json({message:"Logged", token});
            return true;
        } else{
            res.json({error:"Wrong user or password "});
            return false;
        }
    }catch{
        res.status(400).json({"error":"error"})
        return false;
    }
};

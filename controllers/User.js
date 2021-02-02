const {sequelize} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');
const bcrypt = require('bcrypt');

/**
 * Users controller
 */

exports.getAllUsers = async(req, res) =>{
    let q = `SELECT * FROM USERS`
    let users = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
    return users;   
}

exports.getUsers = async(req, res) => {
    let user = "";
    try{
        user = await getAllUsers(req, res);
        //console.log("user: ", user);
        res.status(200).json(user);
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
        VALUES (?, ?, ?, ?, ?, ?, ?, 
        ?, ?, ?, ?)`;
    try{
        sequelize.query(q, 
            {replacements: [name, lastName, email, bcrypt.hashSync(password, 6), role, birthDate, address,
            phone, card, createdAt, updatedAt],
                type: sequelize.QueryTypes.INSERT})
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
    //console.log("getting user by email");
    let q = `SELECT * FROM USERS WHERE email=?`;
    return sequelize.query(q, 
        {replacements: [email],
            type: sequelize.QueryTypes.SELECT})
}

exports.userHasProduct = async(userId, productId) =>{
    let q = `SELECT * FROM PRODUCTS WHERE id=? AND sellerId=?`;
    return sequelize.query(q, 
        {replacements: [productId, userId],
            type: sequelize.QueryTypes.SELECT})
}
let generateToken = (user)=>{
    let newUser = {
        id:user.id,
        email: user.email,
        role:user.role
    }
    return jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24 })
}

exports.decodeToken = (token) =>{
    try {
        return jwt.verify(token, claveToken);
    } catch(e) {
        return null;
    }
}

exports.getUsers = async(req, res) => {
    let user = "";
    try{
        if(req.query.email || req.query.email) user = await getUserByEmail(req, res);
        else user = await getAllUsers(req, res);
        //console.log("user: ", user);
        res.status(200).json(user);
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
        const isValid = bcrypt.compareSync(password, usrLogin[0].password, 6);
        //console.log( isValid);
        if(usrLogin && isValid){
            let token = generateToken(usrLogin[0]);
            res.status(200).json({message:"Logged", token});
            return true;
        } else{
            res.status(400).json({error:"Wrong user or password "});
            return false;
        }
    }catch{
        res.status(400).json({"error":"error"})
        return false;
    }
};

exports.getListUsersAndProducts = async(req, res) =>{
    let q = `SELECT users.name, users.lastName, users.email, users.birthDate, users.address, 
    users.phone, products.title, products.price, products.createdAt
    FROM USERS
    LEFT JOIN PRODUCTS
    ON USERS.id = PRODUCTS.sellerId`;
    try{
        let usersAndProducts = await sequelize.query(q, {type: sequelize.QueryTypes.SELECT})
        //console.log("list", usersAndProducts);
        res.status(200).json(usersAndProducts);
        return true;
    }catch{
        res.status(400).json({"error":"error"})
        return false;
    }
};

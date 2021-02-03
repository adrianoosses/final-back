const {sequelize, User, Product} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');
const bcrypt = require('bcrypt');
let passwordValidator = require('password-validator');
//let User = require('../models/').User;
//const { Sequelize, Model, DataTypes } = require("sequelize");
/**
 * Users controller
 */

exports.getAllUsers = async(req, res) =>{
    return await User.findAll();
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


exports.signUp = async (req, res) =>{
    let msg = 'User added.';
    let schemaPasswordValidator = new passwordValidator();
    schemaPasswordValidator
        .is().min(8)                                    
        .is().max(100)                                  
        .has().uppercase()                              
        .has().lowercase()                              
        .has().digits(2)                                
        .has().not().spaces()                           
        .is().not().oneOf(['Password123', 'Qwerty12345']);
    let {name, lastName, email, password, roleDb, birthDate, address, 
        phone, card, createdAt, updatedAt
    } = req.body;
    let role = roleDb || 'Client';
    
    try{
        if (!schemaPasswordValidator.validate(password)) return res.status(401).json({error:"weak password"});
        const newUser = await User.create({ 
                name: name, 
                lastName: lastName, 
                email: email,
                password: bcrypt.hashSync(password, 6),
                role: role,
                birthDate: birthDate,
                address: address,
                phone: phone,
                card: card,
                createdAt: createdAt,
                updatedAt: updatedAt
        });
        res.status(200)
        .json({message:"Good. " + msg, newUser});
    }catch(error){
        console.error(error);
        res.status(400)
        .json({error:"Wrong"});
    }
    return res;
};

let getUserByEmail = async(req, res) =>{
    console.log("--------getUsersByEmail");
    let email = '';
    if(req.body.email) email = req.body.email;
    if(req.query.email) email = req.query.email;
    const fUser =  await User.findAll({
        where: {
          email: email
        }
      });
    console.log("fUser", fUser);
    return fUser;

}

exports.userHasProduct = async(userId, productId) =>{
    return Product.findAll({
        where: {
          id: productId,
          sellerId: userId
        }
      });
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
        res.status(200).json(user);
        return true;
    }catch{
        res.status(400).json({"Error":user});
        return false;
    } 
}

exports.login = async(req, res) =>{
    console.log("--------login");
    try{
        console.log("--------try");
        let password = req.body.password;
        let usrLogin = await getUserByEmail(req, res);
        const isValid = bcrypt.compareSync(password, usrLogin[0].password, 6);
        console.log("password", req.body.password);
        console.log("usrLogin", usrLogin);
        console.log("isValid", isValid);

        if(usrLogin && isValid){
            let token = generateToken(usrLogin[0]);
            res.status(200).json({message:"Logged", token});
            return true;
        } else{
            res.status(400).json({error:"Wrong user or password "});
            return false;
        }
    }catch{
        res.status(401).json({"error":"error"})
        return false;
    }
};

exports.getListUsersAndProducts = async(req, res) =>{
    let q = `SELECT Users.name, Users.lastName, Users.email, Users.birthDate, Users.address, 
    Users.phone, Products.title, Products.price, Products.createdAt
    FROM Users
    LEFT JOIN Products
    ON Users.id = Products.sellerId`;
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

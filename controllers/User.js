const {sequelize, User, Product} = require('../models/index.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const chalk = require('chalk');
const bcrypt = require('bcrypt');
let passwordValidator = require('password-validator');

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

const getUserByEmail = async(req, res) =>{
    let email = '';
    if(req.body.email) email = req.body.email;
    if(req.query.email) email = req.query.email;
    const fUser =  await User.findAll({
        where: {
          email: email
        }
      });
    return fUser;
}

exports.getUserByGivenEmail = async(email) =>{
    const fUser =  await User.findAll({
        where: {
          email: email
        }
      });
    return fUser;
}

exports.getUserByEmailQ = async(req, res) => {
    return getUserByEmail(req, res);

}

exports.userHasProduct = async(userId, productId) =>{
    return Product.findAll({
        attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 
        'mainImage', 'sellerId', 'category'],
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
    try{
        let password = req.body.password;
        let testCode = req.headers.testcode;
        let usrLogin = await getUserByEmail(req, res);
        const isValid = bcrypt.compareSync(password, usrLogin[0].password, 6);
        if(usrLogin && isValid && (testCode === process.env.TEST_CODE)){
            let token = generateToken(usrLogin[0]);
            res.status(200).json({message:"Logged", token});
            return true;
        } else{
            res.status(400).json({error:"Wrong user or password "});
            return false;
        }
    }catch(error){
        console.error(error);
        res.status(401).json({"error":"error"})
        return false;
    }
};

exports.getListUsersAndProducts = async(req, res) =>{
   const products = await User.findAll({ 
        attributes: ['id', 'name', 'email'],
        include: [{
            model: Product, 
            attributes: ['id', 'title', 'price', 'description', 'sellDate', 'productStatus', 'mainImage', 'sellerId', 'category']
        }]
    });
    
    try{
        res.status(200).json(products);
        return true;
    }catch{
        res.status(400).json({"error":"error"})
        return false;
    }
};

exports.deleteUser = async (req, res) =>{
    let msg = '';
    let {id} = req.query;
    
    try{
        msg = 'User deleted';
        await User.destroy({where:{id}});
        res.status(200).json({message:"Good: " + msg});
    }catch{
        res.status(400).json({error:"Wrong"});
    }
    return true;
};
const mongoose = require('mongoose')
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (async(req, res) => {
    const isEmailExist = await Admin.findOne({email: req.body.email})
    if (isEmailExist) return res.status(400).json({error: "Email already exist"})

    const isUsernameExist = await Admin.findOne({username: req.body.username})
    if (isUsernameExist) return res.status(400).json({error: "Username already exist"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    var admin = new Admin ({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword
    })
    try {
        const saveadmin = await admin.save()
        res.send(saveadmin)
    }
    catch (err){
        res.status(400)
        res.send(err)
    }
})

const login = (async(req, res) => {
    const admin = await Admin.findOne({username: req.body.username})
    if (!admin) {
        return res.status(400).json({error: "Username is wrong"})
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({error: "Password is wrong"});
    }
    
    const token = jwt.sign(
        {
            name: admin.name,
            id: admin._id, 
        },
        process.env.TOKEN_SECRET_USER,
        {
            expiresIn: "24h"
        }
    )
    res.cookie("authCookie", token, {maxAge: 900000, htpOnly:true}).json(
        {error: null,
        id: admin.id,
        data: {
            token
        }}
    )
})

module.exports = {
    signup,
    login
}
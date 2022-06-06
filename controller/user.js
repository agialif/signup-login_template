const mongoose = require('mongoose');
const User = require('../model/user')
const bcrypt = require('bcrypt');
const req = require('express/lib/request');

var signup = (async(req, res) => {
    const isEmailExist = await User.findOne({email: req.body.email})
    if (isEmailExist) return res.status(400).json({error: "Email already exist"})

    const isUsernameExist = await User.findOne({username: req.body.username})
    if (isUsernameExist) return res.status(400).json({error: "username already exist"})

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.Password, salt)

    var user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword
    })
    try{
        const saveuser = await user.save();
        res.send(saveuser)
    }
    catch (err){
        res.status(400)
        res.send(err)
    }
})

var login = (async(req, res) => {
    const user = await User.findOne({username: req.body.username})
    if (!user) return res.status(400).json({error: "Username is wrong"})

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({error: "Password is wrong"})

    var token = jwt.sign(
        {
            name: user.name,
            id: user._id, 
        },
        process.env.TOKEN_SECRET_USER,
        {
            expiresIn: "24h"
        }
    )
    res.cookie("authCookie", token, {maxAge: 900000, htpOnly:true}).json(
        {error: null,
        id: user.id,
        data: {
            token
        }}
    )
})

module.exports = {
    signup,
    login
}
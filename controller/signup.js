const express = require('express')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const router = express.Router()

const signup = async(req , res)=>{
    try{
        const{name , email , password} = req.body;
        const  exist = await User.findOne({email})
        if (exist) {
            return res.status(400).json({
                message: "Email already exists!"
            });
        }
        const hashedpassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedpassword
        });
        res.status(201).json({
            message:'Signup successfully!!!'
        })
    }catch(e){
        res.status(500).json({
            message:"Internal server error"
        })

    }
}
module.exports = signup
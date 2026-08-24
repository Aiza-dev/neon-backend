const express = require('express')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const login = async (req, res)=>{
    try{
        const{email , password} = req.body;
         const  exist = await User.findOne({email})
         if(!exist){
            return res.status(404).json({
                message:"User not found"
            })
         }
         const ismatch = await bcrypt.compare(password, exist.password)
         if(!ismatch){
             return res.status(400).json({
                message:"Invalid password"
            })
         }
         const token = jwt.sign({id:exist._id},
            process.env.jwtSecret, 
            {expiresIn:'1h'}
         )
         res.status(200).json({
            message:"Login succesfully!!!",
            token
         })
    }catch(e){
         res.status(500).json({
            message:"Internal server error"
        })
    }
}
module.exports = login 
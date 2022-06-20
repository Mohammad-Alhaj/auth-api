"use strict";
const express = require("express");
const UserRouter = express.Router();
const basic = require("./middleware/basic");
 const signup = require('./middleware/signup');
const bearer = require("./middleware/bearer");
const acl = require('./middleware/acl');
const User = require('../auth/models/users-model');
const UpdateUser = require('../Edit account/Editaccount');
// const bcrypt = require("bcrypt");
// const jwt_decode = require('jwt-decode');

UserRouter.post("/signin", basic, async (req, res) => {
 res.status(200).json(req.user);
});

UserRouter.post("/signup",signup, async (req, res) => {
  
});
UserRouter.put("/Editaccount/:id", bearer,UpdateUser,async (req, res) => {
    // try{

    //    const token = await req.token.split('.')[1]
    //     // console.log("rrrrrrrrrrrrrrrrrrrr",req.body.password);
    //    const dd= await jwt_decode(token)
    //    console.log("??????????????????????????",dd);
    // }catch(e){
    //     console.error(e)
    // }
});

UserRouter.get("/User",bearer, (req, res) => {// The error was here
    res.json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });
});

// UserRouter.post('/User/logout',bearer, async (req, res) => {
//   console.log("ddddddlllllllllllllll",req.token.iat);
//     try {
//         req.token.iat = "1"
//          await req.token.save()
//         res.send()
//     } catch (e) {
//         res.status(500).send()
//     }
// })

UserRouter.get("/sitting",bearer,acl('read'),(req,res)=>{
    res.status(200).send("enter the sitting")

});
UserRouter.post("/sitting",bearer,acl('create'),(req,res)=>{
res.send("create the sitting")
    
});
UserRouter.put("/sitting",bearer,acl('update'),(req,res)=>{
res.send("update a new sitting")
    
});
UserRouter.delete("/sitting",bearer,acl('delete'),(req,res)=>{
res.send("delete sitting")
    
});


module.exports = UserRouter;
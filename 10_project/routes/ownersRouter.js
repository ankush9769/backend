const express = require('express')
const router = express.Router()   //this router variable will conatains only the routes related features
require('dotenv').config();    //it is basically used re require the .env file in the project
const ownermodel = require('../models/owner-model')
const IsLoggedIn = require('../middlewares/isloggedin')



console.log(process.env.ENV_NAME);   //it will print the current process environment whether it is development and production

router.get('/',function(req,res){
    res.send("hey this owner route")
})

if(process.evn==="development"){
    router.post("/create",async function(req,res){ 
        const owner = await ownermodel.find();
        if(owner.lenght>0){           //i it already contains some owner then it will not allow to create new owner
            res.send("you dont have permission to create new owner")
        }

        let {fullname,email,password} = req.body;
        let createdowner = await ownermodel.create({
            fullname,
            email,
            password
        })
        res.send(createdowner)
  
    });  
}

router.get('/admin',IsLoggedIn,function(req,res){
    let success = req.flash("success")
    res.render("adminpanel",{success})
})




module.exports = router;   //and here it will exports only router related features to app.js file
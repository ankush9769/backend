const express = require('express')
const router = express.Router()
const usermodel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {registeruser,loginuser,logout}=require('../controllers/authcontroller')



router.get('/',function(req,res){
    res.send("hello this is userroutes")
})

router.post('/registration',registeruser)     //this was done just becouse of follow the industy level 

router.post('/login',loginuser)

router.get('/logout',logout)



module.exports = router;
const usermodel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.registeruser=async function(req,res){
    let {fullname,email,password} = req.body;
    try{
        let user = await usermodel.findOne({email:email})
        if (user)
            return res.status(401).send("you already have an account")

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err){
                    req.send("something went wrong")
                }
                else{
                    let user = await usermodel.create({
                        fullname,
                        email,
                        password:hash
                    })

                    let token = jwt.sign({email,id:user._id},"secrete")
                    res.cookie("token",token)
                    res.send(token)
                }
            })
        })
    }
    catch{
        res.status(500).send("error")
    }   
}

module.exports.loginuser=async function(req,res){
    let {email,password} = req.body;
    let finduser = await usermodel.findOne({email})
    if (!finduser){
        req.flash("error","email or password is invalid")
        res.redirect('/')
    }
    else{
        bcrypt.compare(password, finduser.password,function(err,result){
            if(result){
                let token = jwt.sign({email,id:finduser._id},"secrete")
                res.cookie("token",token)
                res.redirect("/shop")
            }
            else{
                req.flash("error","email or password is invalid")
                res.redirect('/')
            }      
        })
    } 
}

module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/");
}
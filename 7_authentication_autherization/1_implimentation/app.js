const express = require('express')
const app = express()
const path = require('path')
const cookie = require('cookie-parser')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.use(cookie());
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/',function(req,res){
    res.render("index")
})

app.post('/create',function(req,res){
    let {username,email,password,age} = req.body;

    bcrypt.genSalt(10,function(err,salt){ //we convert  the password to a hash
        bcrypt.hash(password,salt,async function(err,hash){
            console.log(hash)
            let createduser = await userModel.create({
                username,
                email,
                password:hash,
                age
            });
            //now save this encrypt password to the cookie
            let token = jwt.sign({email},"secret");
            res.cookie("token",token);

            res.send(createduser);
        });
    });  
});




//create route for login
app.get('/login',function(req,res){
    res.render("login")
})

app.post('/login',async function(req,res){
    //finding email from  the database
    let finduser = await userModel.findOne({email:req.body.email});
    if(!finduser){ res.send("somethings went wrong")}

    //compare password and encrypted  password
    bcrypt.compare(req.body.password,finduser.password,function(err,result){
        if(result){ 
            res.send("successfully login")

            //after successful login set the token(cookie)
            let token = jwt.sign({email:finduser.email},"secret");
            res.cookie("token",token);
            }
        else{ res.send("login failed")}
    })
})



//create logout route whera remove all data form token in cookie
app.get('/logout',function(req,res){
    res.cookie("token",""); //it will remove only value of token
    // res.clearCookie("token"); //it will  remove the token from the cookie
    res.redirect("/");
});



app.listen(3000,function(){
    console.log("server is running at  port 3000")
})

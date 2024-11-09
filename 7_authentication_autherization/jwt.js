const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookie=  require('cookie-parser')

app.use(cookie())

app.get('/',function(req,res){
    var token = jwt.sign({ email:"ankush9769@gmail.com"},"secret");
    //becouse email is always unique
    //usully this secret is very secret becouse by using this secret you can decrypt the token 
    res.cookie("token",token);   //not send this token to cookie
    console.log(token);
    res.send("token has been successfully created")
    
})

//read the token  from cookie
app.get('/read',function(req,res){
    // const readtoken = req.cookies;
    res.send( req.cookies);
})

//taking out actull data from token
app.get('/tokendata',function(req,res){
    const data = jwt.verify(req.cookies.token,"secret")  //by using this secreat  we can decrypt the token
    res.send(data);
})


app.listen(3000,function(){
    console.log("server is running at 3000 port")
})
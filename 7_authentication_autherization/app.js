const express = require('express')
const app = express()
const cookie = require('cookie-parser')

app.use(cookie())

app.get('/',function(req,res){
    res.cookie("name","ankushpal");  //it is used for creating cookie or set cookie
    res.send("cookie has created");
});

app.get('/read',function(req,res){
    res.send(req.cookies);      //to print the cookie we use req
    // res.send("you can check you coolei is still safe");
});

app.listen(3000,function(){
    console.log("server is running at 3000 port")
})
const express = require('express')
const app = express()
//middleware is  a function that takes in a request and a response and returns a response and it is written befor the routes and it can also perform some task befor the routes


app.use(function(req,res,next){  //it middleware
    console.log("running of middleware is done");
    next();    //it will pass your requrest to the route or next  middleware

})

app.use(function(req,res,next){  //one more middleware (multiple middleware can be use)
    console.log("running of one more middleware is done");
    next();    //it will pass your requrest to the route or next  middleware
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
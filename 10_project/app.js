const express = require('express')
const app = express()
const path = require('path')
const cookie = require('cookie-parser')
const db = require('./config/mongoose-connection')  //this is creation and connection of database
const usersRouter = require('./routes/usersRouter')  //requiring usersrouter in app.js
const ownersRouter = require('./routes/ownersRouter')  //requiring productsrouter in app.js
const productsRouter = require('./routes/productsRouter')  //requiring ownersrouter in app.js
const indexRouter = require('./routes/index')
const flash = require('connect-flash')
const expressSession = require('express-session')



app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookie())

app.use(
    expressSession({    //install express-session package for this
        resave:false,
        saveUninitialized:flash,
        secret:'secrete'
    })
)
app.use(flash())

app.use("/owners",ownersRouter);     //we will not create any route we will simply define the routes and variable in which actuall route will be created
app.use("/users",usersRouter);
app.use("/products",productsRouter);
app.use("/",indexRouter)






app.listen(3000,function(){
    console.log("server is running at port 3000");
})
const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('./models/user')
const postModel = require('./models/post')
const cookie = require('cookie-parser')
const post = require('./models/post')

const upload = require('./utils/multer')

app.set('view engine','ejs')

app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.get('/',function(req,res){
    res.render("index");
})

//routes for registration
app.post('/registration',async function(req,res){
    let {username,name,email,age,password} = req.body
    //first check is there already exist any user
    let finduser = await userModel.findOne({email})
    if(finduser) return res.status(500).send("user already exist");

    //if no user already exist then create user
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let createduser = await userModel.create({
                username,
                name,
                email,
                age,
                password:hash
            })
            // res.send(createduser);

            //now we want to keep user login by saving cookie
            let token = jwt.sign({email:email,usersid:createduser._id},"secret")
            res.cookie("token",token)
            res.send("registered")
        })
    })
})


//routes for login
app.get('/login',function(req,res){
    res.render("login");
})

app.post('/login',async function(req,res){
    let {email,password} = req.body
    let finduser = await userModel.findOne({email})
    if(!finduser) return res.status(500).send("somethings went wrong");

    bcrypt.compare(password,finduser.password,function(err,result){
        if(result){
            let token = jwt.sign({email:email,usersid:finduser._id},"secret")
            res.cookie("token",token)
            res.status(500).redirect("/profile")           
        } 
        else res.redirect("/login");
    })
})

//routes for  logout
app.get('/logout',function(req,res){
    res.cookie("token","");
    res.redirect("/login");
})

//lets create protected routes by using middleware to check if user is logged in or not
function isLoggedIn(req,res,next){
    if(req.cookies.token === ""){
        res.redirect("/login")
    }
    else{
        let user = jwt.verify(req.cookies.token,"secret");
        req.user = user;
    }
    next();
}

//create profile routes which is protected route and which will give you access only when you  are logged in
app.get('/profile',isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email}).populate("posts");//just becouse of populate("posts") it display all info about each posts ,without populate it will show only all posts id
    // console.log(user)
    res.render("profile",{user});
})


//creating post routes for creating post
app.post('/post',isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email})

    let post = await postModel.create({
        userid:user._id,
        content:req.body.content
    });
    //user should also know about post id
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
})

//create routes for like the post
app.get('/like/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOne({_id:req.params.id})//.populate("userid")
    //we want show like when the user is not present in like array and show unlike if that user is already like or present in like array
    if(post.like.indexOf(req.user.usersid) === -1){
        post.like.push(req.user.usersid)
    }
    else{
        post.like.splice(post.like.indexOf(req.user.usersid),1);
    }
    await post.save();
    console.log(post)
    res.redirect("/profile");
})

//creating edit post routes
app.get('/edit/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOne({_id:req.params.id})
    res.render("edit",{post});
    
})

app.post('/update/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile");
    
})

//delete that perticule post 
app.get('/delete/:id',isLoggedIn,async function(req,res){
    let post = await postModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/profile");
})


//upload profile picture routes
app.get('/profile/upload',isLoggedIn,function(req,res){
    res.render("upload");
})


app.post('/upload',isLoggedIn,upload.single("image"),async function(req,res){
    // res.send(req.file.filename)
    // console.log(req.file.filename)
    let user = await userModel.findOne({email:req.user.email});
    user.image=req.file.filename
    await user.save();
    res.redirect("/profile");
})





app.listen(3000,function(){
    console.log("server is running at 3000 port")
})
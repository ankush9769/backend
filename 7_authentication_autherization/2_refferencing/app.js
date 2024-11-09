const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')

app.get('/',function(req,res){
    res.send('Hello World')
})

app.get('/create',async function(req,res){
    let user = await userModel.create({
        username:"ankush",
        email:"ankush9760@gmail.com",
        age:19
    })
    res.send(user);
})

app.get('/post/create',async function(req,res){
    let post = await postModel.create({   // here post know about the user
        postdata:"this is post data",
        userid:"672af8ba35bae88477652b95"   //post has user id
    })

    //now user should alos know  about the post thats why
    let user = await userModel.findOne({_id:"672af8ba35bae88477652b95"});
    user.posts.push(post._id);
    await user.save();

    res.send({
        post,user
    });

})



app.listen(3000,function(){
    console.log("server is running at 3000")
})
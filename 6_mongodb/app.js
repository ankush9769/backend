//basically mongoose are responsible to maintain the connection between  the database and the application

const express = require('express')
const app = express()

//import the exported things from the usermodel.js
const userModel = require('./usermodel');

app.get('/',function(req,res){
    res.send('here we are studying about the database');
})

//for handling all operation like GRUD by  using the mongoose model we have to create routes
app.get('/create',async function(req,res){
    const usercreated = await userModel.create({  // this creation part is asyncronus lets make it syncronus(use async await) so that first it will run
        name:"anshika",
        username:"anshika8080",
        email:"anshika8080@gmail.com"
    })
    res.send(usercreated);
})


//read the data from database
app.get('/read',async function(req,res){       //find() will read all data from database
    const users = await userModel.find();
    res.send(users);
});

app.get('/readone',async function(req,res){       
    const users = await userModel.findOne({name:"ankushpal"}); //we can also use find({name:"ankush"}) for reading 
    res.send(users);
});


//update the created database
app.get('/update',async function(req,res){
    const updateduser = await userModel.findOneAndUpdate({username:"ankush9769"},{name:"ankushpal",username:"ankushpal9769"},{new:true});
    res.send(updateduser);
});


//delete the perticular users data
app.get('/delete',async function(req,res){       
    const deleteduser = await userModel.findOneAndDelete({name:"anshika"});
    res.send(deleteduser);
});



app.listen(3000,function(){
    console.log("server is running  on port 3000");
});
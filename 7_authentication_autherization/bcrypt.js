const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

//this route is for encrypt the password
app.get('/',function(req,res){
    bcrypt.genSalt(10, function(err, salt) {    //here it generate  a random salt(string)
        bcrypt.hash("password", salt, function(err, hash) {//our given password and salt is converted into hash form
            console.log(hash)
        });
    });
});

//this route is for decrypt the password
app.get('/decrypt',function(req,res){
    bcrypt.compare("password","$2b$10$K8oR9.HQmgbJEU40RAnFreW.7qHcELjM.xwKSETUV0EtycQJxT5h.", function(err, result) {  // it will check wether you password and its encryption form  is same or not
        console.log(result);
    });
});

app.listen(3000,function(){
    console.log("server is running at 3000 port")
})
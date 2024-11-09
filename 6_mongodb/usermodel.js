const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/mongodbpractice`);

const userschema = mongoose.Schema({  //it is structur of the table 
    name:String,
    username:String,
    email:String
})

module.exports  = mongoose.model("user",userschema);  //here we defining the name of table and what structure is going to follow
//to use the this model in  other file we have to export it



const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/authertestapp`);

const userschema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
});

module.exports = mongoose.model("user",userschema);
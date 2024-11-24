const mongoose = require('mongoose')

let usermodel = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    contact:Number,
    cart:{
        type:Array,
        default:[]
    },
    orders:{
        type:Array,
        default:[]
    },
    picture:String
})

module.exports = mongoose.model("user",usermodel);
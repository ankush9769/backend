const mongoose = require('mongoose')

let ownermodel = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true
    },
    email:String,
    password:String,
    picture:String,
    products:{
        type:Array,
        default:[]
    },
    gstno:String
})

module.exports = mongoose.model("owner",ownermodel);